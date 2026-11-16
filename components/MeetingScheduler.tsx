"use client";

import { useEffect, useMemo, useState } from "react";
import { CONTACT, MEETING, waLink } from "@/config/site";
import { addDays, istToday, isBookableDay, label12, openSlots, weekday } from "@/lib/meeting";
import { WhatsAppIcon } from "./Icons";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type State = "idle" | "sending" | "done" | "error";

function prettyDate(d: string) {
  const dt = new Date(`${d}T00:00:00Z`);
  return `${DOW[dt.getUTCDay()]}, ${dt.getUTCDate()} ${MONTHS[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
}

/** "Add to Google Calendar" link for a confirmed slot (India time). */
function calendarLink(date: string, time: string, topic: string) {
  const start = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
  const [h, m] = time.split(":").map(Number);
  const endMin = h * 60 + m + MEETING.durationMin;
  const end = `${date.replace(/-/g, "")}T${String(Math.floor(endMin / 60)).padStart(2, "0")}${String(endMin % 60).padStart(2, "0")}00`;
  const p = new URLSearchParams({ action: "TEMPLATE", text: "Meeting with Neovia AI", dates: `${start}/${end}`, ctz: MEETING.timezone, details: `Topic: ${topic}` });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export default function MeetingScheduler() {
  const [today, setToday] = useState<string | null>(null);
  const [month, setMonth] = useState<{ y: number; m: number } | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>([]);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ date: string; time: string; topic: string } | null>(null);

  // Work out "today" in India only in the browser, so server and browser HTML always match.
  useEffect(() => {
    const t = istToday();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- today in India is computed in the browser so server and browser HTML match
    setToday(t);
    setMonth({ y: Number(t.slice(0, 4)), m: Number(t.slice(5, 7)) - 1 });
  }, []);

  // Which times are already taken on the chosen day.
  useEffect(() => {
    if (!date) return;
    let off = false;
    fetch(`/api/meeting?date=${date}`)
      .then((r) => r.json())
      .then((d) => { if (!off) setBooked(Array.isArray(d.booked) ? d.booked : []); })
      .catch(() => { if (!off) setBooked([]); });
    return () => { off = true; };
  }, [date]);

  const cells = useMemo(() => {
    if (!month) return [];
    const first = `${month.y}-${String(month.m + 1).padStart(2, "0")}-01`;
    const lead = weekday(first);
    const days = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();
    const out: (string | null)[] = Array(lead).fill(null);
    for (let d = 1; d <= days; d++) out.push(`${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    return out;
  }, [month]);

  const slots = date ? openSlots(date, booked) : [];
  const lastMonthAllowed = today ? addDays(today, MEETING.advanceDays).slice(0, 7) : "";
  const thisMonth = today ? today.slice(0, 7) : "";
  const viewing = month ? `${month.y}-${String(month.m + 1).padStart(2, "0")}` : "";

  function shift(delta: number) {
    if (!month) return;
    const d = new Date(Date.UTC(month.y, month.m + delta, 1));
    setMonth({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date || !time) return;
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), date, time }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409) setTime(null);
        throw new Error(data.error || "Something went wrong. Please WhatsApp me instead.");
      }
      setDone({ date, time, topic: String(fd.get("topic") || "") });
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("error");
      if (date) fetch(`/api/meeting?date=${date}`).then((r) => r.json()).then((d) => setBooked(d.booked ?? [])).catch(() => {});
    }
  }

  if (state === "done" && done) {
    return (
      <div className="card p-8 text-center" role="status">
        <p className="text-2xl font-extrabold">You’re booked!</p>
        <p className="mt-2 text-lg font-bold text-teal-dark">{prettyDate(done.date)} at {label12(done.time)} (India time)</p>
        <p className="mt-3 text-ink/80">I’ll confirm the call link or number on WhatsApp. If you need to change the time, just message me.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={calendarLink(done.date, done.time, done.topic)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Add to Google Calendar</a>
          <a href={waLink(`Hi Neovia AI, I booked a meeting for ${prettyDate(done.date)} at ${label12(done.time)}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><WhatsAppIcon /> Confirm on WhatsApp</a>
        </div>
      </div>
    );
  }

  const field = "mt-1 w-full rounded-xl border border-ink/20 bg-white px-4 py-3";
  const hours = `${label12(MEETING.start)} to ${label12(MEETING.end)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="card p-5 sm:p-6">
        <p className="text-sm font-extrabold uppercase tracking-wide text-teal-dark">1. Pick a day</p>
        <div className="mt-3 flex items-center justify-between">
          <button type="button" onClick={() => shift(-1)} disabled={!month || viewing <= thisMonth} className="btn btn-ghost px-3 py-1 text-ink disabled:opacity-30" aria-label="Previous month">←</button>
          <p className="text-lg font-extrabold">{month ? `${MONTHS[month.m]} ${month.y}` : "Loading…"}</p>
          <button type="button" onClick={() => shift(1)} disabled={!month || viewing >= lastMonthAllowed} className="btn btn-ghost px-3 py-1 text-ink disabled:opacity-30" aria-label="Next month">→</button>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-bold text-ink/60">
          {DOW.map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">
          {cells.map((c, i) => {
            if (!c) return <div key={`b${i}`} />;
            const ok = isBookableDay(c);
            const sel = c === date;
            return (
              <button
                key={c}
                type="button"
                disabled={!ok}
                onClick={() => { setDate(c); setTime(null); setBooked([]); }}
                aria-pressed={sel}
                className={`aspect-square rounded-xl text-sm font-bold ${sel ? "bg-ink text-white" : ok ? "bg-teal/20 text-ink hover:bg-teal/40" : "text-ink/25"} ${c === today ? "ring-2 ring-saffron" : ""}`}
              >
                {Number(c.slice(8))}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink/70">Open {hours}, Monday to Saturday. All times are India time (IST). {MEETING.durationMin}-minute call.</p>

        <p className="mt-6 text-sm font-extrabold uppercase tracking-wide text-teal-dark">2. Pick a time</p>
        {!date ? (
          <p className="mt-2 text-sm text-ink/70">Choose a day first.</p>
        ) : slots.length === 0 ? (
          <p className="mt-2 text-sm text-ink/70">No free times on this day. Please pick another day.</p>
        ) : (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slots.map((t) => (
              <button key={t} type="button" onClick={() => setTime(t)} aria-pressed={time === t} className={`rounded-xl border px-2 py-2 text-sm font-bold ${time === t ? "border-ink bg-ink text-white" : "border-ink/20 bg-white hover:border-ink"}`}>
                {label12(t)}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="card space-y-4 p-5 sm:p-6">
        <p className="text-sm font-extrabold uppercase tracking-wide text-teal-dark">3. Your details</p>
        {date && time ? (
          <p className="rounded-xl bg-saffron/20 p-3 text-sm font-bold">{prettyDate(date)} at {label12(time)} (IST)</p>
        ) : (
          <p className="rounded-xl bg-ink/5 p-3 text-sm text-ink/70">Pick a day and time on the left to continue.</p>
        )}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label className="block text-sm font-bold">Your name
          <input name="name" required maxLength={80} autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-bold">Phone / WhatsApp number
          <input name="phone" required type="tel" inputMode="tel" maxLength={20} autoComplete="tel" className={field} />
        </label>
        <label className="block text-sm font-bold">Email <span className="font-normal text-ink/60">(optional, for a confirmation email)</span>
          <input name="email" type="email" maxLength={120} autoComplete="email" className={field} />
        </label>
        <label className="block text-sm font-bold">What do you want to discuss?
          <select name="topic" required defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {MEETING.topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold">How should we meet?
          <select name="mode" required defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {MEETING.modes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold">Anything I should know? <span className="font-normal text-ink/60">(optional)</span>
          <textarea name="notes" maxLength={800} rows={3} className={field} />
        </label>
        {state === "error" && <p role="alert" className="text-sm font-bold text-red-700">{error}</p>}
        <button type="submit" disabled={!date || !time || state === "sending"} className="btn btn-primary w-full disabled:opacity-50">
          {state === "sending" ? "Booking…" : "Book this meeting"}
        </button>
        <p className="text-xs text-ink/70">Prefer to chat? <a className="font-bold underline" href={`tel:${CONTACT.phone}`}>Call</a> or <a className="font-bold underline" href={waLink("Hi Neovia AI, I'd like to talk.")} target="_blank" rel="noopener noreferrer">WhatsApp me</a>.</p>
      </form>
    </div>
  );
}
