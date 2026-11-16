import { MEETING } from "@/config/site";

/** "YYYY-MM-DD" for the current day in India (the meeting time zone). */
export function istToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: MEETING.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Minutes since midnight in India right now. */
export function istMinutesNow(now = new Date()) {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: MEETING.timezone, hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const h = Number(p.find((x) => x.type === "hour")?.value ?? 0) % 24;
  const m = Number(p.find((x) => x.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const pad = (n: number) => String(n).padStart(2, "0");
export const fromMin = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

/** All possible start times in a day, e.g. ["10:00", "10:30", ...]. */
export function allSlots() {
  const out: string[] = [];
  for (let m = toMin(MEETING.start); m + MEETING.durationMin <= toMin(MEETING.end); m += MEETING.durationMin) out.push(fromMin(m));
  return out;
}

export function addDays(dateStr: string, days: number) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function weekday(dateStr: string) {
  return new Date(`${dateStr}T00:00:00Z`).getUTCDay(); // 0 = Sunday
}

/** Is this day open for bookings (right weekday, not in the past, inside the booking window)? */
export function isBookableDay(dateStr: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const today = istToday(now);
  if (dateStr < today || dateStr > addDays(today, MEETING.advanceDays)) return false;
  return (MEETING.weekdays as readonly number[]).includes(weekday(dateStr));
}

/** Slots still open on a day, hiding times that are too soon (today) and ones already booked. */
export function openSlots(dateStr: string, booked: string[] = [], now = new Date()) {
  if (!isBookableDay(dateStr, now)) return [];
  const isToday = dateStr === istToday(now);
  const earliest = istMinutesNow(now) + MEETING.leadMinutes;
  return allSlots().filter((t) => !booked.includes(t) && (!isToday || toMin(t) >= earliest));
}

/** 12-hour label, e.g. "2:30 PM". */
export function label12(t: string) {
  const m = toMin(t);
  const h = Math.floor(m / 60);
  return `${h % 12 || 12}:${pad(m % 60)} ${h >= 12 ? "PM" : "AM"}`;
}

/** "Add to Google Calendar" link for a booked slot (India time). */
export function calendarUrl(date: string, time: string, topic: string) {
  const day = date.replace(/-/g, "");
  const startMin = toMin(time);
  const start = `${day}T${time.replace(":", "")}00`;
  const end = `${day}T${fromMin(startMin + MEETING.durationMin).replace(":", "")}00`;
  const p = new URLSearchParams({ action: "TEMPLATE", text: "Meeting with Neovia AI", dates: `${start}/${end}`, ctz: MEETING.timezone, details: `Topic: ${topic}` });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
