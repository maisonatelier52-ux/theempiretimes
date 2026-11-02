import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | The Empire Times",
  description: "Learn how we use cookies and tracking technologies to enhance your reading experience.",
};

export default function CookiesPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">Legal Information</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Cookie Policy</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">Last Updated: January 1, 2026</p>

        <div className="prose-article space-y-6 text-sm text-foreground">
          <p>
            This Cookie Policy explains how The Empire Times uses cookies and similar tracking technologies to recognize you when you visit our website.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">1. What Are Cookies?</h2>
          <p>
            Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, provide custom user preferences, and supply reporting data.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">2. Types of Cookies We Use</h2>
          <p>
            We use essential cookies for site functionality, performance cookies for analytics, and preference cookies to remember your reading themes and settings.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">3. Managing Preferences</h2>
          <p>
            You can set or amend your web browser controls to accept or refuse cookies. Most modern browsers allow you to block third-party cookies or delete existing cookies in settings.
          </p>
        </div>
      </div>
    </div>
  );
}
