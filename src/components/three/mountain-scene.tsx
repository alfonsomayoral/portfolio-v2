'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, Suspense } from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

export type MountainVariant = 'alpine' | 'tech' | 'marine' | 'spring';

interface MountainSceneProps {
  variant: MountainVariant;
}

// ===== Variant theme tokens =====
const THEMES: Record<MountainVariant, {
  sky: [string, string];        // [top, bottom]
  fog: { color: string; near: number; far: number };
  ambient: number;
  dirColor: string;
  dirIntensity: number;
  dirPos: [number, number, number];
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  bloomIntensity: number;
  vignetteOpacity: number;
}> = {
  alpine: {
    sky: ['#b8d4e8', '#e8f1f7'],
    fog: { color: '#cfdfe9', near: 25, far: 90 },
    ambient: 0.55,
    dirColor: '#ffffff',
    dirIntensity: 1.05,
    dirPos: [-25, 30, 15],
    cameraPos: [0, 14, 32],
    cameraTarget: [0, 4, 0],
    bloomIntensity: 0.15,
    vignetteOpacity: 0.25,
  },
  tech: {
    sky: ['#020308', '#0a0e1a'],
    fog: { color: '#020610', near: 18, far: 75 },
    ambient: 0.18,
    dirColor: '#10b981',
    dirIntensity: 0.7,
    dirPos: [-15, 22, 12],
    cameraPos: [0, 10, 28],
    cameraTarget: [0, 3, 0],
    bloomIntensity: 0.7,
    vignetteOpacity: 0.55,
  },
  marine: {
    sky: ['#f4a261', '#fcd6a0'],
    fog: { color: '#f7c895', near: 30, far: 95 },
    ambient: 0.45,
    dirColor: '#ffd29b',
    dirIntensity: 1.2,
    dirPos: [-30, 12, 5],
    cameraPos: [0, 6, 26],
    cameraTarget: [0, 1, 0],
    bloomIntensity: 0.25,
    vignetteOpacity: 0.3,
  },
  spring: {
    sky: ['#cdebf6', '#fff6e0'],
    fog: { color: '#dfe9d2', near: 30, far: 100 },
    ambient: 0.6,
    dirColor: '#fff4d4',
    dirIntensity: 1.1,
    dirPos: [-22, 28, 18],
    cameraPos: [0, 12, 30],
    cameraTarget: [0, 3.5, 0],
    bloomIntensity: 0.18,
    vignetteOpacity: 0.22,
  },
};

// Layered pseudo-noise (no extra deps)
function ridgedNoise(x: number, z: number, scale = 1): number {
  return (
    Math.sin(x * 0.15 * scale) * Math.cos(z * 0.18 * scale) * 2.5 +
    Math.sin(x * 0.35 * scale + 1.3) * Math.cos(z * 0.32 * scale + 0.4) * 1.1 +
    Math.sin(x * 0.7 * scale) * Math.cos(z * 0.55 * scale) * 0.45 +
    Math.sin(x * 1.4 * scale + 2.1) * Math.cos(z * 1.6 * scale - 1.0) * 0.22
  );
}

// ===== Mountain Terrain Mesh =====
function MountainTerrain({ variant }: { variant: MountainVariant }) {
  const { geometry, snowMaterial, edgeMaterial, edgeGeometry } = useMemo(() => {
    const size = 80;
    const segments = 110;
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    // Variant-specific palettes
    const palette = (() => {
      switch (variant) {
        case 'alpine':
          return {
            grass: new THREE.Color('#3a5f4a'),
            rock: new THREE.Color('#7a7a7a'),
            snow: new THREE.Color('#fafcff'),
            grassTo: 1.4,
            rockTo: 2.6,
            heightMul: 1.0,
          };
        case 'tech':
          return {
            grass: new THREE.Color('#06291e'),
            rock: new THREE.Color('#0d3a2a'),
            snow: new THREE.Color('#10b981'),
            grassTo: 1.4,
            rockTo: 2.6,
            heightMul: 1.0,
          };
        case 'marine':
          return {
            grass: new THREE.Color('#a89070'),  // beach sand
            rock: new THREE.Color('#7a6650'),
            snow: new THREE.Color('#9a8470'),
            grassTo: 0.6,
            rockTo: 1.2,
            heightMul: 0.35,  // flatter — islands
          };
        case 'spring':
          return {
            grass: new THREE.Color('#5fa86a'),
            rock: new THREE.Color('#a0a070'),
            snow: new THREE.Color('#f0eedd'),
            grassTo: 1.8,
            rockTo: 3.2,
            heightMul: 0.85,
          };
      }
    })();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Falloff toward edges so terrain doesn't reach viewport border high
      const dist = Math.sqrt(x * x + z * z);
      const falloff = Math.max(0, 1 - Math.pow(dist / (size * 0.55), 2));

      const h = ridgedNoise(x, z) * palette.heightMul * falloff;
      pos.setY(i, h);

      const c = h < palette.grassTo
        ? palette.grass.clone()
        : h < palette.rockTo
          ? palette.rock.clone().lerp(palette.snow, (h - palette.grassTo) / (palette.rockTo - palette.grassTo))
          : palette.snow.clone();

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    // Tech variant: also build an edges geometry for the green wireframe overlay
    let edgeGeom: THREE.BufferGeometry | null = null;
    let edgeMat: THREE.LineBasicMaterial | null = null;
    if (variant === 'tech') {
      edgeGeom = new THREE.EdgesGeometry(geom, 18);
      edgeMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.4,
      });
    }

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: variant === 'tech' ? 0.65 : 0.85,
      metalness: variant === 'tech' ? 0.18 : 0.05,
      flatShading: variant !== 'marine',
    });

    return {
      geometry: geom,
      snowMaterial: mat,
      edgeGeometry: edgeGeom,
      edgeMaterial: edgeMat,
    };
  }, [variant]);

  return (
    <group position={[0, 0, 0]}>
      <mesh geometry={geometry} material={snowMaterial} receiveShadow />
      {edgeGeometry && edgeMaterial && (
        <lineSegments geometry={edgeGeometry} material={edgeMaterial} />
      )}
    </group>
  );
}

// ===== Water plane (marine) =====
function Water() {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (matRef.current) {
      // subtle hue shift
      matRef.current.emissiveIntensity = 0.05 + Math.sin(clock.elapsedTime * 0.6) * 0.02;
    }
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        ref={matRef}
        color="#2d6a8a"
        roughness={0.2}
        metalness={0.7}
        emissive="#3a8db8"
        emissiveIntensity={0.07}
      />
    </mesh>
  );
}

// ===== Floating petals (spring) =====
function Petals() {
  const pointsRef = useRef<THREE.Points>(null);
  const { geom, mat } = useMemo(() => {
    const count = 180;
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = Math.random() * 18 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 70;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const m = new THREE.PointsMaterial({
      color: '#f9b8c4',
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    return { geom: g, mat: m };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    const pos = (pointsRef.current.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) - 0.012;
      pos.setY(i, y < 0 ? 18 : y);
      pos.setX(i, pos.getX(i) + Math.sin(t + i) * 0.005);
    }
    pos.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geom} material={mat} />;
}

// ===== Tech particles (digital code rain feel) =====
function TechParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { geom, mat } = useMemo(() => {
    const count = 220;
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = Math.random() * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const m = new THREE.PointsMaterial({
      color: '#34d399',
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    return { geom: g, mat: m };
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0006;
    }
  });

  return <points ref={pointsRef} geometry={geom} material={mat} />;
}

// ===== Sky as a gradient backdrop using a fullscreen plane =====
function SkyGradient({ top, bottom }: { top: string; bottom: string }) {
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(top) },
        bottomColor: { value: new THREE.Color(bottom) },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vWorldPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPos;
        void main() {
          float h = clamp((vWorldPos.y + 1.0) * 0.5, 0.0, 1.0);
          vec3 col = mix(bottomColor, topColor, h);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: false,
      side: THREE.BackSide,
    });
  }, [top, bottom]);

  return (
    <mesh material={mat}>
      <sphereGeometry args={[100, 32, 32]} />
    </mesh>
  );
}

// ===== Camera drift (subtle parallax) =====
function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    camera.position.x += (Math.sin(t * 0.18) * 0.4 - camera.position.x + camera.userData.baseX) * 0.02;
    camera.position.y += (Math.cos(t * 0.13) * 0.25 - camera.position.y + camera.userData.baseY) * 0.02;
    camera.lookAt(camera.userData.target);
  });
  return null;
}

export function MountainScene({ variant }: MountainSceneProps) {
  const theme = THEMES[variant];

  return (
    <Canvas
      camera={{
        position: theme.cameraPos,
        fov: 55,
        near: 0.1,
        far: 200,
      }}
      onCreated={({ camera }) => {
        camera.userData.baseX = theme.cameraPos[0];
        camera.userData.baseY = theme.cameraPos[1];
        camera.userData.target = new THREE.Vector3(...theme.cameraTarget);
        camera.lookAt(camera.userData.target);
      }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      className="absolute inset-0"
    >
      <fog attach="fog" args={[theme.fog.color, theme.fog.near, theme.fog.far]} />
      <ambientLight intensity={theme.ambient} />
      <directionalLight
        position={theme.dirPos}
        intensity={theme.dirIntensity}
        color={theme.dirColor}
      />

      <SkyGradient top={theme.sky[0]} bottom={theme.sky[1]} />

      <Suspense fallback={null}>
        {variant === 'marine' && <Water />}
        <MountainTerrain variant={variant} />
        {variant === 'spring' && <Petals />}
        {variant === 'tech' && <TechParticles />}
        <CameraDrift />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={theme.bloomIntensity}
          luminanceThreshold={variant === 'tech' ? 0.2 : 0.7}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette
          eskil={false}
          offset={0.25}
          darkness={theme.vignetteOpacity}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
