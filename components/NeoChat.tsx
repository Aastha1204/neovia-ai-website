"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, NEO, waLink } from "@/config/site";

type Msg = { role: "user" | "assistant"; content: string };

const KEY = "neo-chat-v1";
const GREETING = `Hi! I'm ${NEO.name}, Neovia AI's assistant. Tell me about your business and I'll help you pick the right service. Ask me anything about plans and prices.`;
const CHIPS = ["Which plan is right for me?", "What are your prices?", "I need help with my service"];

function newId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
}

export default function NeoChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [convId, setConvId] = useState("");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Restore this tab's conversation (kept only for the current browser session).
  useEffect(() => {
    let id = "";
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (saved && Array.isArray(saved.msgs)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage only exists in the browser, so it is read after mount
        setMsgs(saved.msgs);
        id = saved.id || "";
      }
    } catch {}
    setConvId(id || newId());
  }, []);

  useEffect(() => {
    if (!convId) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ id: convId, msgs }));
    } catch {}
  }, [msgs, convId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [msgs, busy, open]);

  async function send(text: string) {
    const content = text.trim().slice(0, 1000);
    if (!content || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, conversationId: convId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please WhatsApp us instead.");
      setMsgs([...next, { role: "assistant", content: String(data.reply || "") }]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white shadow-xl hover:bg-ink-soft"
        aria-label={`Chat with ${NEO.name}`}
      >
        <span aria-hidden="true">💬</span> Chat with {NEO.name}
      </button>
    );
  }

  return (
    <section
      aria-label={`Chat with ${NEO.name}`}
      className="fixed bottom-4 left-4 right-4 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-2xl sm:right-auto sm:w-[380px]"
    >
      <header className="flex items-center justify-between bg-ink px-4 py-3 text-white">
        <div>
          <p className="font-extrabold">{NEO.name} · Neovia AI</p>
          <p className="text-xs text-white/70">AI assistant. It can make mistakes.</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="rounded-full px-3 py-1 text-xl leading-none hover:bg-white/10" aria-label="Close chat">×</button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-ink/5 px-3 py-2 text-sm">{GREETING}</div>
        {msgs.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <button key={c} type="button" onClick={() => send(c)} className="rounded-full border border-ink/20 bg-white px-3 py-1.5 text-xs font-bold hover:border-ink">{c}</button>
            ))}
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "ml-auto rounded-br-sm bg-ink text-white" : "rounded-bl-sm bg-ink/5"}`}>
            {m.content}
          </div>
        ))}
        {busy && <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ink/5 px-3 py-2 text-sm text-ink/60" aria-label={`${NEO.name} is typing`}>…</div>}
        {error && (
          <p role="alert" className="text-sm font-bold text-red-700">
            {error}{" "}
            <a className="underline" href={waLink("Hi Neovia AI, I need some help.")} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-ink/10 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
            placeholder="Type your message…"
            aria-label="Your message"
            className="min-w-0 flex-1 rounded-xl border border-ink/20 px-3 py-2 text-sm"
          />
          <button type="submit" disabled={busy || !input.trim()} className="btn btn-primary px-4 py-2 text-sm disabled:opacity-50">Send</button>
        </div>
        <p className="mt-2 text-[11px] text-ink/60">Please don’t share passwords, OTPs or card numbers. Prefer a person? <a className="font-bold underline" href={`tel:${CONTACT.phone}`}>Call</a> or <a className="font-bold underline" href="/book-meeting">book a meeting</a>.</p>
      </form>
    </section>
  );
}
