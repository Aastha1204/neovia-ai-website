"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** The logo. On the home page it smoothly scrolls to the top; from any other page it goes home (RouteScroll then starts at the top). */
export default function LogoLink({ children, className }: { children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      className={className}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (window.location.hash) history.replaceState(null, "", "/");
        }
      }}
    >
      {children}
    </Link>
  );
}
