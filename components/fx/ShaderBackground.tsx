"use client";
import { useEffect, useRef } from "react";

/**
 * Animated WebGL "aurora" background in the brand colours (ink, indigo, teal, saffron).
 * - Domain-warped noise, so the colours flow like liquid instead of a flat gradient.
 * - Reacts softly to the mouse and to scrolling.
 * - Pauses when off-screen or the tab is hidden; renders a single still frame under prefers-reduced-motion.
 * Sits behind content: the parent needs `position: relative`, and this fills it.
 */
const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_intensity; uniform float u_scroll;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  float a = hash(i), b = hash(i+vec2(1.0,0.0)), c = hash(i+vec2(0.0,1.0)), d = hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv; p.x *= u_res.x / u_res.y;
  p.y += u_scroll * 0.15;
  float t = u_time * 0.06;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7, 9.2) + 0.05*u_time), fbm(p + 4.0*q + vec2(8.3, 2.8) - 0.04*u_time));
  float f = fbm(p + 3.5*r);
  // Pastel palette: white-lavender base, powder blue, soft lavender and a touch of sunset peach.
  // Exact palette: powder blue #8DB9F0, soft lavender white #E9E8F8, sunset peach #F5B69E. Sky: blue above, peach near the horizon.
  vec3 blue = vec3(0.553, 0.725, 0.941);
  vec3 lavender = vec3(0.914, 0.910, 0.973);
  vec3 peach = vec3(0.961, 0.714, 0.620);
  vec3 base = mix(mix(peach, lavender, smoothstep(0.0, 0.55, uv.y)), blue, smoothstep(0.45, 1.0, uv.y));
  vec3 col = mix(base, blue, clamp(f*f*2.4, 0.0, 1.0) * 0.8);
  col = mix(col, lavender, clamp(length(q) * 0.9, 0.0, 1.0) * 0.7);
  col = mix(col, peach, clamp(r.y*r.y*1.6 - 0.2, 0.0, 1.0) * 0.8);
  vec2 m = u_mouse; m.x *= u_res.x / u_res.y;
  float d = length(p - m);
  col = mix(col, vec3(1.0), 0.35 * exp(-d*d*5.0));
  col = mix(col, peach, 0.25 * exp(-d*d*14.0));
  float vig = smoothstep(1.6, 0.3, length(uv - 0.5) * 1.4);
  col = mix(col * 0.94 + 0.03, col, vig);
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.025;
  col = mix(base, col, u_intensity);
  gl_FragColor = vec4(col, 1.0);
}`;

export default function ShaderBackground({ intensity = 1, className = "", still = false }: { intensity?: number; className?: string; still?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const touch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (still && touch) return; // phones keep the soft CSS gradient behind this section, with no WebGL running
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return; // CSS gradient fallback stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[fx] shader failed to link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      intensity: gl.getUniformLocation(prog, "u_intensity"),
      scroll: gl.getUniformLocation(prog, "u_scroll"),
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5 };
    let visible = true;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = touch ? 0.75 : Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr), h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let lastT = 0;
    const frame = () => {
      if (touch && !reduced && performance.now() - lastT < 33) { raf = requestAnimationFrame(frame); return; } // about 30 frames a second on phones
      lastT = performance.now();
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const rect = canvas.getBoundingClientRect();
      const scroll = rect.top / Math.max(1, window.innerHeight);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.time, reduced ? 12 : (performance.now() - start) / 1000);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.uniform1f(u.intensity, intensity);
      gl.uniform1f(u.scroll, scroll);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.dataset.ready = "1";
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }, { threshold: 0.01 });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden) kick(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      // Note: no loseContext() here. React runs effects twice in development, and a lost context can't be reused on the same canvas.
    };
  }, [intensity]);

  return (
    <div aria-hidden="true" className={`fx-shader pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
