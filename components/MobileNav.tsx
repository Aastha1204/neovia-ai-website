"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

const LINKS: [string, string][] = [
  ["Demos", "/demos"],
  ["Pricing", "/pricing"],
  ["Solutions", "/#solutions"],
  ["Pay", "/#pay"],
  ["FAQ", "/#faq"],
  ["Contact", "/#contact"],
];

/** Hamburger menu for phones and tablets: one compact button in the header instead of a second row of links. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close after navigating, and on Escape. Lock page scroll while it is open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the menu when the route changes
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="hdr-btn flex h-11 w-11 items-center justify-center rounded-full bg-white/70 ring-1 ring-ink/10"
      >
        <span className="relative block h-3.5 w-5" aria-hidden="true">
          <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
      </button>
      {/* Rendered into <body>: the header has a backdrop-filter, which would otherwise trap a fixed element inside the header bar. */}
      {open && createPortal(
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-label="Menu">
          <nav className="flex flex-col gap-1">
            {LINKS.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3.5 text-lg font-bold hover:bg-white/70">{l}</a>
            ))}
          </nav>
          <a href="/book-meeting" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">Book a meeting</a>
        </div>,
        document.body,
      )}
    </div>
  );
}
