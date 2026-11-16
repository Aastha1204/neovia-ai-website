import Anthropic from "@anthropic-ai/sdk";
import { neoSystemPrompt } from "@/lib/neo-prompt";
import { NEO_TOOLS, runNeoTool } from "@/lib/neo-tools";
import { CONTACT, NEO } from "@/config/site";

export type NeoMsg = { role: "user" | "assistant"; content: string };

/** An error whose message is safe to show to the visitor. */
export class NeoError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const MAX_TOOL_ROUNDS = 6;
export const NEO_FALLBACK = `Sorry, I can't help with that here. Please WhatsApp Aastha directly on +${CONTACT.whatsapp} and she will reply.`;
const BUSY = "Neo is very busy right now. Please try again in a minute, or WhatsApp us.";
const DOWN = "Neo is not available right now. Please WhatsApp us.";

/** Which AI provider Neo uses. Set NEO_PROVIDER=openai or anthropic. If unset: OpenAI when OPENAI_API_KEY exists, otherwise Anthropic. */
export function neoProvider(): "openai" | "anthropic" {
  const p = (process.env.NEO_PROVIDER || "").toLowerCase();
  if (p === "openai" || p === "anthropic") return p;
  return process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY ? "openai" : "anthropic";
}

export async function runNeo(history: NeoMsg[], ctx: { conversationId: string }): Promise<string> {
  return neoProvider() === "openai" ? runOpenAI(history, ctx) : runAnthropic(history, ctx);
}

/* ------------------------------ OpenAI (GPT) ------------------------------ */

type OAIToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };
type OAIMessage =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: OAIToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

async function runOpenAI(history: NeoMsg[], ctx: { conversationId: string }): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error("[neo] OPENAI_API_KEY is not set, so Neo cannot reply. Add it to .env.local (and to your host's environment variables).");
    throw new NeoError(503, DOWN);
  }
  const tools = NEO_TOOLS.map((t) => ({ type: "function", function: { name: t.name, description: t.description, parameters: t.input_schema } }));
  const messages: OAIMessage[] = [{ role: "system", content: neoSystemPrompt() }, ...history.map((m) => ({ role: m.role, content: m.content }) as OAIMessage)];

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    let res: Response;
    try {
      res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: NEO.openaiModel, messages, tools, max_completion_tokens: 800 }),
      });
    } catch (e) {
      console.error("[neo] openai network error", (e as Error).message);
      throw new NeoError(503, DOWN);
    }
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[neo] openai error", res.status, detail.slice(0, 300));
      throw new NeoError(res.status === 429 ? 429 : 502, res.status === 429 ? BUSY : DOWN);
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string | null; tool_calls?: OAIToolCall[]; refusal?: string | null }; finish_reason?: string }[] };
    const choice = data.choices?.[0];
    const msg = choice?.message;
    if (!msg) throw new NeoError(502, DOWN);

    const calls = msg.tool_calls ?? [];
    if (calls.length) {
      messages.push({ role: "assistant", content: msg.content ?? null, tool_calls: calls });
      for (const call of calls) {
        let args: unknown = {};
        try {
          args = JSON.parse(call.function.arguments || "{}");
        } catch {}
        const out = await runNeoTool(call.function.name, args, ctx);
        messages.push({ role: "tool", tool_call_id: call.id, content: out.text });
      }
      continue;
    }
    if (msg.refusal) return NEO_FALLBACK;
    return (msg.content ?? "").trim() || NEO_FALLBACK;
  }
  return NEO_FALLBACK;
}

/* ----------------------------- Anthropic (Claude) ----------------------------- */

async function runAnthropic(history: NeoMsg[], ctx: { conversationId: string }): Promise<string> {
  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = history.map((m) => ({ role: m.role, content: m.content }));

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await client.beta.messages.create({
        model: NEO.model,
        max_tokens: 4000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default", // if a safety filter declines, the API retries on a fallback model
        cache_control: { type: "ephemeral" }, // the long system prompt is cached between messages
        output_config: { effort: "low" }, // short WhatsApp-style replies, so keep it fast
        system: neoSystemPrompt(),
        tools: NEO_TOOLS,
        messages,
      });

      if (response.stop_reason === "refusal") return NEO_FALLBACK;

      // Keep the full assistant turn (including thinking blocks) inside this tool loop.
      messages.push({ role: "assistant", content: response.content as Anthropic.Beta.BetaContentBlockParam[] });

      if (response.stop_reason === "tool_use") {
        const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
        for (const block of response.content) {
          if (block.type !== "tool_use") continue;
          const out = await runNeoTool(block.name, block.input, ctx);
          results.push({ type: "tool_result", tool_use_id: block.id, content: out.text, ...(out.isError ? { is_error: true } : {}) });
        }
        messages.push({ role: "user", content: results });
        continue;
      }

      const reply = response.content
        .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      return reply || NEO_FALLBACK;
    }
    return NEO_FALLBACK;
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) throw new NeoError(429, BUSY);
    if (err instanceof Anthropic.APIError) {
      console.error("[neo] API error", err.status, err.message);
      throw new NeoError(502, DOWN);
    }
    const msg = (err as Error).message;
    if (/authentication method/i.test(msg)) console.error("[neo] ANTHROPIC_API_KEY is not set, so Neo cannot reply. Add it to .env.local (and to your host's environment variables).");
    else console.error("[neo] error", msg);
    throw new NeoError(503, DOWN);
  }
}
