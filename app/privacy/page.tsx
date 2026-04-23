import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-4xl text-projector mb-2">Privacy Policy</h1>
            <p className="text-steel text-sm">Effective date: January 1, 2026</p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl prose prose-sm prose-invert max-w-none">
            <div className="space-y-8 text-steel leading-relaxed">
              <div>
                <h2 className="font-heading text-xl text-projector mb-3">Who we are</h2>
                <p>
                  After Dusk Events LLC operates the website at afterduskevents.com. We are a
                  veteran-owned outdoor cinema and event rental company based in Canton, Michigan.
                  Questions about this policy can be sent to{" "}
                  <a
                    href="mailto:hello@afterduskevents.com"
                    className="text-projector underline hover:text-steel transition-colors"
                  >
                    hello@afterduskevents.com
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-projector mb-3">Information we collect</h2>
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
                <h2 className="font-heading text-xl text-projector mb-3">How we use your information</h2>
                <p>
                  Information you submit through the inquiry form is used solely to respond to your
                  event request. We will not sell, share, or rent your personal information to third
                  parties. We may contact you at the email or phone number you provide to discuss
                  your event or send a quote.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-projector mb-3">Data retention</h2>
                <p>
                  Inquiry emails are retained in our business email account. You may request deletion
                  of your information at any time by emailing us.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-projector mb-3">Cookies</h2>
                <p>
                  This website does not use advertising cookies or tracking pixels. Vercel Analytics
                  uses privacy-preserving, cookie-free measurement.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-projector mb-3">Third-party services</h2>
                <p>
                  We use Resend to deliver inquiry emails and Vercel to host this website. Each
                  service has its own privacy policy. We do not share personal data with any other
                  third parties.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-projector mb-3">Your rights</h2>
                <p>
                  You may request access to, correction of, or deletion of any personal information
                  we hold about you. Contact us at hello@afterduskevents.com and we will respond
                  within 30 days.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-projector mb-3">Changes to this policy</h2>
                <p>
                  We may update this policy from time to time. The effective date at the top of the
                  page will reflect the most recent revision.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
