import { OWNER } from "@/config/site";
import FloatingButtons from "./FloatingButtons";

export default function SiteFooter() {
  return (
    <>
      <footer className="site-footer px-4 pb-24 pt-10 text-sm text-ink/80 md:pb-10">
        <div className="wrap flex flex-col justify-between gap-4 sm:flex-row">
          <p>© {OWNER.brand} · {OWNER.city}</p>
          <p>All demos use sample data. <a className="underline" href="/privacy">Privacy</a></p>
        </div>
      </footer>
      <FloatingButtons />
    </>
  );
}
