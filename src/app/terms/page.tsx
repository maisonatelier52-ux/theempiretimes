import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | The Empire Times",
  description: "Terms and conditions governing the use of The Empire Times publication and digital services.",
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">Legal Information</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Terms of Service</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">Effective Date: January 1, 2026</p>

        <div className="prose-article space-y-6 text-sm text-foreground">
          <p>
            Welcome to The Empire Times. By accessing or using our website, mobile interfaces, or newsletter feeds, you agree to be bound by these Terms of Service.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">1. Intellectual Property</h2>
          <p>
            All content published on The Empire Times—including text, graphics, photography, logos, and audio assets—is the intellectual property of The Empire Times Media Group and protected under international copyright law.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">2. Acceptable Use</h2>
          <p>
            Users may share individual articles using standard social sharing tools or direct links. Scraping, unauthorized syndication, or reproduction of full text without explicit written authorization is strictly prohibited.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">3. Disclaimers</h2>
          <p>
            While we strive for accuracy, news content is provided for informational purposes only and should not be construed as financial, legal, or professional advice.
          </p>
        </div>
      </div>
    </div>
  );
}
