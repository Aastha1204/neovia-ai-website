"use client";
import { useEffect, useState } from "react";
import { OWNER } from "@/config/site";

const KEY = "neovia-loaded";
const SHOW_MS = 1150; // how long the loader stays before the curtain lifts
const GONE_MS = SHOW_MS + 750;

// Decided once per page load and reused, because React runs effects twice in development.
let decision: "show" | "skip" | null = null;

/** First-visit entrance: brand mark, counting progress line, then the curtain lifts to reveal the page. Once per tab session. */
export default function Loader() {
  const [state, setState] = useState<"off" | "on" | "done">("off");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (decision === null) {
      try {
        decision = sessionStorage.getItem(KEY) === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "skip" : "show";
        sessionStorage.setItem(KEY, "1");
      } catch {
        decision = "skip";
      }
    }
    if (decision === "skip") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the loader can only decide to show once it can read sessionStorage in the browser
    setState("on");
    document.documentElement.classList.add("fx-loading");
    const SHOW = window.innerWidth < 768 ? 650 : SHOW_MS;
    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / (SHOW - 150));
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t1 = setTimeout(() => { setState("done"); document.documentElement.classList.remove("fx-loading"); }, SHOW);
    const t2 = setTimeout(() => setState("off"), SHOW + 750);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); document.documentElement.classList.remove("fx-loading"); };
  }, []);

  if (state === "off") return null;
  return (
    <div className={`fx-loader ${state === "done" ? "done" : ""}`} aria-hidden="true">
      <div className="fx-loader-blob b1" /><div className="fx-loader-blob b2" /><div className="fx-loader-blob b3" />
      <div className="fx-loader-inner">
        <div className="fx-loader-mark">N</div>
        <div className="fx-loader-brand">
          {OWNER.brand.split("").map((ch, i) => <span key={i} style={{ "--i": i } as React.CSSProperties}>{ch === " " ? " " : ch}</span>)}
        </div>
        <div className="fx-loader-bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="fx-loader-pct">{pct}%</div>
      </div>
    </div>
  );
}
