import type { Metadata } from "next";
import { OWNER } from "@/config/site";
import Header from "@/components/Header";
import PricingTabs from "@/components/PricingTabs";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/fx/PageHero";

export const metadata: Metadata = {
  title: `Pricing and offers | ${OWNER.brand}`,
  description: "Basic, Advance and Pro plans for every Neovia AI service, plus Growth Plans, add-ons and billing terms. Prices in INR, excluding 18% GST.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="top">
        <PageHero eyebrow="Pricing" title="Simple pricing for every Neovia AI service" text="Pick Basic, Advance or Pro for any service. You pay a one-time setup and a monthly fee that covers hosting, AI usage and support. All prices exclude 18% GST." />
        <section className="section">
          <div className="wrap">
            <PricingTabs />
            <div className="mt-12 card p-6 text-center" data-reveal="scale" data-tilt="3">
              <p className="text-xl font-extrabold">Not sure which plan fits?</p>
              <p className="mt-1 text-ink/80">Book a free 30-minute call and I’ll help you pick.</p>
              <a href="/book-meeting" data-magnetic className="btn btn-primary mt-4">Book a meeting</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
