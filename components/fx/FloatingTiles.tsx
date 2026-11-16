import { CheckIcon, ChatIcon, WhatsAppIcon } from "@/components/Icons";

/** Floating frosted-glass tiles at different depths behind the hero (parallax + float), for a layered 3D feel. Hidden on phones. */
export default function FloatingTiles() {
  const tiles = [
    { icon: <ChatIcon />, title: "Replies in seconds", text: "Every enquiry answered 24×7", pos: "left-[45%] top-[7%]", speed: "0.14", delay: "0s" },
    { icon: <WhatsAppIcon />, title: "Leads saved", text: "Straight to your WhatsApp", pos: "right-[-1%] top-[34%]", speed: "-0.1", delay: "-2.5s" },
    { icon: <CheckIcon />, title: "Bookings confirmed", text: "No calls, no waiting", pos: "left-[47%] bottom-[5%]", speed: "0.2", delay: "-4.5s" },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {tiles.map((t) => (
        <div key={t.title} className={`absolute ${t.pos}`} data-parallax={t.speed} suppressHydrationWarning>
          <div className="glass-tile float" style={{ animationDelay: t.delay }}>
            <span className="glass-tile-icon">{t.icon}</span>
            <div>
              <p className="text-sm font-extrabold leading-tight">{t.title}</p>
              <p className="text-xs text-ink/70">{t.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
