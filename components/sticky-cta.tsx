"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Drawer } from "vaul";
import { MessageSquare, Phone, Mail } from "lucide-react";
import { DUR, EASE, useReducedMotionLive } from "@/lib/motion";

const HIDE_ON_PATHS = ["/contact", "/thanks"];

export default function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotionLive();
  const hidden = HIDE_ON_PATHS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (hidden) {
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
  }, [hidden]);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: DUR.base, ease: EASE.snappy }}
        >
          {/* Mobile: Vaul drawer */}
          <div className="sm:hidden">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button
                  type="button"
                  aria-label="Open quick contact"
                  className="inline-flex items-center gap-2 rounded-full bg-oxblood text-projector px-5 py-3 text-sm font-semibold shadow-[0_8px_24px_rgba(107,31,31,0.45)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-oxblood-deep hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(107,31,31,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  Request a Quote
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
                  <Drawer.Description className="text-silver text-sm mb-5">
                    Send the basics. We respond within 24 hours.
                  </Drawer.Description>

                  <div className="mx-auto w-12 h-1 bg-white/15 rounded-full mb-6 -mt-2" aria-hidden="true" />

                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/contact"
                        className="flex items-center gap-3 rounded-lg p-4 bg-screening border border-oxblood/40 text-projector transition-colors duration-200 hover:border-oxblood focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                      >
                        <MessageSquare size={18} className="text-ember" aria-hidden="true" />
                        <div>
                          <div className="font-heading text-base">Quote form</div>
                          <div className="text-silver text-xs">3 quick steps · response in 24h</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="mailto:hello@afterduskevents.com"
                        className="flex items-center gap-3 rounded-lg p-4 bg-screening border border-white/10 text-projector transition-colors duration-200 hover:border-oxblood/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                      >
                        <Mail size={18} className="text-ember" aria-hidden="true" />
                        <div>
                          <div className="font-heading text-base">Email us</div>
                          <div className="text-silver text-xs">hello@afterduskevents.com</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="sms:+17347760000"
                        className="flex items-center gap-3 rounded-lg p-4 bg-screening border border-white/10 text-projector transition-colors duration-200 hover:border-oxblood/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                      >
                        <Phone size={18} className="text-ember" aria-hidden="true" />
                        <div>
                          <div className="font-heading text-base">Text us</div>
                          <div className="text-silver text-xs">SMS for fastest reply</div>
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
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-oxblood text-projector px-5 py-3 text-sm font-semibold shadow-[0_8px_24px_rgba(107,31,31,0.45)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-oxblood-deep hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(107,31,31,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <MessageSquare size={16} aria-hidden="true" />
            Request a Quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
