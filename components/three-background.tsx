"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface FloatingImageProps {
  position: [number, number, number];
  imageUrl: string;
  rotationSpeed: number;
  floatSpeed: number;
  index: number;
}

function FloatingImage({ position, imageUrl, rotationSpeed, floatSpeed, index }: FloatingImageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const grayscaleRef = useRef(1.0);
  const initialRotation = useMemo(() => [
    (Math.random() - 0.5) * 0.5,
    (Math.random() - 0.5) * 0.5,
    (Math.random() - 0.5) * 0.5,
  ], []);
  
  const texture = useTexture(imageUrl);
  
  const shaderMaterial = useMemo(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uGrayscale: { value: 1.0 },
        uTime: { value: 0 },
        uHover: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          // 微細な波打つ効果
          pos.z += sin(pos.x * 2.0 + uTime) * 0.02 * (1.0 + uHover);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uGrayscale;
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          
          // グレースケール変換
          float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          vec3 finalColor = mix(color.rgb, vec3(gray), uGrayscale);
          
          // エッジライト効果（ホバー時）
          float edge = smoothstep(0.0, 0.1, abs(dot(vNormal, vec3(0.0, 0.0, 1.0))));
          finalColor += vec3(0.8, 0.0, 0.0) * uHover * (1.0 - edge) * 0.3;
          
          // 微細なグロー効果
          finalColor += vec3(0.8, 0.0, 0.0) * uHover * 0.1;
          
          gl_FragColor = vec4(finalColor, color.a);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, [texture]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // ゆっくりとした回転（各画像で異なる速度）
      meshRef.current.rotation.y = initialRotation[1] + time * rotationSpeed;
      meshRef.current.rotation.x = initialRotation[0] + Math.sin(time * floatSpeed) * 0.2;
      meshRef.current.rotation.z = initialRotation[2] + Math.cos(time * floatSpeed * 0.7) * 0.1;
      
      // 浮遊効果（各画像で異なる位相）
      const floatOffset = Math.sin(time * floatSpeed + index) * 0.5;
      meshRef.current.position.y = position[1] + floatOffset;
      
      // カメラ方向への微細な回転
      const cameraDirection = new THREE.Vector3();
      state.camera.getWorldDirection(cameraDirection);
      meshRef.current.lookAt(
        meshRef.current.position.clone().add(cameraDirection.multiplyScalar(-1))
      );
    }

    // ホバー時のグレースケール解除とシェーダー更新
    if (materialRef.current) {
      const targetGrayscale = hovered ? 0.0 : 1.0;
      const targetHover = hovered ? 1.0 : 0.0;
      
      grayscaleRef.current = THREE.MathUtils.lerp(
        grayscaleRef.current,
        targetGrayscale,
        0.08
      );
      
      materialRef.current.uniforms.uGrayscale.value = grayscaleRef.current;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        targetHover,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    >
      <planeGeometry args={[3.5, 4.5, 32, 32]} />
      <primitive object={shaderMaterial} ref={materialRef} />
    </mesh>
  );
}

interface ThreeBackgroundProps {
  images?: string[];
}

const defaultImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
];

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 30;
      
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] += Math.sin(time + i) * 0.001;
        positions[i + 1] += Math.cos(time + i) * 0.001;
        positions[i + 2] += Math.sin(time * 0.5 + i) * 0.001;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#cc0000"
        transparent
        opacity={0.3}
        sizeAttenuation={true}
      />
    </points>
  );
}

function SceneContent({ images = defaultImages }: { images: string[] }) {
  const imagePositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    const count = Math.min(images.length, 15);
    
    // より洗練された配置：3D空間に自然に分散
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 6 + Math.random() * 5;
      const height = (Math.random() - 0.5) * 8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push([x, height, z]);
    }
    
    return positions;
  }, [images]);

  return (
    <>
      {/* 環境光と指向性ライト */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#cc0000" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#cc0000" distance={20} decay={2} />
      
      {/* パーティクルフィールド */}
      <ParticleField />
      
      {/* 浮遊する画像 */}
      {imagePositions.map((position, idx) => (
        <Suspense key={idx} fallback={null}>
          <FloatingImage
            position={position}
            imageUrl={images[idx % images.length]}
            rotationSpeed={0.05 + Math.random() * 0.08}
            floatSpeed={0.3 + Math.random() * 0.4}
            index={idx}
          />
        </Suspense>
      ))}
    </>
  );
}

function AnimatedCamera() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // より滑らかなカメラ動き
    camera.position.x = Math.sin(time * 0.08) * 3;
    camera.position.z = Math.cos(time * 0.08) * 3;
    camera.position.y = Math.sin(time * 0.05) * 1.5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function ThreeBackground({ images = defaultImages }: ThreeBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0 bg-story-paper" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
        <AnimatedCamera />
        <Suspense fallback={null}>
          <SceneContent images={images} />
        </Suspense>
      </Canvas>
      {/* グラデーションオーバーレイ（より洗練された） */}
      <div className="absolute inset-0 bg-gradient-to-b from-story-paper via-story-paper/60 to-story-paper pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-story-paper/40 pointer-events-none" />
    </div>
  );
}
