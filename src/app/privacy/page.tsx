import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Empire Times",
  description: "Read our privacy statement regarding data collection, protection, and user rights.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">Legal Information</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">Last Updated: January 1, 2026</p>

        <div className="prose-article space-y-6 text-sm text-foreground">
          <p>
            At The Empire Times, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our publication website or subscribe to our newsletters.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when subscribing to our newsletter, creating an account, or submitting feedback. This may include your email address, name, and reading preferences.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">2. How We Use Your Data</h2>
          <p>
            We use collected information to deliver news updates, improve site navigation, respond to reader inquiries, and analyze aggregate readership traffic to enhance our editorial offerings.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">3. Your Rights</h2>
          <p>
            You have the right to request access to your personal data, opt out of marketing communications at any time, or request the deletion of your account record.
          </p>
        </div>
      </div>
    </div>
  );
}
