"use client";

import { useState } from "react";
import { PRICING, type PricingProduct, type PricingTier } from "@/config/pricing";
import { waLink } from "@/config/site";

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
const GROWTH = "Growth Plans";

function monthlyText(t: PricingTier) {
  if (t.monthly_label) return t.monthly_label;
  return t.monthly ? `${inr(t.monthly)} / month` : "No monthly fee";
}

function TierCard({ p, t }: { p: PricingProduct; t: PricingTier }) {
  return (
    <div className={`card relative flex flex-col p-5 sm:p-6 max-md:w-[82%] max-md:shrink-0 max-md:snap-center ${t.popular ? "ring-2 ring-saffron" : ""}`} data-tilt="5">
      {t.popular && <span className="absolute -top-3 left-6 rounded-full bg-saffron px-3 py-1 text-xs font-extrabold">Most popular</span>}
      <p className="text-sm font-extrabold uppercase tracking-wide text-teal-dark">{t.name}</p>
      <p className="mt-2 text-2xl font-extrabold">{inr(t.setup)} <span className="text-sm font-semibold text-ink/70">one-time setup</span></p>
      <p className="mb-3 text-sm font-semibold">+ {monthlyText(t)}</p>
      <ul className="flex-1 space-y-1.5 text-sm text-ink/80">
        {t.features.map((f) =>
          /plus:$/.test(f) ? (
            <li key={f} className="italic text-ink/60">{f}</li>
          ) : (
            <li key={f} className="flex gap-2"><span className="font-bold text-teal-dark">✓</span><span>{f}</span></li>
          ),
        )}
      </ul>
      <a href={waLink(`Hi Neovia AI, I am interested in ${p.name} ${t.name}`)} target="_blank" rel="noopener noreferrer" className={`btn mt-5 text-sm ${t.popular ? "btn-primary" : "btn-dark"}`}>
        Get {t.name}
      </a>
    </div>
  );
}

export default function PricingTabs() {
  const [cat, setCat] = useState("All");
  const cats = ["All", ...PRICING.categories, GROWTH];
  const showProducts = (p: PricingProduct) => cat === "All" || p.category === cat;
  const showGrowth = cat === "All" || cat === GROWTH;
  const showExtras = cat === "All";

  return (
    <div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter services">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold ${cat === c ? "border-ink bg-ink text-white" : "border-ink/20 bg-white text-ink"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {PRICING.products.filter(showProducts).map((p) => (
        <section key={p.id} id={`price-${p.id}`} className="mt-10 scroll-mt-24" data-reveal="up">
          <h3 className="text-2xl font-extrabold">{p.name}</h3>
          <p className="mt-1 font-semibold">{p.tagline}</p>
          <p className="text-sm text-ink/70">Best for: {p.best_for}</p>
          <div className="swipe-row mt-4 grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {p.tiers.map((t) => <TierCard key={t.name} p={p} t={t} />)}
          </div>
          {p.note && <p className="mt-3 text-sm text-ink/70">{p.note}</p>}
        </section>
      ))}

      {showGrowth && (
        <section id="growth-plans" className="mt-12 scroll-mt-24">
          <h3 className="text-2xl font-extrabold">Growth Plans</h3>
          <p className="mt-1 text-ink/80">We run several services for you every month, with one fee and one point of contact.</p>
          <div className="swipe-row mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PRICING.growth_plans.map((g, i) => (
              <div key={g.name} className={`card relative flex flex-col p-5 sm:p-6 max-md:w-[82%] max-md:shrink-0 max-md:snap-center ${i === 2 ? "ring-2 ring-saffron" : ""}`} data-tilt="5">
                {i === 2 && <span className="absolute -top-3 left-6 rounded-full bg-saffron px-3 py-1 text-xs font-extrabold">Best for sales</span>}
                <p className="text-sm font-extrabold uppercase tracking-wide text-teal-dark">{g.name}</p>
                <p className="mt-2 text-2xl font-extrabold">{inr(g.monthly)} <span className="text-sm font-semibold text-ink/70">/ month</span></p>
                <p className="mb-3 text-sm font-semibold">Setup {inr(g.setup)} · {g.contract_months}-month plan</p>
                <ul className="flex-1 space-y-1.5 text-sm text-ink/80">
                  {g.features.map((f) => <li key={f} className="flex gap-2"><span className="font-bold text-teal-dark">✓</span><span>{f}</span></li>)}
                </ul>
                <p className="mt-3 text-xs text-ink/70">{g.best_for}</p>
                <a href={waLink(`Hi Neovia AI, I am interested in the ${g.name} plan`)} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-4 text-sm">Talk to us</a>
              </div>
            ))}
          </div>
        </section>
      )}

      {showExtras && (
        <>
          <section id="addons" className="mt-12">
            <h3 className="text-2xl font-extrabold">Add-ons</h3>
            <div className="card mt-4 overflow-hidden">
              <table className="w-full text-left">
                <caption className="sr-only">Add-ons</caption>
                <tbody>
                  {PRICING.addons.map((a) => (
                    <tr key={a.name} className="border-t border-ink/10 first:border-t-0">
                      <th scope="row" className="p-4 font-semibold">
                        {a.name}{a.detail && <span className="font-normal text-ink/60"> ({a.detail})</span>}
                      </th>
                      <td className="p-4 text-right font-bold whitespace-nowrap">
                        {a.price_label ?? `${inr(a.setup ?? 0)} + ${inr(a.monthly ?? 0)} / month`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section id="billing-terms" className="mt-12">
            <h3 className="text-2xl font-extrabold">Billing terms</h3>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-ink/80">
              {PRICING.terms.map((t) => <li key={t}>{t}</li>)}
            </ol>
          </section>
        </>
      )}
    </div>
  );
}
