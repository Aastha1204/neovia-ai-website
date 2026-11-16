import { PRICING } from "@/config/pricing";
import { WHAT_WE_DO, waLink } from "@/config/site";
import { CheckIcon } from "./Icons";

/** Plain-language explanation: what Neovia AI is, what an AI agency actually does, and what the client gets. */
export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="section relative overflow-hidden">
      <div className="wrap">
        <p data-reveal="up" className="eyebrow">{WHAT_WE_DO.eyebrow}</p>
        <h2 data-reveal="up" data-reveal-delay="90" className="h2 mt-2 max-w-3xl">{WHAT_WE_DO.title}</h2>
        <p data-reveal="up" data-reveal-delay="150" className="mt-4 max-w-3xl text-base text-ink/85 sm:text-lg">{WHAT_WE_DO.intro}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* What does an AI agency do? */}
          <div className="card p-5 sm:p-6 lg:col-span-3" data-reveal="up">
            <h3 className="text-lg font-extrabold sm:text-xl">{WHAT_WE_DO.agencyTitle}</h3>
            <p className="mt-1 text-sm text-ink/75">{WHAT_WE_DO.agencyIntro}</p>
            <ol className="mt-4 space-y-3">
              {WHAT_WE_DO.agencySteps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron text-sm font-extrabold text-ink">{i + 1}</span>
                  <div>
                    <p className="font-extrabold">{s.title}</p>
                    <p className="text-sm text-ink/80">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* What you get */}
          <div className="card p-5 sm:p-6 lg:col-span-2" data-reveal="up" data-reveal-delay="120">
            <h3 className="text-lg font-extrabold sm:text-xl">{WHAT_WE_DO.benefitsTitle}</h3>
            <ul className="mt-4 space-y-3">
              {WHAT_WE_DO.benefits.map((b) => (
                <li key={b} className="flex gap-2 text-sm sm:text-base">
                  <CheckIcon className="mt-0.5 shrink-0 text-teal-dark" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-semibold text-ink/75">{WHAT_WE_DO.forWho}</p>
          </div>
        </div>

        {/* What we build, by group */}
        <h3 data-reveal="up" className="mt-12 text-xl font-extrabold sm:text-2xl">{WHAT_WE_DO.servicesTitle}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5" data-reveal="stagger">
          {PRICING.categories.map((cat) => {
            const info = WHAT_WE_DO.groups[cat];
            const products = PRICING.products.filter((p) => p.category === cat);
            return (
              <div key={cat} className="card p-5 sm:p-6" data-tilt="6" data-glare>
                <h4 className="text-lg font-extrabold">{cat}</h4>
                {info && <p className="mt-1 text-sm text-ink/80">{info}</p>}
                <ul className="mt-3 flex flex-wrap gap-2">
                  {products.map((p) => (
                    <li key={p.id}>
                      <a href={`/pricing#price-${p.id}`} title={p.tagline} className="chip block rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold ring-1 ring-ink/10 hover:ring-ink/30">{p.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal="up">
          <a href="/demos" data-magnetic className="btn btn-primary">See live demos</a>
          <a href="/book-meeting" data-magnetic className="btn btn-ghost text-ink">Book a free call</a>
          <a href={waLink("Hi Neovia AI, I'd like to know what you can do for my business.")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-ink">Ask on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
