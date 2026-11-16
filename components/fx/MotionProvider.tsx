"use client";
import { useEffect } from "react";

/**
 * One small engine for all the page motion, driven by data attributes so server components can use it:
 *  data-reveal="up|left|right|scale|clip|blur"  entrance reveal when scrolled into view (data-stagger on a parent staggers its children)
 *  data-tilt="8"                                  3D tilt toward the pointer (degrees), data-glare adds a moving light
 *  data-parallax="0.15"                           moves with scroll at that fraction of the scroll speed (negative = opposite way)
 *  data-magnetic                                  buttons that lean toward the pointer
 * Plus: a custom cursor (fine pointers only), a scroll progress bar and an html.scrolled flag for the header.
 * Everything is skipped under prefers-reduced-motion (reveals just show).
 */
export default function MotionProvider() {
  useEffect(() => {
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    html.classList.add("fx");
    if (reduced) {
      html.classList.add("fx-reduced");
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("in"));
      return () => html.classList.remove("fx", "fx-reduced");
    }

    /* ---------- reveal on scroll ---------- */
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const el = en.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay || 0);
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
      collectParallax();
    };
    let scanRaf = 0;
    const mo = new MutationObserver(() => { cancelAnimationFrame(scanRaf); scanRaf = requestAnimationFrame(scan); });
    mo.observe(document.body, { childList: true, subtree: true });

    /* ---------- parallax ---------- */
    let parallaxEls: HTMLElement[] = [];
    const lastPy = new WeakMap<HTMLElement, number>();
    const collectParallax = () => { parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")); };
    const vh = () => window.innerHeight;
    const parallaxFrame = () => {
      const h = vh();
      for (const el of parallaxEls) {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        const r = el.getBoundingClientRect();
        const last = lastPy.get(el) || 0;
        if (r.bottom - last < -200 || r.top - last > h + 200) continue;
        const c = r.top - last + r.height / 2 - h / 2;
        const py = -c * speed;
        lastPy.set(el, py);
        el.style.setProperty("--py", `${py.toFixed(1)}px`);
      }
    };

    /* ---------- scroll: progress bar, header flag, parallax ---------- */
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    let scrollRaf = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - vh();
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
        html.classList.toggle("scrolled", window.scrollY > 24);
        parallaxFrame();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    /* ---------- tilt + magnetic (delegated) ---------- */
    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;
    let moveRaf = 0;
    let lastEvent: PointerEvent | null = null;
    const resetTilt = (el: HTMLElement) => {
      el.classList.remove("tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    const resetMag = (el: HTMLElement) => {
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };
    const applyMove = () => {
      const e = lastEvent;
      if (!e) return;
      const target = e.target as Element | null;
      const t = (target?.closest?.("[data-tilt]") as HTMLElement | null) ?? null;
      if (tiltEl && tiltEl !== t) resetTilt(tiltEl);
      tiltEl = t;
      if (t) {
        const r = t.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        const max = parseFloat(t.dataset.tilt || "") || 7;
        t.classList.add("tilting");
        t.style.setProperty("--ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
        t.style.setProperty("--rx", `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
        t.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        t.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      }
      const m = (target?.closest?.("[data-magnetic]") as HTMLElement | null) ?? null;
      if (magEl && magEl !== m) resetMag(magEl);
      magEl = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const k = Math.min(18, r.width * 0.12);
        m.style.setProperty("--tx", `${((dx / (r.width / 2)) * k).toFixed(1)}px`);
        m.style.setProperty("--ty", `${((dy / (r.height / 2)) * k * 0.6).toFixed(1)}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      cancelAnimationFrame(moveRaf);
      moveRaf = requestAnimationFrame(applyMove);
      cursorMove(e);
    };
    const onLeaveDoc = () => {
      if (tiltEl) resetTilt(tiltEl);
      if (magEl) resetMag(magEl);
      tiltEl = magEl = null;
      cursor?.classList.add("hidden-cursor");
    };

    /* ---------- custom cursor (fine pointers only) ---------- */
    let cursor: HTMLDivElement | null = null;
    let dot: HTMLDivElement | null = null;
    let label: HTMLDivElement | null = null;
    const cur = { x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth / 2, ry: innerHeight / 2 };
    let cursorRaf = 0;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      html.classList.add("fx-cursor");
      cursor = document.createElement("div");
      cursor.className = "cur-ring hidden-cursor";
      label = document.createElement("div");
      label.className = "cur-label";
      cursor.appendChild(label);
      dot = document.createElement("div");
      dot.className = "cur-dot hidden-cursor";
      document.body.append(cursor, dot);
      const tick = () => {
        cur.rx += (cur.x - cur.rx) * 0.18;
        cur.ry += (cur.y - cur.ry) * 0.18;
        cursor!.style.transform = `translate3d(${cur.rx}px, ${cur.ry}px, 0) translate(-50%, -50%)`;
        dot!.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
        cursorRaf = requestAnimationFrame(tick);
      };
      cursorRaf = requestAnimationFrame(tick);
      document.addEventListener("pointerdown", () => cursor?.classList.add("pressed"));
      document.addEventListener("pointerup", () => cursor?.classList.remove("pressed"));
    }
    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary, label, [data-cursor]";
    const cursorMove = (e: PointerEvent) => {
      if (!cursor || !dot) return;
      cur.x = e.clientX; cur.y = e.clientY;
      cursor.classList.remove("hidden-cursor");
      dot.classList.remove("hidden-cursor");
      const target = e.target as Element | null;
      const hit = target?.closest?.(INTERACTIVE) as HTMLElement | null;
      cursor.classList.toggle("is-hover", Boolean(hit));
      const typing = Boolean(target?.closest?.("input, textarea, select"));
      cursor.classList.toggle("is-text", typing);
      const text = (target?.closest?.("[data-cursor-text]") as HTMLElement | null)?.dataset.cursorText || "";
      if (label && label.textContent !== text) label.textContent = text;
      cursor.classList.toggle("has-label", Boolean(text));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveDoc);
    document.addEventListener("mouseleave", onLeaveDoc);

    // First pass after a short beat, so streamed parts of the page have hydrated before we touch their classes.
    const startTimer = setTimeout(() => { scan(); onScroll(); }, 120);

    return () => {
      clearTimeout(startTimer);
      io.disconnect(); mo.disconnect();
      cancelAnimationFrame(scanRaf); cancelAnimationFrame(scrollRaf); cancelAnimationFrame(moveRaf); cancelAnimationFrame(cursorRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveDoc);
      document.removeEventListener("mouseleave", onLeaveDoc);
      bar.remove(); cursor?.remove(); dot?.remove();
      html.classList.remove("fx", "fx-cursor", "scrolled");
    };
  }, []);

  return null;
}
