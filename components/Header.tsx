import Image from "next/image";
import LogoLink from "./LogoLink";
import { CONTACT, OWNER, PILOT_OFFER, DEFAULT_WA_MESSAGE, waLink } from "@/config/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import MobileNav from "./MobileNav";

const LINKS = [
  ["What we do", "/#what-we-do"],
  ["Demos", "/demos"],
  ["Solutions", "/#solutions"],
  ["Pricing", "/pricing"],
  ["Pay", "/#pay"],
  ["FAQ", "/#faq"],
  ["Contact", "/#contact"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      {PILOT_OFFER.enabled && (
        <div className="bg-saffron px-4 py-2 text-center text-sm font-semibold text-ink">{PILOT_OFFER.text}</div>
      )}
      <div className="site-header-bar border-b border-ink/10 bg-paper/95 backdrop-blur">
        <div className="wrap flex items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:py-3">
          <LogoLink className="flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-extrabold tracking-tight sm:text-lg">
            <Image src="/logo.png" alt="" width={36} height={36} priority className="h-9 w-9 rounded-lg" />
            {OWNER.brand}
          </LogoLink>
          <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {LINKS.map(([l, h]) => (
              <a key={h} href={h} className="nav-link hover:text-teal-dark">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="/book-meeting" data-magnetic className="btn btn-primary book-desktop px-4 py-2 text-sm">Book a meeting</a>
            <a href={`tel:${CONTACT.phone}`} className="btn btn-ghost hdr-btn px-4 py-2 text-sm text-ink" aria-label="Call Neovia AI">
              <PhoneIcon /> <span className="hidden sm:inline">Call</span>
            </a>
            <a href={waLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-wa hdr-btn px-4 py-2 text-sm" aria-label="Chat on WhatsApp">
              <WhatsAppIcon /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <MobileNav />
          </div>
        </div>
              </div>
    </header>
  );
}
