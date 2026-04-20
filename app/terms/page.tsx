import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the After Dusk Events website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-charcoal">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-4xl text-brand-white mb-2">Terms of Use</h1>
            <p className="text-brand-gray text-sm">Effective date: January 1, 2026</p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8 text-brand-gray leading-relaxed">
            <p className="text-brand-gray">
              These Terms of Use govern your use of the After Dusk Events website at
              afterduskevents.com ("Site"). By using the Site you agree to these terms. These terms
              apply to the website only -- they do not constitute a service contract. If you book an
              event, a separate Service Agreement will govern that engagement.
            </p>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">Use of the Site</h2>
              <p>
                You may use this Site for lawful purposes only. You agree not to: scrape content
                without permission; attempt to disrupt or interfere with the Site's operation;
                misrepresent your identity when submitting inquiries; or use the Site in any way
                that violates applicable law.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">Intellectual property</h2>
              <p>
                All content on this Site -- including text, images, logo, and design -- is the
                property of After Dusk Events LLC or its licensors. You may not reproduce, distribute,
                or create derivative works without written permission.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">No warranty</h2>
              <p>
                This Site is provided "as is" without warranties of any kind, express or implied.
                We do not guarantee that the Site will be uninterrupted, error-free, or free of
                harmful components.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">Limitation of liability</h2>
              <p>
                After Dusk Events LLC will not be liable for any indirect, incidental, or consequential
                damages arising from your use of this Site. Our total liability for any claim related
                to the Site will not exceed $100.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">Third-party links</h2>
              <p>
                The Site may link to third-party websites (social media, etc.). We are not responsible
                for the content or practices of those sites and linking does not imply endorsement.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">Governing law</h2>
              <p>
                These terms are governed by the laws of the State of Michigan. Any disputes will be
                resolved in the courts of Wayne County, Michigan.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">Changes</h2>
              <p>
                We reserve the right to update these terms at any time. Continued use of the Site
                after changes are posted constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-brand-white mb-3">Contact</h2>
              <p>
                Questions about these terms can be directed to{" "}
                <a
                  href="mailto:hello@afterduskevents.com"
                  className="text-brand-white underline hover:text-brand-gray transition-colors"
                >
                  hello@afterduskevents.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
