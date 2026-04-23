import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FilmStrip from "@/components/film-strip";
import { PrivateEventsNotice } from "@/components/private-events-notice";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the After Dusk Events website.",
  alternates: { canonical: "/terms" },
};

const sections: [string, React.ReactNode][] = [
  [
    "Use of the Site",
    "You may use this Site for lawful purposes only. You agree not to: scrape content without permission; attempt to disrupt or interfere with the Site's operation; misrepresent your identity when submitting inquiries; or use the Site in any way that violates applicable law.",
  ],
  [
    "Intellectual property",
    "All content on this Site, including text, images, logo, and design, is the property of After Dusk Events LLC or its licensors. You may not reproduce, distribute, or create derivative works without written permission.",
  ],
  [
    "No warranty",
    'This Site is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the Site will be uninterrupted, error-free, or free of harmful components.',
  ],
  [
    "Limitation of liability",
    "After Dusk Events LLC will not be liable for any indirect, incidental, or consequential damages arising from your use of this Site. Our total liability for any claim related to the Site will not exceed $100.",
  ],
  [
    "Third-party links",
    "The Site may link to third-party websites (social media, etc.). We are not responsible for the content or practices of those sites and linking does not imply endorsement.",
  ],
  [
    "Governing law",
    "These terms are governed by the laws of the State of Michigan. Any disputes will be resolved in the courts of Wayne County, Michigan.",
  ],
  [
    "Changes",
    "We reserve the right to update these terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the revised terms.",
  ],
  [
    "Contact",
    <>
      Questions about these terms can be directed to{" "}
      <a
        href="mailto:hello@afterduskevents.com"
        className="underline hover:text-tail transition-colors"
      >
        hello@afterduskevents.com
      </a>
      .
    </>,
  ],
];

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-10">
          <div className="mx-auto max-w-3xl">
            <p className="serial text-tail mb-6">Policy · Terms of Use</p>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] uppercase leading-none">
              Terms of use.
            </h1>
            <p className="serial text-concrete mt-6">
              Effective Date · January 1, 2026
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        <section className="bg-paper px-4 sm:px-10 py-14">
          <div className="mx-auto max-w-3xl space-y-10 font-body leading-relaxed">
            <p className="text-concrete">
              These Terms of Use govern your use of the After Dusk Events
              website at afterduskevents.com (&ldquo;Site&rdquo;). By using
              the Site you agree to these terms. These terms apply to the
              website only. They do not constitute a service contract. If
              you book an event, a separate Service Agreement will govern
              that engagement.
            </p>

            <PrivateEventsNotice />

            {sections.map(([title, body], i) => (
              <div key={title}>
                <p className="serial text-tail mb-2">
                  §{String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-2xl uppercase leading-none mb-3">
                  {title}
                </h2>
                <div className="text-concrete">{body}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
