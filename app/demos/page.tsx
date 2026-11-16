import type { Metadata } from "next";
import { DEMOS, DEMO_NOTE, OWNER } from "@/config/site";
import Header from "@/components/Header";
import DemoCard from "@/components/DemoCard";
import Showreel from "@/components/Showreel";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/fx/PageHero";
import Orbs from "@/components/fx/Orbs";

export const metadata: Metadata = {
  title: `Live demos | ${OWNER.brand}`,
  description: "Working demos of every Neovia AI project, built with sample data: chatbots, WhatsApp automation, booking, billing, dashboards and more.",
  alternates: { canonical: "/demos" },
};

export default function DemosPage() {
  return (
    <>
      <Header />
      <main id="top">
        <PageHero eyebrow="Live demos" title={`All ${DEMOS.length} projects, with a working demo for each`} text={`Each demo uses sample data. ${DEMO_NOTE}`} />
        <section className="section relative overflow-hidden bg-mist">
          <Orbs />
          <div className="wrap relative">
            <Showreel />
            <div className="mt-10 grid gap-10 lg:grid-cols-2" data-reveal="stagger">
              {DEMOS.map((d) => <DemoCard key={d.slug} demo={d} cardEnabled={Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)} />)}
            </div>
            <div className="mt-12 text-center">
              <a href="/pricing" data-magnetic className="btn btn-primary">See pricing and offers</a>
              <a href="/book-meeting" data-magnetic className="btn btn-ghost ml-3 text-ink">Book a meeting</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
