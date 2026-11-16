import type { Metadata } from "next";
import { MEETING, OWNER } from "@/config/site";
import Header from "@/components/Header";
import MeetingScheduler from "@/components/MeetingScheduler";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/fx/PageHero";
import Orbs from "@/components/fx/Orbs";

export const metadata: Metadata = {
  title: `Book a meeting | ${OWNER.brand}`,
  description: "Pick a day and time on the calendar to book a free call with Neovia AI to see a demo, discuss pricing or plan a custom project.",
  alternates: { canonical: "/book-meeting" },
};

export default function BookMeetingPage() {
  return (
    <>
      <Header />
      <main id="top">
        <PageHero eyebrow="Book a meeting" title="Talk to us: pick a time that suits you" text={`Free ${MEETING.durationMin}-minute call to see a demo, discuss pricing or plan a custom project. No pressure.`} />
        <section className="section relative overflow-hidden bg-mist">
          <Orbs variant="b" />
          <div className="wrap relative">
            <div data-reveal="up">
              <MeetingScheduler />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
