"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * A GPU particle field: a displaced grid of points driven entirely by a vertex
 * shader. One draw call, no per-frame allocation, no state — the only thing
 * React does after mount is nothing at all.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  varying float vElevation;
  varying float vDistance;

  void main() {
    vec3 pos = position;

    // two crossing waves, slightly out of phase, so the field never visibly loops
    float wave = sin(pos.x * 0.55 + uTime * 0.42) * 0.5
               + sin(pos.y * 0.42 - uTime * 0.31) * 0.5;

    // pointer acts as a soft gravity well
    float pointerDist = distance(pos.xy, uPointer * 6.0);
    float lift = smoothstep(4.0, 0.0, pointerDist);

    pos.z += wave * 0.85 + lift * 1.35;

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
  varying float vElevation;
  varying float vDistance;

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
    gl_FragColor = vec4(color, alpha * uAlpha);
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
  { low: string; high: string; blending: THREE.Blending; alpha: number }
> = {
  dark: {
    low: "#3f3f46",
    high: "#F2A93C",
    blending: THREE.AdditiveBlending,
    alpha: 0.6,
  },
  light: {
    // Two steps lighter than the dark theme's neutral is deliberate: dark marks
    // on a pale canvas gain contrast far faster than pale marks on a dark one,
    // so matching the dark values here would read as dirt over the copy.
    low: "#d4d4d8",
    high: "#C9942E",
    blending: THREE.NormalBlending,
    alpha: 0.55,
  },
};

type FieldProps = { count: number; animate: boolean; theme: SceneTheme };

function ParticleField({ count, animate, theme }: FieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
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
    material.blending = palette.blending;
    material.needsUpdate = true;

    // Under prefers-reduced-motion the canvas runs on "demand" and would keep
    // showing the old palette until something else requested a frame.
    invalidate();
  }, [theme, invalidate]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    if (animate) {
      material.uniforms.uTime.value += delta;
    }

    // ease the pointer instead of snapping to it
    const target = material.uniforms.uPointer.value as THREE.Vector2;
    target.x += (state.pointer.x - target.x) * Math.min(delta * 2.4, 1);
    target.y += (state.pointer.y - target.y) * Math.min(delta * 2.4, 1);
  });

  return (
    <points
      rotation={[-Math.PI / 3.1, 0, 0]}
      position={[0, -1.2, 0]}
      scale={viewport.width < 6 ? 0.72 : 1}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
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
