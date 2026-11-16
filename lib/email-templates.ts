import { CONTACT, OWNER } from "@/config/site";

/**
 * HTML emails for the owner and for visitors. Gmail and Outlook ignore most <style> blocks,
 * so everything is a table with inline styles. All text is escaped before it goes in.
 */

const INK = "#1F2340";
const TEAL = "#0F766E";
const SAFFRON = "#F2A33A";
const WA_GREEN = "#15803d";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

type Row = [label: string, value: string];
type Button = { label: string; href: string; color?: string; outline?: boolean };
type Badge = { text: string; bg: string; fg?: string };

type Layout = {
  preheader?: string;
  badge?: Badge;
  title: string;
  intro?: string;
  highlight?: string; // one big line, e.g. the meeting time
  rows?: Row[];
  quote?: { label: string; text: string }; // longer free text, e.g. an alert summary
  buttons?: Button[];
  note?: string;
};

function layout(o: Layout) {
  const rows = (o.rows ?? []).filter(([, v]) => v && v.trim());
  const rowsHtml = rows
    .map(
      ([k, v], i) => `<tr>
        <td style="padding:11px 16px;width:38%;font-size:13px;color:#667085;vertical-align:top;${i ? "border-top:1px solid #eef0f4;" : ""}">${esc(k)}</td>
        <td style="padding:11px 16px;font-size:15px;color:${INK};font-weight:600;vertical-align:top;${i ? "border-top:1px solid #eef0f4;" : ""}">${esc(v)}</td>
      </tr>`,
    )
    .join("");
  const buttons = (o.buttons ?? [])
    .map(
      (b) =>
        `<a href="${esc(b.href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:10px;font-size:15px;font-weight:700;text-decoration:none;${
          b.outline ? `border:2px solid ${INK};color:${INK};background:#ffffff;` : `background:${b.color ?? INK};color:#ffffff;border:2px solid ${b.color ?? INK};`
        }">${esc(b.label)}</a>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f5f8;">
${o.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(o.preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f8;padding:24px 12px;font-family:${FONT};">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e7ec;">
    <tr><td style="background:${INK};padding:18px 24px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="width:34px;height:34px;background:${SAFFRON};border-radius:9px;text-align:center;font-size:18px;font-weight:800;color:${INK};line-height:34px;">N</td>
        <td style="padding-left:12px;font-size:18px;font-weight:800;color:#ffffff;letter-spacing:-0.2px;">${esc(OWNER.brand)}</td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:28px 24px 8px 24px;">
      ${o.badge ? `<span style="display:inline-block;background:${o.badge.bg};color:${o.badge.fg ?? "#ffffff"};font-size:12px;font-weight:800;letter-spacing:0.6px;text-transform:uppercase;padding:5px 11px;border-radius:999px;">${esc(o.badge.text)}</span>` : ""}
      <h1 style="margin:${o.badge ? "12px" : "0"} 0 0 0;font-size:24px;line-height:1.25;color:${INK};letter-spacing:-0.3px;">${esc(o.title)}</h1>
      ${o.intro ? `<p style="margin:10px 0 0 0;font-size:15px;line-height:1.55;color:#475467;">${esc(o.intro)}</p>` : ""}
    </td></tr>
    ${
      o.highlight
        ? `<tr><td style="padding:16px 24px 0 24px;"><div style="background:#fff7e8;border:1px solid #f6d9a6;border-radius:12px;padding:16px 18px;font-size:18px;font-weight:800;color:${INK};">${esc(o.highlight)}</div></td></tr>`
        : ""
    }
    ${
      o.quote
        ? `<tr><td style="padding:16px 24px 0 24px;"><div style="font-size:12px;font-weight:800;letter-spacing:0.6px;text-transform:uppercase;color:#667085;margin-bottom:6px;">${esc(o.quote.label)}</div><div style="background:#f8fafc;border-left:4px solid ${TEAL};border-radius:6px;padding:14px 16px;font-size:15px;line-height:1.6;color:${INK};white-space:pre-wrap;">${esc(o.quote.text)}</div></td></tr>`
        : ""
    }
    ${
      rowsHtml
        ? `<tr><td style="padding:16px 24px 0 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4e7ec;border-radius:12px;border-collapse:separate;overflow:hidden;">${rowsHtml}</table></td></tr>`
        : ""
    }
    ${buttons ? `<tr><td style="padding:20px 24px 0 24px;">${buttons}</td></tr>` : ""}
    ${o.note ? `<tr><td style="padding:8px 24px 0 24px;font-size:13px;line-height:1.5;color:#667085;">${esc(o.note)}</td></tr>` : ""}
    <tr><td style="padding:24px;">
      <div style="border-top:1px solid #eef0f4;padding-top:14px;font-size:12px;line-height:1.5;color:#98a2b3;">
        ${esc(OWNER.brand)} · ${esc(OWNER.city)} · <a href="${esc(OWNER.siteUrl)}" style="color:#98a2b3;">${esc(OWNER.siteUrl.replace(/^https?:\/\//, ""))}</a>
      </div>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

/* ------------------------------ helpers ------------------------------ */

/** WhatsApp number as digits with country code (assumes India for a 10-digit number). */
export function waDigits(raw: string) {
  const d = raw.replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
}
const waTo = (phone: string, text: string) => `https://wa.me/${waDigits(phone)}?text=${encodeURIComponent(text)}`;
const wa = (phone: string, text: string): Button => ({ label: "Reply on WhatsApp", href: waTo(phone, text), color: WA_GREEN });
const call = (phone: string): Button => ({ label: `Call ${phone}`, href: `tel:+${waDigits(phone)}`, outline: true });

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export function prettyDay(date: string) {
  const d = new Date(`${date}T00:00:00Z`);
  return `${DOW[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const PRIORITY: Record<string, Badge> = {
  urgent: { text: "🚨 Urgent", bg: "#b91c1c" },
  high: { text: "🔥 High priority", bg: "#c2410c" },
  normal: { text: "Note", bg: "#475467" },
};
const TYPE_LABEL: Record<string, string> = {
  hot_lead: "Hot lead",
  support_issue: "Support issue",
  question: "Question Neo could not answer",
  custom_quote: "Custom quote or discount request",
  demo_request: "Demo request",
  human_requested: "Customer asked for a person",
  complaint: "Complaint",
  other: "Needs your attention",
};

/* ------------------------------ emails ------------------------------ */

export type LeadData = {
  name: string; business_name: string; business_type: string; city: string; whatsapp: string;
  service: string; plan: string; budget: string; start_when: string; consent: boolean;
};

export function leadEmail(l: LeadData) {
  const what = [l.service, l.plan].filter(Boolean).join(" · ");
  return {
    subject: `New lead: ${l.name}${l.service ? `, ${l.service}` : ""}`,
    html: layout({
      preheader: `${l.name}${l.business_name ? ` (${l.business_name})` : ""} wants ${what || "to talk"}`,
      badge: l.consent ? { text: "OK to contact on WhatsApp", bg: "#15803d" } : { text: "Do NOT contact: no consent", bg: "#b91c1c" },
      title: `New lead: ${l.name}`,
      intro: `Someone chatted with Neo on the ${OWNER.brand} website and shared their details.`,
      rows: [
        ["Name", l.name],
        ["Business", l.business_name],
        ["Type", l.business_type],
        ["City", l.city],
        ["WhatsApp", l.whatsapp],
        ["Interested in", what],
        ["Budget", l.budget],
        ["Wants to start", l.start_when],
        ["Consent to contact", l.consent ? "Yes" : "No"],
      ],
      buttons: l.consent && l.whatsapp ? [wa(l.whatsapp, `Hi ${l.name}, this is Aastha from ${OWNER.brand}. Thanks for your interest${l.service ? ` in ${l.service}` : ""}!`), call(l.whatsapp)] : [],
    }),
  };
}

export type AlertData = { priority: string; type: string; summary: string; customer_name: string; customer_whatsapp: string; conversation_id: string };

export function alertEmail(a: AlertData) {
  const type = TYPE_LABEL[a.type] ?? TYPE_LABEL.other;
  const badge = PRIORITY[a.priority] ?? PRIORITY.normal;
  return {
    subject: `${badge.text.replace(/^[^\w]+/, "").trim()}: ${type}${a.customer_name ? `, ${a.customer_name}` : ""}`,
    html: layout({
      preheader: a.summary.slice(0, 110),
      badge,
      title: type,
      intro: "Neo needs a human for this one.",
      quote: { label: "What happened", text: a.summary },
      rows: [
        ["Customer", a.customer_name],
        ["WhatsApp", a.customer_whatsapp],
        ["Chat reference", a.conversation_id.slice(0, 8)],
      ],
      buttons: a.customer_whatsapp ? [wa(a.customer_whatsapp, `Hi${a.customer_name ? ` ${a.customer_name}` : ""}, this is Aastha from ${OWNER.brand}.`), call(a.customer_whatsapp)] : [],
    }),
  };
}

export type MeetingData = { date: string; time12: string; name: string; phone: string; email: string; topic: string; mode: string; notes: string; calendarUrl: string };

export function meetingOwnerEmail(m: MeetingData) {
  const when = `${prettyDay(m.date)} · ${m.time12} IST`;
  return {
    subject: `New meeting: ${m.name}, ${prettyDay(m.date)} ${m.time12}`,
    html: layout({
      preheader: `${m.name} booked ${when} for ${m.topic}`,
      badge: { text: "New meeting booked", bg: TEAL },
      title: m.name,
      highlight: `📅 ${when}`,
      rows: [
        ["Topic", m.topic],
        ["How to meet", m.mode],
        ["Phone / WhatsApp", m.phone],
        ["Email", m.email],
        ["Notes", m.notes],
      ],
      buttons: [wa(m.phone, `Hi ${m.name}, this is Aastha from ${OWNER.brand}. Your meeting is booked for ${when}. I'll share the ${m.mode.toLowerCase()} details here.`), { label: "Add to Google Calendar", href: m.calendarUrl, outline: true }],
    }),
  };
}

export function meetingVisitorEmail(m: MeetingData) {
  const when = `${prettyDay(m.date)} · ${m.time12} IST`;
  return {
    subject: `Your meeting with ${OWNER.brand}: ${prettyDay(m.date)}, ${m.time12}`,
    html: layout({
      preheader: `Booked: ${when}`,
      badge: { text: "Booked", bg: TEAL },
      title: `You're booked, ${m.name.split(" ")[0]}!`,
      intro: "Thanks for booking a call. Here are your details.",
      highlight: `📅 ${when}`,
      rows: [
        ["Topic", m.topic],
        ["How we'll meet", m.mode],
        ["Your number", m.phone],
      ],
      buttons: [{ label: "Add to Google Calendar", href: m.calendarUrl, color: INK }, { label: "Message us on WhatsApp", href: `https://wa.me/${CONTACT.whatsapp}`, color: WA_GREEN }],
      note: "I'll confirm the call link or number on WhatsApp. If you need to change the time, just message me.",
    }),
  };
}
