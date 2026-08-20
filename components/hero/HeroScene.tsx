"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * A GPU particle field: a displaced grid of points driven entirely by a vertex
 * shader. One draw call, no per-frame allocation, no state — the only thing
 * React does after mount is nothing at all.
 */

// Amplitude of the crossing waves. Named because the normal below is the
// analytic derivative of the same expression and the two must not drift apart.
const WAVE_AMPLITUDE = 0.85;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  varying float vElevation;
  varying float vDistance;
  varying float vShade;

  const float AMP = ${WAVE_AMPLITUDE};

  // A three-point rig, expressed as directions rather than THREE.Light objects.
  // ShaderMaterial does not consume scene lights at all, so the usual
  // ambient/key/fill trio has to be evaluated here by hand — the payoff is that
  // it costs two dot products instead of three light uniforms plus the whole
  // lights_fragment chunk.
  const vec3 KEY_DIR  = vec3(-0.55,  0.62,  0.56);
  const vec3 FILL_DIR = vec3( 0.68,  0.28,  0.68);

  void main() {
    vec3 pos = position;

    // two crossing waves, slightly out of phase, so the field never visibly loops
    float waveX = sin(pos.x * 0.55 + uTime * 0.42) * 0.5;
    float waveY = sin(pos.y * 0.42 - uTime * 0.31) * 0.5;

    // pointer acts as a soft gravity well
    float pointerDist = distance(pos.xy, uPointer * 6.0);
    float lift = smoothstep(4.0, 0.0, pointerDist);

    pos.z += (waveX + waveY) * AMP + lift * 1.35;

    // Analytic surface normal: d/dx and d/dy of the wave above. Cheaper and
    // steadier than dFdx/dFdy in the fragment stage, which on a point cloud
    // would differentiate across unrelated particles rather than across the
    // surface they describe.
    float dzdx = cos(pos.x * 0.55 + uTime * 0.42) * 0.5 * 0.55 * AMP;
    float dzdy = cos(pos.y * 0.42 - uTime * 0.31) * 0.5 * 0.42 * AMP;
    vec3 normal = normalize(vec3(-dzdx, -dzdy, 1.0));

    // Ambient floor keeps the troughs legible instead of crushing them to the
    // background; key carries the form; fill lifts the shadow side just enough
    // that the wave never reads as a hard two-tone band.
    float key  = max(dot(normal, KEY_DIR), 0.0);
    float fill = max(dot(normal, FILL_DIR), 0.0);
    vShade = clamp(0.34 + key * 0.62 + fill * 0.22, 0.0, 1.0);

    vElevation = pos.z;
    vDistance = length(pos.xy);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // perspective-correct point size, clamped so nothing blows up close to camera
    gl_PointSize = uSize * (1.0 + vElevation * 0.35) * (14.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 7.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform float uAlpha;
  uniform vec2 uShadeRange;
  varying float vElevation;
  varying float vDistance;
  varying float vShade;

  void main() {
    // round, soft-edged points instead of squares
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d);

    // fade the field out toward the edges so it dissolves instead of ending
    alpha *= smoothstep(11.0, 3.5, vDistance);

    // Amber is reserved for the crests: the field reads as neutral structure
    // with the accent surfacing only where the wave peaks, rather than as a
    // wash of brand colour. See DESIGN.md → "one chromatic token".
    vec3 color = mix(uColorLow, uColorHigh, smoothstep(0.25, 1.8, vElevation));

    // Light and dark disagree about which direction "lit" points. On the dark
    // canvas a lit crest is brighter than its trough; on the pale canvas the
    // same crest has to get *darker* to gain presence, because there is no
    // headroom above the paper. uShadeRange carries that inversion — see
    // PALETTES — so one shading term serves both themes.
    color *= mix(uShadeRange.x, uShadeRange.y, vShade);

    // Lit crests also sit a little more opaque than shadowed troughs, which
    // reads as depth in both themes regardless of which way the value goes.
    alpha *= mix(0.78, 1.0, vShade);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), alpha * uAlpha);

    // THREE.Color parses "#F2A93C" into the linear working space, but a
    // ShaderMaterial writes gl_FragColor straight to an sRGB drawing buffer —
    // so without this encode the amber landed at rgb(226,101,12), a burnt
    // orange two steps off the design token, and the neutral collapsed to near
    // black. Tone mapping is deliberately *not* included: these are exact UI
    // tokens, and ACES would pull the accent off-hue again.
    #include <colorspace_fragment>
  }
`;

export type SceneTheme = "dark" | "light";

/**
 * Additive blending is what makes the field glow on near-black — and exactly
 * what makes it disappear on near-white, since adding light to an already
 * bright canvas cannot darken it. Light mode therefore switches to normal
 * blending and inverts the value relationship: dark points laid over a pale
 * canvas instead of bright points over a dark one.
 *
 * The colours track the ink scale and the single amber accent from DESIGN.md —
 * the light values are the light theme's own accent, not the dark one reused.
 */
const PALETTES: Record<
  SceneTheme,
  {
    low: string;
    high: string;
    blending: THREE.Blending;
    alpha: number;
    /**
     * [unlit, lit] multiplier applied to the point colour by the shading term.
     * Dark reads lit-as-brighter; light has no headroom above the paper, so it
     * reads lit-as-darker and the pair inverts. Both are anchored on 1.0 so the
     * mid-tone still lands on the design token rather than drifting off it.
     */
    shade: [number, number];
  }
> = {
  dark: {
    low: "#3f3f46",
    high: "#F2A93C",
    blending: THREE.AdditiveBlending,
    // Back up from 0.42. That value dated from the hero's previous composition,
    // where the field had to stay out of the way of a headline set beside it.
    // The headline is now large enough to hold the fold by itself, and a
    // particle field nobody can see is pure cost — see HeroCanvas for the
    // matching mask change.
    alpha: 0.72,
    shade: [0.5, 1.15],
  },
  light: {
    // Two steps lighter than the dark theme's neutral is deliberate: dark marks
    // on a pale canvas gain contrast far faster than pale marks on a dark one,
    // so matching the dark values here would read as dirt over the copy.
    low: "#d4d4d8",
    high: "#C9942E",
    blending: THREE.NormalBlending,
    // Light needs to be driven harder than dark for the same apparent presence:
    // normal blending onto a near-white canvas has no glow to lean on, so the
    // points only exist to the extent they actually darken the paper.
    alpha: 0.82,
    shade: [1.1, 0.66],
  },
};

type FieldProps = { count: number; animate: boolean; theme: SceneTheme };

function ParticleField({ count, animate, theme }: FieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport, invalidate } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * count * 3);
    let i = 0;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        arr[i++] = (x / (count - 1) - 0.5) * 22;
        arr[i++] = (y / (count - 1) - 0.5) * 22;
        arr[i++] = 0;
      }
    }
    return arr;
  }, [count]);

  // Seeded once from the mount-time palette, then mutated in place on theme
  // change (below) — rebuilding the object would force a new ShaderMaterial and
  // restart uTime, snapping the wave mid-motion.
  const uniforms = useMemo(() => {
    const palette = PALETTES[theme];
    return {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 2.6 },
      // Neutral base, amber crest — the ink scale and the single accent from
      // the design system, not a second palette.
      uColorLow: { value: new THREE.Color(palette.low) },
      uColorHigh: { value: new THREE.Color(palette.high) },
      uAlpha: { value: palette.alpha },
      uShadeRange: { value: new THREE.Vector2(...palette.shade) },
    };
    // Mount-time seed only; `theme` updates flow through the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    const palette = PALETTES[theme];
    material.uniforms.uColorLow.value.set(palette.low);
    material.uniforms.uColorHigh.value.set(palette.high);
    material.uniforms.uAlpha.value = palette.alpha;
    material.uniforms.uShadeRange.value.set(...palette.shade);
    material.blending = palette.blending;
    material.needsUpdate = true;

    // Under prefers-reduced-motion the canvas runs on "demand" and would keep
    // showing the old palette until something else requested a frame.
    invalidate();
  }, [theme, invalidate]);

  // The canvas sits under `pointer-events: none` — deliberately, so the hero's
  // CTAs stay clickable through it — which also means R3F's own pointer plumbing
  // never receives an event and `state.pointer` is pinned at (0, 0) forever.
  // The gravity well in the vertex shader was therefore inert. Listening on the
  // window restores it without putting a hit-target back over the buttons.
  //
  // Window-normalised rather than canvas-normalised on purpose: reading the
  // canvas rect per move would force a layout on every pointer event, and the
  // hero fills the viewport at the only scroll position where the field is
  // visible, so the two agree closely enough for a background flourish.
  useEffect(() => {
    // Under prefers-reduced-motion the field renders one static frame; a
    // pointer-reactive well is exactly the motion that setting asks us to drop.
    if (!animate) return;

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [animate]);

  useFrame((_state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    if (animate) {
      material.uniforms.uTime.value += delta;
    }

    // ease the pointer instead of snapping to it
    const target = material.uniforms.uPointer.value as THREE.Vector2;
    target.x += (pointer.current.x - target.x) * Math.min(delta * 2.4, 1);
    target.y += (pointer.current.y - target.y) * Math.min(delta * 2.4, 1);
  });

  return (
    <points
      rotation={[-Math.PI / 3.1, 0, 0]}
      position={[0, -1.2, 0]}
      scale={viewport.width < 6 ? 0.72 : 1}
    >
      <bufferGeometry>
        {/* `args` already constructs BufferAttribute(positions, 3), which
            derives count and itemSize itself — re-passing them as props just
            reassigns the same numbers after the fact. */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={PALETTES[theme].blending}
      />
    </points>
  );
}

type HeroSceneProps = {
  /** Grid resolution per axis. Lower it on small screens. */
  density?: number;
  /** false → render a single static frame (prefers-reduced-motion). */
  animate?: boolean;
  /** Drives the palette and the blend mode — see PALETTES. */
  theme?: SceneTheme;
};

const HeroScene = ({
  density = 96,
  animate = true,
  theme = "dark",
}: HeroSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
      style={{ pointerEvents: "none" }}
    >
      <ParticleField count={density} animate={animate} theme={theme} />
    </Canvas>
  );
};

export default HeroScene;
