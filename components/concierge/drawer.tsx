"use client";

import { useState } from "react";
import Link from "next/link";
import { Drawer } from "vaul";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

/**
 * AI concierge drawer. augments the contact form. Uses Vaul drawer,
 * streams from /api/concierge via AI SDK v6 useChat, renders assistant
 * messages in Blake's voice with tool calls bound to lib/packages.ts
 * and lib/cities.ts (deterministic. can't hallucinate a price).
 *
 * Gated by NEXT_PUBLIC_CONCIERGE_ENABLED: drawer + trigger button only
 * render when the env var is "true". Otherwise site is unchanged.
 */

const SUGGESTIONS = [
  "I want a backyard movie night in June for 30 people",
  "Wedding reception entertainment, 120 guests in Plymouth",
  "Fight night with friends. PPV on the big screen",
  "Graduation party, want a blacklight / glow vibe",
];

export default function ConciergeDrawer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/concierge" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  }

  function askSuggestion(text: string) {
    if (isLoading) return;
    sendMessage({ text });
  }

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button
          aria-label="Open the After Dusk concierge"
          className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-oxblood text-projector px-4 py-3 text-sm font-semibold shadow-[0_14px_40px_rgba(107,31,31,0.45)] hover:bg-oxblood-deep transition-colors"
        >
          <Sparkles size={14} aria-hidden="true" />
          Plan your night
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-[100] mt-24 flex h-[85vh] flex-col rounded-t-2xl bg-charcoal border-t border-oxblood/40 focus:outline-none">
          <Drawer.Title className="sr-only">Plan your night. After Dusk concierge</Drawer.Title>
          <Drawer.Description className="sr-only">
            Ask about audio tiers, add-ons, and service area. Final quotes come from Blake.
          </Drawer.Description>
          <div className="mx-auto w-12 h-1.5 rounded-full bg-white/20 mt-2 mb-1" aria-hidden="true" />
          <header className="flex items-center justify-between px-5 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-ember" aria-hidden="true" />
              <p className="font-display tracking-wider text-projector text-lg">PLAN YOUR NIGHT</p>
            </div>
            <Drawer.Close asChild>
              <button
                aria-label="Close"
                className="text-steel hover:text-projector transition-colors p-1"
              >
                <X size={18} />
              </button>
            </Drawer.Close>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-steel text-sm leading-relaxed">
                  Tell us about your event. Our concierge will recommend the right audio tier and
                  flag add-ons that fit. For final pricing, we always send a custom quote. within
                  24 hours.
                </p>
                <ul className="space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => askSuggestion(s)}
                        className="w-full text-left rounded-lg border border-white/10 hover:border-oxblood/50 bg-screening/60 hover:bg-oxblood/10 transition-colors px-4 py-3 text-sm text-projector"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={[
                  "max-w-[90%] rounded-lg px-4 py-3 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-oxblood text-projector"
                    : "bg-screening text-projector border border-white/10",
                ].join(" ")}
              >
                {m.parts.map((part, i) => {
                  if (part.type === "text") {
                    return <span key={i} className="whitespace-pre-wrap">{part.text}</span>;
                  }
                  if (part.type.startsWith("tool-")) {
                    return (
                      <span
                        key={i}
                        className="text-[11px] uppercase tracking-wider text-ember/70 block mb-1"
                      >
                        ⟶ {part.type.replace("tool-", "")}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            ))}

            {isLoading && (
              <div className="bg-screening text-steel border border-white/10 rounded-lg px-4 py-3 text-sm inline-flex items-center gap-2">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse [animation-delay:0.4s]" />
                </span>
              </div>
            )}
          </div>

          <footer className="border-t border-white/10 p-4 space-y-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your event…"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-screening border border-white/15 text-projector placeholder-steel px-3 py-2.5 text-sm focus:outline-none focus:border-oxblood focus:ring-1 focus:ring-oxblood disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send"
                className="shrink-0 rounded-lg bg-oxblood text-projector hover:bg-oxblood-deep disabled:opacity-40 disabled:cursor-not-allowed px-3.5 py-2.5 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="flex items-center justify-between text-[11px] text-steel/80">
              <span>Final quotes come from Blake, always.</span>
              <Link href="/contact" className="text-ember hover:text-projector transition-colors">
                Or use the contact form →
              </Link>
            </div>
          </footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
