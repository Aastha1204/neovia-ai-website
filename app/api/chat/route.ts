import { NextResponse } from "next/server";
import { rateLimited } from "@/lib/rate-limit";
import { NeoError, runNeo } from "@/lib/neo-llm";

export const maxDuration = 60;

const MAX_HISTORY = 30; // messages kept per request
const MAX_CHARS = 1000; // per visitor message

type Msg = { role: "user" | "assistant"; content: string };

function readMessages(raw: unknown): Msg[] | null {
  if (!Array.isArray(raw)) return null;
  const msgs: Msg[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) continue;
    msgs.push({ role, content: content.trim().slice(0, MAX_CHARS) });
  }
  while (msgs.length && msgs[0].role !== "user") msgs.shift(); // must start with the visitor
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return null;
  return msgs;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(`neo:${ip}`, 25, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "You are sending messages very fast. Please wait a few minutes, or WhatsApp us." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const history = readMessages(body.messages);
  if (!history) return NextResponse.json({ error: "Please type a message." }, { status: 400 });
  const conversationId = typeof body.conversationId === "string" && /^[\w-]{8,64}$/.test(body.conversationId) ? body.conversationId : "unknown";

  try {
    const reply = await runNeo(history, { conversationId });
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof NeoError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("[neo] error", (err as Error).message);
    return NextResponse.json({ error: "Neo is not available right now. Please WhatsApp us." }, { status: 503 });
  }
}
