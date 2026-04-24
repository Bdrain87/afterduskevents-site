import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool, convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";
import { audioTiers, useCases, suggestTier } from "@/lib/packages";
import { cities, getCity } from "@/lib/cities";
import { findNearestCity } from "@/lib/nearest-city";

/**
 * Streaming concierge chat. Claude Opus 4.7 with deterministic tool calls
 * bound to the real offering data. Guardrails:
 *   - System prompt forbids quoting dollar amounts or inventing gear.
 *   - Pricing questions are answered with "every event is custom-quoted".
 *   - Tool calls read lib/packages.ts and lib/cities.ts only. no DB writes.
 *
 * Env gate: the drawer only renders when NEXT_PUBLIC_CONCIERGE_ENABLED === "true".
 * This route also hard-stops if ANTHROPIC_API_KEY is missing so the site
 * doesn't 500 on deploy.
 */
export const runtime = "nodejs";
export const maxDuration = 30;

const systemPrompt = `You are the after-hours concierge for After Dusk Events. a private outdoor cinema service in Southeast Michigan, veteran-owned and based in Canton, MI.

REAL OFFERING (the only facts you may use):
• One screen size: 30 ft inflatable. Ground-anchor setup with drilled anchors; the site must allow anchors.
• Four audio tiers: Single Speaker, Two Speakers, Two Speakers + Subwoofer, or Four Speakers + Two Subwoofers.
• Speakers and subs are outdoor-rated, battery-powered, and wireless between units. We pick the combination that matches the space.
• BYO Content rule: customer streams from their own accounts (Netflix, Disney+, YouTube, etc.). Karaoke uses YouTube karaoke tracks.
• Gaming: retro gaming kit add-on with HDMI plug-and-play setup, 100,000+ classic-game library, 50+ classic systems, offline play, and four wireless controllers; OR customer's PS/Xbox with staff hookup.
• Power/connectivity: venue power and wifi are used first when available. Generator, battery bank, and Starlink come along as backup only.
• Service radius: 40 miles of Canton (no travel fee). Beyond 40 mi: an additional travel charge is added to the quote. Beyond 90 mi: flag for manual review.
• Private events only. no tickets, no admission, no public advertising.
• Venue permits: customer's responsibility for any non-private-backyard venue.

HARD RULES:
1. Never quote a dollar amount. Every event is custom-quoted by the After Dusk Events team, always.
2. Never invent gear. If asked about something outside the offering above, say it's not part of the standard kit.
3. Never claim past events, testimonials, or customer counts. the site is pre-launch.
4. If a visitor hints at a ticketed / public event, decline politely and cite the private-events-only rule.
5. End with a next-step question or a clear ask to submit an inquiry. Keep replies short. 2–4 sentences for most turns.

TONE: Direct, warm, no corporate speak, no marketing fluff. Short sentences. Operational and friendly, not salesy. Use "we" for the business, not "I".

WORKFLOW: When a visitor describes their event, call the tools to classify the use case + recommend the right audio tier + relevant add-ons. Do NOT compute pricing. Offer to start their inquiry.`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Concierge is not configured. Set ANTHROPIC_API_KEY." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-opus-4-7"),
    system: systemPrompt,
    messages: modelMessages,
    providerOptions: {
      anthropic: {
        cacheControl: { type: "ephemeral" },
      },
    },
    tools: {
      getAudioTiers: tool({
        description:
          "Return the four real audio tiers. Use this when explaining what setups exist.",
        inputSchema: z.object({}),
        execute: async () => {
          return {
            tiers: audioTiers.map((t) => ({
              slug: t.slug,
              name: t.name,
              includes: t.includes,
              best: t.best,
              plainBenefit: t.plainBenefit,
              coverageNote: t.coverageNote,
              soundProfile: t.soundProfile,
              recommendedFor: t.recommendedFor,
              popular: !!t.popular,
            })),
          };
        },
      }),

      suggestSetup: tool({
        description:
          "Given a use-case slug (movie-night / gaming / sports / fights / graduation / celebration) and optional guest count bucket, return the recommended audio tier. Always use this before recommending a tier by name.",
        inputSchema: z.object({
          useCase: z.enum([
            "movie-night",
            "gaming",
            "sports",
            "fights",
            "graduation",
            "celebration",
          ]),
          guestCount: z
            .enum(["Under 25", "25 to 75", "75 to 150", "150+"])
            .optional(),
        }),
        execute: async ({ useCase, guestCount }) => {
          const uc = useCases.find((u) => u.slug === useCase);
          const tier = suggestTier(useCase, guestCount);
          if (!uc || !tier) return { ok: false };
          return {
            ok: true,
            useCase: uc,
            recommendedTier: {
              slug: tier.slug,
              name: tier.name,
              includes: tier.includes,
              best: tier.best,
              plainBenefit: tier.plainBenefit,
              coverageNote: tier.coverageNote,
              soundProfile: tier.soundProfile,
            },
          };
        },
      }),

      checkServiceArea: tool({
        description:
          "Check whether a given city is in our 40-mile service radius. Use when visitor mentions their city. Accepts either a city name or lat/lng.",
        inputSchema: z.object({
          city: z.string().optional(),
          lat: z.number().optional(),
          lng: z.number().optional(),
        }),
        execute: async ({ city, lat, lng }) => {
          if (city) {
            const slug = city.toLowerCase().replace(/\s+/g, "-");
            const known = getCity(slug) ?? cities.find((c) => c.name.toLowerCase() === city.toLowerCase());
            if (known) {
              return {
                ok: true,
                city: known.name,
                distanceMiles: known.distanceMiles,
                inRadius: known.distanceMiles <= 40,
                travelZone: known.distanceMiles > 40,
              };
            }
          }
          if (lat != null && lng != null) {
            const r = findNearestCity(lat, lng);
            if (r) {
              return {
                ok: true,
                nearestCity: r.city.name,
                distanceMiles: Math.round(r.milesFromVisitor * 10) / 10,
                inRadius: r.inRadius,
                travelZone: r.travelZone,
              };
            }
          }
          return {
            ok: false,
            note: "City not in our pre-listed service cities. Review manually.",
          };
        },
      }),

      suggestAddOns: tool({
        description:
          "Given a use case, return relevant add-ons from the catalog. Use when the visitor is planning a specific event and we want to suggest extras.",
        inputSchema: z.object({
          useCase: z.enum([
            "movie-night",
            "gaming",
            "sports",
            "fights",
            "graduation",
            "celebration",
          ]),
        }),
        execute: async ({ useCase }) => {
          const map: Record<string, string[]> = {
            "movie-night": [
              "Popcorn machine rental",
              "Ambient string lighting",
              "Cornhole / can jam / ladder ball",
              "Photo area with backdrop",
            ],
            gaming: [
              "Retro gaming kit with four wireless controllers",
              "BYO console hookup (PS / Xbox)",
              "Patio heater",
              "Cooler rental",
            ],
            sports: [
              "Cooler rental",
              "Folding tables",
              "Ambient string lighting",
            ],
            fights: [
              "Cooler rental",
              "Folding tables",
              "Early setup",
              "Blacklight + Neon Kit (for post-main-event afterparty)",
            ],
            graduation: [
              "YouTube karaoke + 2 wireless mics",
              "Blacklight + Neon Kit",
              "Popcorn machine rental",
              "Photo area with backdrop",
            ],
            celebration: [
              "YouTube karaoke + 2 wireless mics",
              "Popcorn machine rental",
              "Cornhole / can jam / ladder ball",
              "Ambient string lighting",
            ],
          };
          return {
            useCase,
            addOns: map[useCase] ?? [],
            bundle: useCase === "graduation" || useCase === "celebration"
              ? { name: "Blacklight + Neon Kit", note: "Blacklights + glow sticks + bracelets + necklaces, priced as one" }
              : null,
          };
        },
      }),
    },
    stopWhen: ({ steps }) => steps.length >= 4,
  });

  return result.toUIMessageStreamResponse();
}
