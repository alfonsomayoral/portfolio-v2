'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';
import { WAYPOINTS, SCENE_ORDER, type SceneId } from '@/lib/waypoints';

const ACCENT = new THREE.Color('#10b981');
const ACCENT_DARK = new THREE.Color('#059669');

export function WorkspaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SceneId>('hero');

  // IntersectionObserver to detect active scene
  useEffect(() => {
    const sections = SCENE_ORDER
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as SceneId);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-15% 0px -15% 0px' }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.05);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(...WAYPOINTS.hero.pos);
    const camTarget = new THREE.Vector3(...WAYPOINTS.hero.look);
    camera.lookAt(camTarget);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Lights
    scene.add(new THREE.AmbientLight(0x223040, 0.5));
    const dir = new THREE.DirectionalLight(0x9fc8b8, 0.7);
    dir.position.set(5, 10, 5);
    scene.add(dir);
    const accentLight = new THREE.PointLight(0x10b981, 2.2, 16, 1.6);
    accentLight.position.set(0, 1.8, 1.5);
    scene.add(accentLight);
    const rimLight = new THREE.PointLight(0x34d399, 0.9, 20, 1.4);
    rimLight.position.set(-4, 3, -2);
    scene.add(rimLight);

    // ===== FLOOR GRID =====
    const gridSize = 60;
    const gridDivisions = 60;
    const grid = new THREE.GridHelper(gridSize, gridDivisions, 0x10b981, 0x143d2e);
    grid.position.y = -0.001;
    (grid.material as THREE.LineBasicMaterial).transparent = true;
    (grid.material as THREE.LineBasicMaterial).opacity = 0.35;
    scene.add(grid);

    // Floor plane (catches light, dark)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0b,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.002;
    scene.add(floor);

    // ===== DESK =====
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x16171a,
      roughness: 0.4,
      metalness: 0.5,
      emissive: 0x000000,
    });
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.08, 1.7), deskMat);
    deskTop.position.set(0, 0.9, 0);
    scene.add(deskTop);

    // Desk edge accent strip
    const edgeGeom = new THREE.BoxGeometry(4.5, 0.012, 0.012);
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const edge1 = new THREE.Mesh(edgeGeom, edgeMat);
    edge1.position.set(0, 0.86, 0.85);
    scene.add(edge1);
    const edge2 = edge1.clone();
    edge2.position.z = -0.85;
    scene.add(edge2);

    // Desk legs
    const legGeom = new THREE.BoxGeometry(0.08, 0.9, 0.08);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0d0e10, roughness: 0.6 });
    for (const [x, z] of [[-2.1, 0.75], [2.1, 0.75], [-2.1, -0.75], [2.1, -0.75]] as const) {
      const leg = new THREE.Mesh(legGeom, legMat);
      leg.position.set(x, 0.45, z);
      scene.add(leg);
    }

    // ===== MONITOR =====
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 1.85, -0.3);
    scene.add(monitorGroup);

    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x111315,
      roughness: 0.35,
      metalness: 0.6,
    });
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.45, 0.06), bezelMat);
    monitorGroup.add(bezel);

    // Screen (glowing)
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x05241a });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.28, 1.33), screenMat);
    screen.position.z = 0.032;
    monitorGroup.add(screen);

    // Code lines on screen (instanced small bars)
    const codeGroup = new THREE.Group();
    monitorGroup.add(codeGroup);
    const lineCount = 14;
    for (let i = 0; i < lineCount; i++) {
      const width = 0.4 + Math.random() * 1.4;
      const isHighlight = Math.random() > 0.85;
      const lineMat = new THREE.MeshBasicMaterial({
        color: isHighlight ? 0x34d399 : 0x10b981,
        transparent: true,
        opacity: isHighlight ? 1 : 0.55,
      });
      const line = new THREE.Mesh(new THREE.PlaneGeometry(width, 0.045), lineMat);
      const startX = -1.05 + Math.random() * 0.1;
      line.position.set(startX + width / 2, 0.58 - i * 0.085, 0.034);
      codeGroup.add(line);
    }

    // Monitor stand
    const standMat = new THREE.MeshStandardMaterial({ color: 0x18191c, roughness: 0.5 });
    const standNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.35, 12), standMat);
    standNeck.position.set(0, 1.45, -0.3);
    scene.add(standNeck);
    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.4, 0.04, 24), standMat);
    standBase.position.set(0, 1.28, -0.3);
    scene.add(standBase);

    // ===== KEYBOARD (low poly) =====
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0, 0.97, 0.45);
    scene.add(kbGroup);
    const kbBaseMat = new THREE.MeshStandardMaterial({
      color: 0x16171a,
      roughness: 0.55,
      metalness: 0.3,
    });
    const kbBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.55), kbBaseMat);
    kbGroup.add(kbBase);
    // Keys (subtle bumps)
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x202125,
      roughness: 0.7,
      metalness: 0.1,
      emissive: 0x10b981,
      emissiveIntensity: 0.04,
    });
    const keyGeom = new THREE.BoxGeometry(0.08, 0.025, 0.08);
    const cols = 14;
    const rows = 4;
    const keySpacingX = 0.1;
    const keySpacingZ = 0.11;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = new THREE.Mesh(keyGeom, keyMat);
        key.position.set(
          -((cols - 1) * keySpacingX) / 2 + c * keySpacingX,
          0.045,
          -((rows - 1) * keySpacingZ) / 2 + r * keySpacingZ
        );
        kbGroup.add(key);
      }
    }

    // ===== FLOATING ACCENT OBJECTS =====
    // Wireframe torus knot
    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.45, 0.13, 80, 12),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.5 })
    );
    torus.position.set(3.4, 2.6, -1.2);
    scene.add(torus);

    // Wireframe octahedron
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.55, 0),
      new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true, transparent: true, opacity: 0.45 })
    );
    octa.position.set(-3.3, 2.2, -0.5);
    scene.add(octa);

    // ===== PARTICLE FIELD =====
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = Math.random() * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.025,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // ===== HORIZON RING =====
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(7, 7.05, 64),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.4 })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    // ===== RESIZE =====
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };
    window.addEventListener('resize', onResize);

    // ===== VISIBILITY =====
    let tabVisible = !document.hidden;
    const onVis = () => { tabVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    // ===== ANIMATION LOOP =====
    const clock = new THREE.Clock();
    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!tabVisible) return;
      const dt = clock.getDelta();
      const t = clock.elapsedTime;

      torus.rotation.x += dt * 0.3;
      torus.rotation.y += dt * 0.2;
      octa.rotation.x -= dt * 0.25;
      octa.rotation.y += dt * 0.35;

      // Subtle accent light breathing
      accentLight.intensity = 2.2 + Math.sin(t * 1.4) * 0.4;

      // Particles slow drift
      particles.rotation.y += dt * 0.02;

      // Camera target lerp
      camera.lookAt(camTarget);

      renderer.render(scene, camera);
    };
    tick();

    // ===== EXPOSE CAMERA TRANSITION =====
    const moveTo = (sceneId: SceneId) => {
      const wp = WAYPOINTS[sceneId];
      if (!wp) return;
      const duration = prefersReduced ? 0 : 1.6;
      gsap.to(camera.position, {
        x: wp.pos[0],
        y: wp.pos[1],
        z: wp.pos[2],
        duration,
        ease: 'power2.inOut',
      });
      gsap.to(camTarget, {
        x: wp.look[0],
        y: wp.look[1],
        z: wp.look[2],
        duration,
        ease: 'power2.inOut',
      });
    };
    window.__workspaceMoveTo = moveTo;

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      renderer.dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      floor.geometry.dispose();
      floorMat.dispose();
      delete window.__workspaceMoveTo;
    };
  }, []);

  // Trigger camera transition when active scene changes
  useEffect(() => {
    window.__workspaceMoveTo?.(active);
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, transparent, rgba(10,10,11,0.4) 70%, rgba(10,10,11,0.85) 100%)',
        }}
      />
    </div>
  );
}
