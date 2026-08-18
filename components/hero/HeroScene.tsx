"use client";

import { useMemo, useRef } from "react";
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
    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

type FieldProps = { count: number; animate: boolean };

function ParticleField({ count, animate }: FieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

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

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 2.6 },
      // Neutral base, amber crest — the ink scale and the single accent from
      // the design system, not a second palette.
      uColorLow: { value: new THREE.Color("#3f3f46") },
      uColorHigh: { value: new THREE.Color("#F2A93C") },
    }),
    []
  );

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
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

type HeroSceneProps = {
  /** Grid resolution per axis. Lower it on small screens. */
  density?: number;
  /** false → render a single static frame (prefers-reduced-motion). */
  animate?: boolean;
};

const HeroScene = ({ density = 96, animate = true }: HeroSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
      style={{ pointerEvents: "none" }}
    >
      <ParticleField count={density} animate={animate} />
    </Canvas>
  );
};

export default HeroScene;
