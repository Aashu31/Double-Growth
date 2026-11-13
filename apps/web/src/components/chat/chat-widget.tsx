"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Loader2,
  MessageCircle,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { postJson, ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hello — I'm the Double Growth assistant. You can ask about our services, the annual package, or how to start a project. If I can't help, I'll point you to the team.",
};

const suggestedQuestions = [
  "What services do you offer?",
  "Explain your annual package.",
  "How can I get a website?",
  "Can you develop an online store?",
  "How can I contact your team?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (confirmReset) setConfirmReset(false);
      else setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, confirmReset]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  async function sendMessage(raw: string) {
    const message = raw.trim();
    if (!message || sending) return;

    const history = messages
      .filter((item) => item !== welcomeMessage)
      .slice(-12);

    setMessages((current) => [...current, { role: "user", content: message }]);
    setInput("");
    setSending(true);

    try {
      const response = await postJson<{ data: { reply: string } }>(
        "/api/v1/chat",
        { message, history },
      );
      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.data.reply },
      ]);
    } catch (error) {
      const unavailable =
        (error instanceof ApiError &&
          (error.code === "AI_NOT_CONFIGURED" || error.status === 503)) ||
        (error instanceof Error && error.message.includes("AI_NOT_CONFIGURED"));

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: unavailable
            ? "The assistant is not available on this environment yet. No AI provider is configured, so I cannot answer automatically. Please use the contact page to reach the team directly."
            : "I couldn't reach the assistant service just now. Please try again, or use the contact page to reach the team.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function resetConversation() {
    setMessages([welcomeMessage]);
    setInput("");
    setConfirmReset(false);
    setToast("Conversation cleared.");
    inputRef.current?.focus();
  }

  return (
    <div className="fixed bottom-3 right-3 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {toast ? (
        <div
          role="status"
          className="rounded-full bg-navy px-4 py-2 text-xs font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      ) : null}
      {open ? (
        <section
          aria-label="Double Growth assistant"
          className="flex h-[min(32rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-cloud bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between gap-3 bg-navy px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Bot aria-hidden="true" className="h-4 w-4 text-cyan" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Double Growth Assistant
                </p>
                <p className="text-[0.68rem] text-white/50">
                  Answers from approved information
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                disabled={sending}
                aria-label="Start a new conversation"
                title="Start a new conversation"
                className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-mist/60 px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.82rem] leading-6",
                  message.role === "assistant"
                    ? "bg-white text-ink shadow-sm"
                    : "ml-auto bg-electric text-white",
                )}
              >
                {message.content}
              </div>
            ))}

            {sending ? (
              <div className="flex w-16 items-center justify-center gap-1 rounded-2xl bg-white px-3 py-3 shadow-sm">
                <span className="sr-only">Assistant is typing</span>
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-electric/60"
                    style={{ animationDelay: `${dot * 120}ms` }}
                  />
                ))}
              </div>
            ) : null}

            {messages.length === 1 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendMessage(question)}
                    className="rounded-full border border-cloud bg-white px-3 py-1.5 text-left text-[0.72rem] font-medium text-slate transition-colors hover:border-electric/40 hover:text-ink"
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form
            className="flex items-center gap-2 border-t border-cloud bg-white p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <input
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={1000}
              placeholder="Ask about services or pricing…"
              className="h-10 min-w-0 flex-1 rounded-full border border-cloud bg-mist px-4 text-sm text-ink outline-none placeholder:text-slate/60 focus:border-electric"
            />
            <button
              type="submit"
              disabled={sending || input.trim().length === 0}
              aria-label="Send message"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric text-white transition-colors hover:bg-[#245cff] disabled:opacity-40"
            >
              {sending ? (
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              ) : (
                <Send aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-electric text-white shadow-[0_18px_40px_-16px_rgba(47,107,255,0.9)] transition-transform hover:-translate-y-0.5"
      >
        {open ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        )}
      </button>

      {confirmReset ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-reset-title"
            className="w-full max-w-sm rounded-3xl border border-cloud bg-white p-6 shadow-2xl"
          >
            <h2
              id="chat-reset-title"
              className="text-lg font-semibold text-ink"
            >
              Start a new conversation?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate">
              This clears the current chat from this browser. Nothing from this
              conversation is stored on the server.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmReset(false)}
                className="rounded-full border border-cloud bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mist"
              >
                Keep chat
              </button>
              <button
                type="button"
                onClick={resetConversation}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-electric px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#245cff]"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Clear conversation
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
