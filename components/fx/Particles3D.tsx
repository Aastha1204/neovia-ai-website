"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A slow 3D particle field (teal, saffron and white points) with a wireframe icosahedron,
 * drifting and tilting toward the mouse. Transparent, pointer-events none, so it layers over the shader.
 * Pauses when off-screen; still under prefers-reduced-motion.
 */
export default function Particles3D({ count = 1400 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones and tablets: no 3D particle field (saves battery, memory and a WebGL context). The shader already gives the hero its motion.
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) return;
    const total = count;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
    camera.position.z = 6;
    const group = new THREE.Group();
    scene.add(group);

    // Points on a thick shell plus a flat ring, in brand colours.
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    const teal = new THREE.Color("#3f7bd4"), saffron = new THREE.Color("#f5b69e"), white = new THREE.Color("#ffffff");
    for (let i = 0; i < total; i++) {
      const ring = i % 4 === 0;
      const a = Math.random() * Math.PI * 2;
      let x: number, y: number, z: number;
      if (ring) {
        const rr = 3.0 + (Math.random() - 0.5) * 0.5;
        x = Math.cos(a) * rr; y = (Math.random() - 0.5) * 0.25; z = Math.sin(a) * rr;
      } else {
        const b = Math.acos(2 * Math.random() - 1);
        const rr = 1.6 + Math.random() * 1.1;
        x = rr * Math.sin(b) * Math.cos(a); y = rr * Math.sin(b) * Math.sin(a); z = rr * Math.cos(b);
      }
      pos.set([x, y, z], i * 3);
      const c = Math.random() < 0.55 ? teal : Math.random() < 0.6 ? saffron : white;
      col.set([c.r, c.g, c.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false, sizeAttenuation: true }));
    group.add(points);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.15, 1)),
      new THREE.LineBasicMaterial({ color: 0x9d8ae0, transparent: true, opacity: 0.45 }),
    );
    group.add(wire);
    const wire2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.OctahedronGeometry(0.7, 0)),
      new THREE.LineBasicMaterial({ color: 0xe8906f, transparent: true, opacity: 0.6 }),
    );
    group.add(wire2);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let visible = true, raf = 0;
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    const frame = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const t = now / 1000;
      points.rotation.y = t * 0.05;
      points.rotation.x = Math.sin(t * 0.1) * 0.15;
      wire.rotation.x = t * 0.18; wire.rotation.y = t * 0.12;
      wire2.rotation.x = -t * 0.25; wire2.rotation.z = t * 0.2;
      group.rotation.y = mouse.x * 0.35;
      group.rotation.x = -mouse.y * 0.25;
      group.position.y = Math.sin(t * 0.5) * 0.08;
      renderer.render(scene, camera);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const kick = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const ro = new ResizeObserver(() => { resize(); kick(); });
    ro.observe(host);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }, { threshold: 0.01 });
    io.observe(host);
    const onVis = () => { if (!document.hidden) kick(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    resize();
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose(); (points.material as THREE.Material).dispose();
      wire.geometry.dispose(); (wire.material as THREE.Material).dispose();
      wire2.geometry.dispose(); (wire2.material as THREE.Material).dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [count]);

  return <div ref={ref} aria-hidden="true" className="fx-particles pointer-events-none absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />;
}
