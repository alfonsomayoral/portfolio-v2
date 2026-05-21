'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SKILLS, SKILL_CATEGORIES, type Skill } from '@/data/skills';

interface PlacedSkill extends Skill {
  position: THREE.Vector3;
}

const LINKS: Array<[string, string]> = [
  ['python', 'pytorch'],
  ['python', 'fastapi'],
  ['python', 'opencv'],
  ['python', 'open3d'],
  ['typescript', 'react-native'],
  ['typescript', 'expo'],
  ['swift', 'arkit'],
  ['swift', 'corelm'],
  ['llms', 'agents'],
  ['llms', 'rag'],
  ['llms', 'openai'],
  ['agents', 'mcp'],
  ['agents', 'langchain'],
  ['rag', 'azure'],
  ['azure', 'openai'],
  ['supabase', 'fastapi'],
  ['react-native', 'expo'],
  ['react-native', 'arkit'],
  ['pytorch', 'transformers'],
  ['opencv', 'arkit'],
  ['open3d', 'arkit'],
  ['langchain', 'azure'],
];

/**
 * Distribute skills on a Fibonacci sphere — even angular spacing.
 */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    positions.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius
      )
    );
  }
  return positions;
}

export function SkillsConstellation({
  onHover,
}: {
  onHover?: (skill: Skill | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Skill | null>(null);

  useEffect(() => {
    onHover?.(hovered);
  }, [hovered, onHover]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!container || !canvas || !tooltip) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(3, 4, 5);
    scene.add(dir);

    // Place skills on Fibonacci sphere
    const radius = 2.2;
    const positions = fibonacciSphere(SKILLS.length, radius);
    const placed: PlacedSkill[] = SKILLS.map((s, i) => ({ ...s, position: positions[i] }));

    // Build node meshes
    const sphereGeom = new THREE.SphereGeometry(0.07, 24, 24);
    const nodeMeshes: THREE.Mesh[] = [];
    const baseScale = new Map<THREE.Mesh, number>();

    placed.forEach((skill) => {
      const baseColor = new THREE.Color(SKILL_CATEGORIES[skill.category].color);
      const mat = new THREE.MeshStandardMaterial({
        color: baseColor,
        emissive: baseColor.clone().multiplyScalar(0.35),
        roughness: 0.4,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(sphereGeom, mat);
      mesh.position.copy(skill.position);
      mesh.userData = skill;
      const sizeBoost = skill.level === 'core' ? 1.35 : skill.level === 'strong' ? 1.1 : 0.85;
      mesh.scale.setScalar(sizeBoost);
      baseScale.set(mesh, sizeBoost);
      scene.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Build connection lines
    const idToPos = new Map(placed.map((p) => [p.id, p.position]));
    const linePositions: number[] = [];
    LINKS.forEach(([a, b]) => {
      const pa = idToPos.get(a);
      const pb = idToPos.get(b);
      if (!pa || !pb) return;
      linePositions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
    });
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.18,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);
    nodeMeshes.forEach((m) => group.attach(m));
    group.attach(lines);

    // Interaction
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let currentHover: THREE.Mesh | null = null;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let manualRotX = 0;
    let manualRotY = 0;

    const setHover = (mesh: THREE.Mesh | null) => {
      if (currentHover === mesh) return;
      if (currentHover) {
        const base = baseScale.get(currentHover) ?? 1;
        currentHover.scale.setScalar(base);
        (currentHover.material as THREE.MeshStandardMaterial).emissiveIntensity = 1;
      }
      currentHover = mesh;
      if (mesh) {
        const base = baseScale.get(mesh) ?? 1;
        mesh.scale.setScalar(base * 1.5);
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 2;
        canvas.style.cursor = 'pointer';
        setHovered(mesh.userData as Skill);
      } else {
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
        setHovered(null);
      }
    };

    const positionTooltip = (worldPos: THREE.Vector3) => {
      const projected = worldPos.clone().applyMatrix4(group.matrixWorld).project(camera);
      const rect = container.getBoundingClientRect();
      const x = ((projected.x + 1) / 2) * rect.width;
      const y = ((-projected.y + 1) / 2) * rect.height;
      tooltip.style.transform = `translate3d(${x + 16}px, ${y + 16}px, 0)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        manualRotY += dx * 0.005;
        manualRotX += dy * 0.005;
        velocityX = dy * 0.005;
        velocityY = dx * 0.005;
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodeMeshes, false);
      setHover(hits.length ? (hits[0].object as THREE.Mesh) : null);
      if (currentHover) positionTooltip(currentHover.position);
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch {}
      canvas.style.cursor = currentHover ? 'pointer' : 'grab';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', () => setHover(null));

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // Visibility
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => { visible = entries[0]?.isIntersecting ?? true; },
      { threshold: 0.05 }
    );
    io.observe(container);

    let tabVisible = !document.hidden;
    document.addEventListener('visibilitychange', () => { tabVisible = !document.hidden; });

    // Animation loop
    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible || !tabVisible) return;

      if (!isDragging && !prefersReduced) {
        // Damped manual rotation + auto-rotation
        velocityX *= 0.95;
        velocityY *= 0.95;
        manualRotY += 0.0018;
        manualRotX += velocityX;
        manualRotY += velocityY;
      }
      group.rotation.x = manualRotX;
      group.rotation.y = manualRotY;

      if (currentHover) positionTooltip(currentHover.position);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      sphereGeom.dispose();
      lineGeom.dispose();
      nodeMeshes.forEach((m) => (m.material as THREE.Material).dispose());
      lineMat.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-square md:aspect-[5/4] max-w-2xl mx-auto">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none cursor-grab"
      />
      <div
        ref={tooltipRef}
        className={`pointer-events-none absolute top-0 left-0 z-10 max-w-[200px] rounded-md border border-border-strong bg-bg-elevated/95 backdrop-blur-sm shadow-2xl px-3 py-2 transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      >
        {hovered && (
          <>
            <p className="font-mono text-[9px] uppercase tracking-wider text-fg-muted mb-1">
              {SKILL_CATEGORIES[hovered.category].label}
            </p>
            <p className="text-sm font-semibold text-fg">{hovered.label}</p>
          </>
        )}
      </div>
    </div>
  );
}
