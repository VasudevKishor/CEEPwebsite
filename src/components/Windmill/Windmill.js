import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import "./Windmill.css";

// --- Scene Export ---
export default function Windmill({ width = "350px", height = "600px" }) {
  // --- Blade Component (Inside for better scoping) ---
  const Blade = ({ rotation }) => {
    const shape = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.bezierCurveTo(0.35, 0.5, 0.3, 2, 0.25, 4);
      s.bezierCurveTo(0.15, 6, 0.1, 8, 0.08, 9);
      s.lineTo(-0.08, 9);
      s.bezierCurveTo(-0.1, 8, -0.15, 6, -0.25, 4);
      s.bezierCurveTo(-0.3, 2, -0.35, 0.5, 0, 0);
      return s;
    }, []);

    const extrudeSettings = useMemo(
      () => ({
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 5,
      }),
      []
    );

    return (
      <mesh rotation={rotation} castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhysicalMaterial
          color="#f8f9fa"
          roughness={0.1}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    );
  };

  const Rotor = () => {
    const rotorRef = useRef();

    useFrame((state, delta) => {
      if (rotorRef.current) {
        rotorRef.current.rotation.z -= (0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1) * delta;
      }
    });

    return (
      <group ref={rotorRef} position={[0, 15, 1.8]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.8, 1.2, 32]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>
        <Blade rotation={[0, 0, 0]} />
        <Blade rotation={[0, 0, (Math.PI * 2) / 3]} />
        <Blade rotation={[0, 0, (Math.PI * 4) / 3]} />
      </group>
    );
  };

  const WindmillModel = () => {
    const angle = -Math.PI / 8;

    return (
      <group position={[0, -18, 0]} rotation={[0, angle, 0]}>
        <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 2.2, 16, 64]} />
          <meshPhysicalMaterial
            color="#f1f5f9"
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 15, -0.6]} castShadow>
          <boxGeometry args={[1.8, 1.8, 4]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.2} metalness={0.1} clearcoat={0.5} />
        </mesh>

        <Rotor />
      </group>
    );
  };

  return (
    <div className="windmill-container" style={{ width, height, position: "relative", zIndex: 10 }}>
      <Suspense fallback={null}>
        <Canvas
          className="windmill-canvas"
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          camera={{ position: [8, 8, 25], fov: 40 }}
        >
          <Environment preset="city" />

          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 20, 15]}
            intensity={1.5}
            castShadow
            shadow-bias={-0.0001}
            shadow-mapSize={[2048, 2048]}
          />

          <WindmillModel />

          <ContactShadows
            position={[0, -10, 0]}
            opacity={0.6}
            scale={20}
            blur={2.5}
            far={20}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
