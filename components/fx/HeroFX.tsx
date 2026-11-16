"use client";
import dynamic from "next/dynamic";
import ShaderBackground from "./ShaderBackground";

// Three.js only loads in the browser, after the first paint, so the headline is never delayed by it.
const Particles3D = dynamic(() => import("./Particles3D"), { ssr: false });

/** Shader aurora + 3D particles for the home hero. The parent must be `position: relative`. */
export default function HeroFX({ particles = true, intensity = 1 }: { particles?: boolean; intensity?: number }) {
  return (
    <>
      <ShaderBackground intensity={intensity} />
      {particles && <Particles3D />}
      <div aria-hidden="true" className="fx-noise pointer-events-none absolute inset-0" />
    </>
  );
}
