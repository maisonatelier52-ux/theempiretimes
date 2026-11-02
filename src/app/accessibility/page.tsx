import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | The Empire Times",
  description: "Our commitment to ensuring digital accessibility for readers of all abilities.",
};

export default function AccessibilityPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">Accessibility</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Accessibility Statement</h1>
        <p className="font-serif text-lg text-muted-foreground mb-8 leading-relaxed">
          The Empire Times is committed to ensuring digital accessibility for individuals with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.
        </p>

        <div className="prose-article space-y-6 text-sm text-foreground">
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">Standards Compliance</h2>
          <p>
            We aim to conform with WCAG 2.1 Level AA accessibility guidelines. Our site features scalable typography, high contrast color modes, keyboard navigation compatibility, and descriptive alt text for images.
          </p>
          <h2 className="font-serif text-xl font-bold text-primary mt-8 mb-2">Feedback & Assistance</h2>
          <p>
            We welcome your feedback on the accessibility of The Empire Times. If you encounter accessibility barriers, please notify us at:
          </p>
          <p className="font-bold text-primary">
            Email: accessibility@thedailybrief.com
          </p>
        </div>
      </div>
    </div>
  );
}
