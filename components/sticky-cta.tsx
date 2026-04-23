"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Drawer } from "vaul";
import { MessageSquare, Phone, Mail } from "lucide-react";

const HIDE_ON_PATHS = ["/contact", "/thanks"];

export default function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const update = () => setReduced(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (HIDE_ON_PATHS.some((p) => pathname?.startsWith(p))) {
      setVisible(false);
      return;
    }
    const onScroll = () => {
      const scrolled = window.scrollY;
      const viewport = window.innerHeight;
      setVisible(scrolled > viewport * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (HIDE_ON_PATHS.some((p) => pathname?.startsWith(p))) return null;
  if (!visible) return null;

  return (
    <div
      className={[
        "fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6",
        reduced ? "" : "transition-transform duration-300",
      ].join(" ")}
    >
      {/* Mobile: Vaul drawer */}
      <div className="sm:hidden">
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <button
              type="button"
              aria-label="Open quick contact"
              className="inline-flex items-center gap-2 rounded-full bg-oxblood text-projector px-5 py-3 text-sm font-semibold shadow-[0_8px_24px_rgba(107,31,31,0.45)] hover:bg-oxblood-deep transition-colors"
            >
              <MessageSquare size={16} aria-hidden="true" />
              Get a Quote
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 z-40" />
            <Drawer.Content
              className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal border-t-2 border-oxblood/40 rounded-t-2xl p-6 pb-10 outline-none"
              aria-describedby={undefined}
            >
              <Drawer.Title className="font-heading text-lg text-projector mb-1">
                Quickest path to a quote
              </Drawer.Title>
              <Drawer.Description className="text-steel text-sm mb-5">
                Reach Blake directly. We respond within 24 hours.
              </Drawer.Description>

              <div className="mx-auto w-12 h-1 bg-white/15 rounded-full mb-6 -mt-2" aria-hidden="true" />

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 rounded-lg p-4 bg-screening border border-oxblood/40 text-projector hover:border-oxblood transition-colors"
                  >
                    <MessageSquare size={18} className="text-ember" aria-hidden="true" />
                    <div>
                      <div className="font-heading text-base">Quote form</div>
                      <div className="text-steel text-xs">3 quick steps · response in 24h</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@afterduskevents.com"
                    className="flex items-center gap-3 rounded-lg p-4 bg-screening border border-white/10 text-projector hover:border-oxblood/40 transition-colors"
                  >
                    <Mail size={18} className="text-ember" aria-hidden="true" />
                    <div>
                      <div className="font-heading text-base">Email Blake</div>
                      <div className="text-steel text-xs">hello@afterduskevents.com</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="sms:+17347760000"
                    className="flex items-center gap-3 rounded-lg p-4 bg-screening border border-white/10 text-projector hover:border-oxblood/40 transition-colors"
                  >
                    <Phone size={18} className="text-ember" aria-hidden="true" />
                    <div>
                      <div className="font-heading text-base">Text Blake</div>
                      <div className="text-steel text-xs">SMS for fastest reply</div>
                    </div>
                  </a>
                </li>
              </ul>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>

      {/* Desktop: simple link to /contact */}
      <Link
        href="/contact"
        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-oxblood text-projector px-5 py-3 text-sm font-semibold shadow-[0_8px_24px_rgba(107,31,31,0.45)] hover:bg-oxblood-deep transition-colors"
      >
        <MessageSquare size={16} aria-hidden="true" />
        Get a Quote
      </Link>
    </div>
  );
}
