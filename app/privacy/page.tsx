import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { FunnelSection } from "@/components/funnel/layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the After Dusk Events website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-caption text-ember mb-4">Legal</p>
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none">
              PRIVACY POLICY.
            </h1>
            <p className="mt-6 text-steel text-sm">Effective date: January 1, 2026</p>
          </div>
        </FunnelSection>

        <FunnelSection>
          <div className="mx-auto max-w-3xl space-y-8 text-silver leading-relaxed">
            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">Who we are</h2>
              <p>
                After Dusk Events LLC operates the website at afterduskevents.com. We are a
                veteran-owned outdoor cinema and event rental company based in Canton, Michigan.
                Questions about this policy can be sent to{" "}
                <a
                  href="mailto:hello@afterduskevents.com"
                  className="text-ember underline hover:text-projector transition-colors"
                >
                  hello@afterduskevents.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">Information we collect</h2>
              <p>
                We collect information you provide directly when you fill out the inquiry form:
                name, email address, phone number (optional), event details, and how you heard
                about us. We do not collect payment information through this website.
              </p>
              <p className="mt-3">
                We also collect standard analytics data (pages visited, session duration, device
                type) via Vercel Analytics, which does not use cookies or track individuals across
                websites.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">How we use your information</h2>
              <p>
                Information you submit through the inquiry form is used solely to respond to your
                event request. We will not sell, share, or rent your personal information to third
                parties. We may contact you at the email or phone number you provide to discuss
                your event or send a quote.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">Data retention</h2>
              <p>
                Inquiry emails are retained in our business email account. You may request deletion
                of your information at any time by emailing us.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">Cookies</h2>
              <p>
                This website does not use advertising cookies or tracking pixels. Vercel Analytics
                uses privacy-preserving, cookie-free measurement.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">Third-party services</h2>
              <p>
                We use Resend to deliver inquiry emails and Vercel to host this website. Each
                service has its own privacy policy. We do not share personal data with any other
                third parties.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">Your rights</h2>
              <p>
                You may request access to, correction of, or deletion of any personal information
                we hold about you. Contact us at hello@afterduskevents.com and we will respond
                within 30 days.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-heading-lg text-projector mb-3">Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The effective date at the top of the
                page will reflect the most recent revision.
              </p>
            </div>
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
