import { createClient } from "@supabase/supabase-js";
import { ownerEmail, sendEmail } from "@/lib/email";
import { alertEmail, leadEmail } from "@/lib/email-templates";
import { CONTACT } from "@/config/site";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

/** Tool definitions Claude sees. Plain JSON schema; every input is re-validated below before it is used. */
export const NEO_TOOLS = [
  {
    name: "save_lead",
    description:
      "Save a new lead's details so Aastha can follow up. Call it once you have at least the name, WhatsApp number and whether they agreed to be contacted. Pass an empty string for details the visitor did not give.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Visitor's name" },
        business_name: { type: "string" },
        business_type: { type: "string", description: "e.g. dental clinic, coaching institute" },
        city: { type: "string" },
        whatsapp: { type: "string", description: "WhatsApp number with country code if given" },
        service: { type: "string", description: "Service they are interested in, e.g. ShowUp" },
        plan: { type: "string", description: "Basic, Advance or Pro, or a Growth Plan name" },
        budget: { type: "string" },
        start_when: { type: "string", description: "When they want to start" },
        consent: { type: "boolean", description: "True only if they said Aastha may contact them on this WhatsApp number" },
      },
      required: ["name", "whatsapp", "consent"],
    },
  },
  {
    name: "notify_owner",
    description:
      "Alert Aastha on WhatsApp that a human is needed. Use it for urgent problems, hot leads, custom quotes, questions you cannot answer and requests to talk to a person. Call once per issue.",
    input_schema: {
      type: "object" as const,
      properties: {
        priority: { type: "string", enum: ["urgent", "high", "normal"] },
        type: { type: "string", enum: ["hot_lead", "support_issue", "question", "custom_quote", "demo_request", "human_requested", "complaint", "other"] },
        summary: { type: "string", description: "Who, which business, which service, what happened, what they want and how urgent. Clear enough to act on without reading the chat." },
        customer_name: { type: "string" },
        customer_whatsapp: { type: "string" },
      },
      required: ["priority", "type", "summary"],
    },
  },
];

const PRIORITIES = ["urgent", "high", "normal"];
const TYPES = ["hot_lead", "support_issue", "question", "custom_quote", "demo_request", "human_requested", "complaint", "other"];

/** Sends a WhatsApp text to the owner through the Meta WhatsApp Cloud API, if it is set up. */
async function whatsappOwner(text: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.OWNER_WHATSAPP || CONTACT.whatsapp;
  if (!token || !phoneId || !to) return false;
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: text.slice(0, 3800) } }),
    });
    if (!res.ok) console.error("[neo] whatsapp alert failed", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[neo] whatsapp alert error", (e as Error).message);
    return false;
  }
}

export async function runNeoTool(name: string, input: unknown, ctx: { conversationId: string }): Promise<{ text: string; isError?: boolean }> {
  const i = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;

  if (name === "save_lead") {
    const lead = {
      conversation_id: ctx.conversationId,
      name: clean(i.name, 80),
      business_name: clean(i.business_name, 120),
      business_type: clean(i.business_type, 80),
      city: clean(i.city, 60),
      whatsapp: clean(i.whatsapp, 25),
      service: clean(i.service, 80),
      plan: clean(i.plan, 60),
      budget: clean(i.budget, 80),
      start_when: clean(i.start_when, 80),
      consent: i.consent === true,
    };
    if (lead.name.length < 2) return { text: "Not saved: the name is missing. Ask for it.", isError: true };
    if (!/^[+\d][\d\s-]{6,18}$/.test(lead.whatsapp)) return { text: "Not saved: the WhatsApp number looks invalid. Ask for it again.", isError: true };

    const supabase = db();
    if (supabase) {
      const { error } = await supabase.from("chat_leads").insert(lead);
      if (error) {
        console.error("[neo] save_lead error:", error.message);
        return { text: "Could not save the lead right now. Tell the visitor Aastha will still be told, and call notify_owner.", isError: true };
      }
    } else {
      console.warn("[neo] Supabase env not set; lead not stored:", { ...lead, whatsapp: "***" });
    }
    const mail = leadEmail(lead);
    const mailed = await sendEmail(ownerEmail(), mail.subject, mail.html);
    if (!supabase && !mailed && process.env.NODE_ENV === "production") {
      return { text: "The lead could not be recorded right now. Do not promise a follow-up. Ask the visitor to WhatsApp Aastha directly.", isError: true };
    }
    return { text: lead.consent ? "Lead saved. Aastha may contact them." : "Lead saved WITHOUT consent. Aastha must not contact them unless they agree." };
  }

  if (name === "notify_owner") {
    const priority = PRIORITIES.includes(String(i.priority)) ? String(i.priority) : "normal";
    const type = TYPES.includes(String(i.type)) ? String(i.type) : "other";
    const summary = clean(i.summary, 1200);
    if (summary.length < 10) return { text: "Not sent: the summary is too short. Write who, which business, which service, what happened and what they want.", isError: true };
    const alert = {
      conversation_id: ctx.conversationId,
      priority,
      type,
      summary,
      customer_name: clean(i.customer_name, 80),
      customer_whatsapp: clean(i.customer_whatsapp, 25),
    };

    const supabase = db();
    if (supabase) {
      const { error } = await supabase.from("owner_alerts").insert(alert);
      if (error) console.error("[neo] notify_owner save error:", error.message);
    }
    const tag = priority === "urgent" ? "🚨 URGENT" : priority === "high" ? "🔥 HIGH" : "ℹ️ Note";
    const text = `${tag} · ${type.replace(/_/g, " ")}\n${summary}${alert.customer_name ? `\nName: ${alert.customer_name}` : ""}${alert.customer_whatsapp ? `\nWhatsApp: ${alert.customer_whatsapp}` : ""}\n(Neo chat ${ctx.conversationId.slice(0, 8)})`;
    const sentWa = await whatsappOwner(text);
    const mail = alertEmail({ priority, type, summary, customer_name: alert.customer_name, customer_whatsapp: alert.customer_whatsapp, conversation_id: ctx.conversationId });
    const sentMail = await sendEmail(ownerEmail(), mail.subject, mail.html);
    if (!sentWa && !sentMail && !supabase) {
      console.warn("[neo] owner alert had nowhere to go (set WHATSAPP_*, RESEND_API_KEY or Supabase):", text);
      if (process.env.NODE_ENV === "production") {
        return { text: "The alert could not be delivered right now. Do not say Aastha has been informed. Ask the customer to WhatsApp or call Aastha directly.", isError: true };
      }
    }
    return { text: "Aastha has been alerted. Tell the customer she has been informed; do not say she is on the line." };
  }

  return { text: `Unknown tool: ${name}`, isError: true };
}
