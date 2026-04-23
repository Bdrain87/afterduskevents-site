import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FilmStrip from "@/components/film-strip";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the After Dusk Events website.",
  alternates: { canonical: "/privacy" },
};

const sections: [string, React.ReactNode][] = [
  [
    "Who we are",
    <>
      After Dusk Events LLC operates the website at afterduskevents.com. We
      are a veteran-owned outdoor cinema and event rental company based in
      Canton, Michigan. Questions about this policy can be sent to{" "}
      <a
        href="mailto:hello@afterduskevents.com"
        className="underline hover:text-tail transition-colors"
      >
        hello@afterduskevents.com
      </a>
      .
    </>,
  ],
  [
    "Information we collect",
    <>
      <p>
        We collect information you provide directly when you fill out the
        inquiry form: name, email address, phone number (optional), event
        details, and how you heard about us. We do not collect payment
        information through this website.
      </p>
      <p className="mt-3">
        We also collect standard analytics data (pages visited, session
        duration, device type) via Vercel Analytics, which does not use
        cookies or track individuals across websites.
      </p>
    </>,
  ],
  [
    "How we use your information",
    "Information you submit through the inquiry form is used solely to respond to your event request. We will not sell, share, or rent your personal information to third parties. We may contact you at the email or phone number you provide to discuss your event or send a quote.",
  ],
  [
    "Data retention",
    "Inquiry emails are retained in our business email account. You may request deletion of your information at any time by emailing us.",
  ],
  [
    "Cookies",
    "This website does not use advertising cookies or tracking pixels. Vercel Analytics uses privacy-preserving, cookie-free measurement.",
  ],
  [
    "Third-party services",
    "We use Resend to deliver inquiry emails and Vercel to host this website. Each service has its own privacy policy. We do not share personal data with any other third parties.",
  ],
  [
    "Your rights",
    "You may request access to, correction of, or deletion of any personal information we hold about you. Contact us at hello@afterduskevents.com and we will respond within 30 days.",
  ],
  [
    "Changes to this policy",
    "We may update this policy from time to time. The effective date at the top of the page will reflect the most recent revision.",
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-10">
          <div className="mx-auto max-w-3xl">
            <p className="serial text-tail mb-6">Policy · Privacy</p>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] uppercase leading-none">
              Privacy policy.
            </h1>
            <p className="serial text-concrete mt-6">
              Effective Date · January 1, 2026
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        <section className="bg-paper px-4 sm:px-10 py-14">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-10 font-body leading-relaxed">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
