import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { rateLimited } from "@/lib/rate-limit";
import { ownerEmail, sendEmail } from "@/lib/email";
import { openSlots, isBookableDay, label12, calendarUrl } from "@/lib/meeting";
import { meetingOwnerEmail, meetingVisitorEmail } from "@/lib/email-templates";
import { MEETING } from "@/config/site";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

/** GET /api/meeting?date=YYYY-MM-DD -> { booked: ["10:00", ...] } so the calendar can grey out taken times. */
export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date") ?? "";
  if (!isBookableDay(date)) return NextResponse.json({ booked: [] });
  const supabase = db();
  if (!supabase) return NextResponse.json({ booked: [] });
  const { data } = await supabase.from("meetings").select("time").eq("date", date).neq("status", "cancelled");
  return NextResponse.json({ booked: (data ?? []).map((r: { time: string }) => r.time) });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(`meet:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please WhatsApp me instead." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const date = clean(body.date, 10);
  const time = clean(body.time, 5);
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 120);
  const topic = clean(body.topic, 60);
  const mode = clean(body.mode, 60);
  const notes = clean(body.notes, 800);

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[+\d][\d\s-]{6,18}$/.test(phone)) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email or leave it empty." }, { status: 400 });
  if (!MEETING.topics.includes(topic)) return NextResponse.json({ error: "Please choose what you want to discuss." }, { status: 400 });
  if (!MEETING.modes.includes(mode)) return NextResponse.json({ error: "Please choose how you want to meet." }, { status: 400 });

  const supabase = db();
  let booked: string[] = [];
  if (supabase) {
    const { data } = await supabase.from("meetings").select("time").eq("date", date).neq("status", "cancelled");
    booked = (data ?? []).map((r: { time: string }) => r.time);
  }
  if (!openSlots(date, booked).includes(time)) {
    return NextResponse.json({ error: "That time is no longer available. Please pick another slot." }, { status: 409 });
  }

  if (supabase) {
    const { error } = await supabase.from("meetings").insert({ date, time, name, phone, email: email || null, topic, mode, notes: notes || null });
    if (error) {
      if (error.code === "23505") return NextResponse.json({ error: "Someone just booked that time. Please pick another slot." }, { status: 409 });
      console.error("[meeting] supabase error:", error.message);
      return NextResponse.json({ error: "Could not save your booking. Please WhatsApp me." }, { status: 500 });
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.warn("[meeting] Supabase env not set; dev mode, not saving:", { date, time, name, phone, topic, mode });
  } else {
    return NextResponse.json({ error: "Booking is not available right now. Please WhatsApp me." }, { status: 503 });
  }

  // Tell the owner (and the visitor, if they gave an email). Does nothing if RESEND_API_KEY is not set.
  const data = { date, time12: label12(time), name, phone, email, topic, mode, notes, calendarUrl: calendarUrl(date, time, topic) };
  const toOwner = meetingOwnerEmail(data);
  await sendEmail(ownerEmail(), toOwner.subject, toOwner.html);
  if (email) {
    const toVisitor = meetingVisitorEmail(data);
    await sendEmail(email, toVisitor.subject, toVisitor.html);
  }

  return NextResponse.json({ ok: true });
}
