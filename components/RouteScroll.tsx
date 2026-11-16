"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * After a link click to another page (for example the logo from /demos back to the home page), start at the top of the new page.
 * Next.js can otherwise keep the old scroll position when the first element of the page is a sticky header.
 * Back/forward buttons and #anchor links are left alone, so the browser still restores or jumps as expected.
 */
export default function RouteScroll() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => { popped.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (popped.current) { popped.current = false; return; }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
