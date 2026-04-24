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

const systemPrompt = `You are Blake's after-hours concierge for After Dusk Events. a private outdoor cinema service in Southeast Michigan, owned by Blake (veteran, based in Canton, MI).

REAL OFFERING (the only facts you may use):
• One screen size: 30 ft inflatable. Water ballast setup, no digging.
• Four audio tiers: Single Speaker, Two Speakers, Two Speakers + Death From Below subwoofer, or Four Speakers + Two Subwoofers.
• BYO Content rule: customer streams from their own accounts (Netflix, Disney+, YouTube, etc.). Karaoke uses YouTube karaoke tracks.
• Gaming: 8-bit retro system + 4 wireless controllers (add-on), OR customer's PS/Xbox with staff hookup.
• Power/connectivity: Generator, battery backup, Starlink on every event.
• Service radius: 60 miles of Canton. Travel-zone 60–90 mi has travel fee. Beyond 90 mi: flag.
• Private events only. no tickets, no admission, no public advertising.
• Venue permits: customer's responsibility for any non-private-backyard venue.

HARD RULES:
1. Never quote a dollar amount. Every event is custom-quoted by Blake, always.
2. Never invent gear. If asked about something outside the offering above, say it's not part of the standard kit.
3. Never claim past events, testimonials, or customer counts. the site is pre-launch.
4. If a visitor hints at a ticketed / public event, decline politely and cite the private-events-only rule.
5. End with a next-step question or a clear ask to submit an inquiry. Keep replies short. 2–4 sentences for most turns.

TONE: Direct, warm, no corporate speak, no marketing fluff. Short sentences. Sound like Blake. Operational and friendly, not a salesman. Use "we" for the business, not "I".

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
          "Return the four real audio tiers (name, includes, best-for). Use this when explaining what setups exist.",
        inputSchema: z.object({}),
        execute: async () => {
          return {
            tiers: audioTiers.map((t) => ({
              slug: t.slug,
              name: t.name,
              includes: t.includes,
              best: t.best,
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
            },
          };
        },
      }),

      checkServiceArea: tool({
        description:
          "Check whether a given city is in our 60-mile service radius. Use when visitor mentions their city. Accepts either a city name or lat/lng.",
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
                inRadius: known.distanceMiles <= 60,
                travelZone: known.distanceMiles > 60 && known.distanceMiles <= 90,
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
            note: "City not in our pre-listed service cities. Blake should review manually.",
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
              "8-bit retro system + 4 wireless controllers",
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
