import fs from "node:fs";
import path from "node:path";
import LazyVideo from "./LazyVideo";

/** One video covering every service (made with `npm run make-showreel`). Hidden if the file is missing. */
export default function Showreel() {
  if (!fs.existsSync(path.join(process.cwd(), "public", "videos", "showreel.webm"))) return null;
  const poster = fs.existsSync(path.join(process.cwd(), "public", "videos", "showreel-poster.jpg")) ? "/videos/showreel-poster.jpg" : undefined;
  return (
    <div className="mt-8" data-reveal="scale">
      <div className="card overflow-hidden" data-tilt="3">
        <LazyVideo src="/videos/showreel.webm" poster={poster} label="One-minute video of all services" />
        <div className="p-4 text-sm">
          <p className="font-bold">All my work in one video (about a minute)</p>
          <p className="text-ink/80 max-sm:hidden">Website, chatbot, WhatsApp automation, dashboard, LocalRank, ReviewBoost, ShowUp, SlotPay, BillEase, CallCatch, PostPilot, LeadLaunch, LeadLens and the agentic AI chatbot are recordings of live demos with sample data. Mobile app, agentic AI, RAG chatbot and AI automation are concept animations that show the idea, not client projects.</p>
        </div>
      </div>
    </div>
  );
}
