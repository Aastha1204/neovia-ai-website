import {
  ABOUT, AUDIT, COMPARISON, CONTACT, DEFAULT_WA_MESSAGE, DEMOS, DEMO_NOTE, HERO, HERO_SLIDES, WORKS, OWNER,
  PAYMENT_NOTE, PROBLEMS, SERVICES, STEPS, waLink,
} from "@/config/site";
import Header from "@/components/Header";
import HeroFX from "@/components/fx/HeroFX";
import ShaderBackground from "@/components/fx/ShaderBackground";
import SplitText from "@/components/fx/SplitText";
import Orbs from "@/components/fx/Orbs";
import WhatWeDo from "@/components/WhatWeDo";
import FloatingTiles from "@/components/fx/FloatingTiles";
import { demoShots } from "@/components/DemoVisual";
import HeroCarousel from "@/components/HeroCarousel";
import DemoCard from "@/components/DemoCard";
import IndustryTabs from "@/components/IndustryTabs";
import RoiEstimator from "@/components/RoiEstimator";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import WorkCarousel from "@/components/WorkCarousel";
import Showreel from "@/components/Showreel";
import Payments from "@/components/Payments";
import FloatingButtons from "@/components/FloatingButtons";
import { CalendarIcon, CheckIcon, MailIcon, PhoneIcon, PinIcon, PlayIcon, WhatsAppIcon, XIcon } from "@/components/Icons";

function BookOrWhatsApp({ label, message, dark = false }: { label: string; message: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        <WhatsAppIcon /> {label}
      </a>
      {CONTACT.bookingUrl && (
        <a href={CONTACT.bookingUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-ghost ${dark ? "text-white" : "text-ink"}`}>
          <CalendarIcon /> Book a call
        </a>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <div className="flex flex-col">
        <WorkCarousel
          works={WORKS.map((w) => {
            const h = HERO_SLIDES.find((s) => s.service === w.title);
            const d = DEMOS.find((x) => x.slug === h?.demoSlug);
            return { ...w, desktop: d ? demoShots(d).desktop : null, illustration: h?.illustration };
          })}
        />
        {/* HERO */}
        <section className="section relative overflow-hidden bg-mist pb-14 pt-8 text-ink md:pb-24 md:pt-14">
          <HeroFX />
          <div className="wrap relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow rise !text-ink/75">{OWNER.brand} · {OWNER.city}</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"><SplitText text={HERO.headline} start={120} /></h1>
              <p className="rise rise-2 mt-5 max-w-xl text-lg text-ink/80">{HERO.sub}</p>
              <div className="rise rise-3 mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={waLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" data-magnetic className="btn btn-primary">
                  <WhatsAppIcon /> Get a free demo for my business
                </a>
                <a href="#demos" data-magnetic data-cursor-text="Scroll" className="btn btn-ghost text-ink">See live demos</a>
              </div>
              <ul className="rise rise-3 mt-7 hidden flex-wrap gap-2 sm:flex">
                {HERO.chips.map((c) => (
                  <li key={c} className="chip rounded-full bg-white/70 px-3 py-1.5 text-sm font-semibold ring-1 ring-ink/10">{c}</li>
                ))}
              </ul>
            </div>
            <div className="pr-4 lg:pr-8" data-parallax="-0.06" suppressHydrationWarning>
              <div className="pop float" style={{ animationDelay: "300ms, 1.3s" }}>
              <div data-tilt="5" data-cursor-text="Live demo" className="hero-glass">
              <HeroCarousel slides={HERO_SLIDES.map((h) => {
                const d = DEMOS.find((x) => x.slug === h.demoSlug);
                return d
                  ? { service: h.service, label: "Live demo · sample data", url: d.url, ...demoShots(d) }
                  : { service: h.service, label: "Illustration · no live demo yet", url: null, desktop: null, mobile: null, illustration: h.illustration };
              })} />
              </div>
              </div>
            </div>
          </div>
          <FloatingTiles />
        </section>
        </div>

        {/* WHAT IS NEOVIA AI */}
        <WhatWeDo />

        {/* PROBLEMS */}
        <section className="section">
          <div className="wrap">
            <p data-reveal="up" className="eyebrow">The cost of doing nothing</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2 max-w-2xl">Every day, some enquiries quietly slip away</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4" data-reveal="stagger">
              {PROBLEMS.map((p) => (
                <div key={p.title} className="card p-4 sm:p-6" data-tilt="8" data-glare>
                  <h3 className="text-base font-extrabold leading-snug sm:text-lg">{p.title}</h3>
                  <p className="mt-1.5 text-xs text-ink/80 sm:mt-2 sm:text-sm">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8" data-reveal="up"><a href="#audit" data-magnetic className="btn btn-dark">See where you are losing enquiries</a></div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="section bg-mist">
          <div className="wrap">
            <p data-reveal="up" className="eyebrow">Before and after</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Without automation vs with automation</h2>
            <div className="card mt-8 overflow-hidden" data-reveal="up" data-reveal-delay="150">
              <table className="w-full text-left text-sm sm:text-base">
                <caption className="sr-only">Comparison of working without and with automation</caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-1/2 bg-ink/5 p-4 font-extrabold">Without automation</th>
                    <th scope="col" className="w-1/2 bg-teal/25 p-4 font-extrabold">With automation</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((r) => (
                    <tr key={r.without} className="border-t border-ink/10 align-top">
                      <td className="p-4"><span className="flex gap-2"><XIcon className="mt-0.5 shrink-0 text-red-700" />{r.without}</span></td>
                      <td className="p-4"><span className="flex gap-2"><CheckIcon className="mt-0.5 shrink-0 text-teal-dark" />{r.with}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="solutions" className="section">
          <div className="wrap">
            <p data-reveal="up" className="eyebrow">Solutions by industry</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Solutions made for your kind of business</h2>
            <IndustryTabs />
          </div>
        </section>

        {/* DEMOS */}
        <section id="demos" className="section relative overflow-hidden bg-mist">
          <Orbs />
          <div className="wrap relative">
            <p data-reveal="up" className="eyebrow">Live demos</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2 max-w-2xl">See a free demo: these are real, working demos</h2>
            <p className="mt-3 text-ink/80">Each demo uses sample data. {DEMO_NOTE}</p>
            <Showreel />
            <div className="mt-8 grid gap-6 max-lg:[&>article:nth-child(n+3)]:hidden lg:mt-10 lg:grid-cols-2 lg:gap-10" data-reveal="stagger">
              {DEMOS.slice(0, 4).map((d) => <DemoCard key={d.slug} demo={d} cardEnabled={Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)} />)}
            </div>
            <div className="mt-10 text-center" data-reveal="up">
              <a href="/demos" data-magnetic className="btn btn-primary">See all {DEMOS.length} demos</a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section">
          <div className="wrap">
            <p data-reveal="up" className="eyebrow">Services</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Exactly what your business needs</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
              {SERVICES.map((s) => (
                <div key={s.name} className="card p-6" data-tilt="8" data-glare>
                  <h3 className="text-lg font-extrabold">{s.name}</h3>
                  <p className="mt-2 text-sm text-ink/80"><strong>What you get:</strong> {s.get}</p>
                  <p className="mt-3 inline-block rounded-full bg-saffron/25 px-3 py-1 text-xs font-bold">Typical delivery: {s.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI */}
        <section className="section bg-mist">
          <div className="wrap">
            <p data-reveal="up" className="eyebrow">Simple estimator</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">How many enquiries are slipping away? Enter your numbers</h2>
            <RoiEstimator />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section relative overflow-hidden">
          <Orbs variant="b" />
          <div className="wrap relative">
            <p data-reveal="up" className="eyebrow">Pricing</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Simple pricing for every Neovia AI service</h2>
            <p className="mt-3 max-w-3xl text-ink/80">Pick Basic, Advance or Pro for any service. You pay a one-time setup and a monthly fee that covers hosting, AI usage and support. All prices exclude 18% GST.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-reveal="up" data-reveal-delay="200">
              <a href="/pricing" data-magnetic className="btn btn-primary">See all plans and offers</a>
              <a href="/book-meeting" data-magnetic className="btn btn-ghost text-ink">Book a meeting</a>
            </div>
          </div>
        </section>

        {/* PAYMENTS */}
        <section id="pay" className="section bg-mist">
          <div className="wrap">
            <p data-reveal="up" className="eyebrow">Payments</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Easy, safe ways to pay</h2>
            <Payments cardEnabled={Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section relative overflow-hidden bg-mist text-ink">
          <ShaderBackground intensity={0.7} still />
          <div className="wrap relative">
            <p data-reveal="up" className="eyebrow">How it works</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Four simple steps</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-4" data-reveal="stagger">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-white/75 p-6 ring-1 ring-ink/10 backdrop-blur-sm" data-tilt="8" data-glare>
                  <span className="step-no flex h-9 w-9 items-center justify-center rounded-full bg-saffron font-extrabold text-ink">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink/80">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-semibold text-saffron-dark">{PAYMENT_NOTE}</p>
          </div>
        </section>

        {/* WHY ME */}
        <section className="section">
          <div className="wrap grid gap-10 lg:grid-cols-2">
            <div>
              <p data-reveal="up" className="eyebrow">Why work with me</p>
              <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Straight talk, clean work</h2>
              <p className="mt-4 text-lg text-ink/85" data-reveal="up" data-reveal-delay="180">{ABOUT.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {ABOUT.skills.map((s) => <li key={s} className="chip rounded-full bg-white px-3 py-1.5 text-sm font-semibold ring-1 ring-ink/15">{s}</li>)}
              </ul>
            </div>
            <ul className="space-y-4" data-reveal="stagger">
              {ABOUT.promises.map((p) => (
                <li key={p} className="card flex gap-3 p-5 font-semibold" data-tilt="5" data-glare><CheckIcon className="mt-0.5 shrink-0 text-teal-dark" />{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* AUDIT */}
        <section id="audit" className="section cta-gradient">
          <div className="wrap text-center" data-reveal="scale">
            <h2 data-reveal="up" data-reveal-delay="90" className="h2">{AUDIT.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg">{AUDIT.text}</p>
            <div className="mt-6 flex justify-center">
              <BookOrWhatsApp label="Get my free audit" message="Hi Neovia AI, here is my business name. Please show me 3 places I'm losing enquiries (free audit)." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section">
          <div className="wrap max-w-3xl">
            <p data-reveal="up" className="eyebrow">FAQ</p>
            <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Frequently asked questions</h2>
            <Faq />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section bg-mist">
          <div className="wrap grid gap-10 lg:grid-cols-2">
            <div data-reveal="left">
              <p className="eyebrow">Contact</p>
              <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2">Chat with me on WhatsApp</h2>
              <p className="mt-3 text-lg">I reply within 24 hours.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={`tel:${CONTACT.phone}`} className="btn btn-dark px-8 py-4 text-lg"><PhoneIcon /> Call {CONTACT.phone}</a>
                <a href={waLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-wa px-8 py-4 text-lg"><WhatsAppIcon /> WhatsApp</a>
              </div>
              {CONTACT.bookingUrl && (
                <a href={CONTACT.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3 text-ink"><CalendarIcon /> Book a call</a>
              )}
              <ul className="mt-6 space-y-2 font-semibold">
                <li className="flex items-center gap-2"><MailIcon /> <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li className="flex items-center gap-2"><PinIcon /> {OWNER.city}</li>
              </ul>
            </div>
            <div data-reveal="right"><ContactForm /></div>
          </div>
        </section>
      </main>

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


