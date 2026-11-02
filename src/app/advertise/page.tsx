import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise & Partnerships | The Empire Times",
  description: "Reach an engaged audience of global decision makers, professionals, and readers.",
};

export default function AdvertisePage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">Partnerships</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Advertise with The Empire Times</h1>
        <p className="font-serif text-lg text-muted-foreground mb-12 leading-relaxed">
          Connect your brand with over 2 million influential daily readers, industry executives, and informed global citizens through bespoke sponsorship models.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border border-border bg-surface">
            <h3 className="font-serif text-lg font-bold mb-2">Display & Native</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">High-impact responsive placements seamlessly integrated into our reading experience.</p>
          </div>
          <div className="p-6 border border-border bg-surface">
            <h3 className="font-serif text-lg font-bold mb-2">Newsletter Sponsorship</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Direct access to subscriber inboxes with dedicated daily briefing takeovers.</p>
          </div>
          <div className="p-6 border border-border bg-surface">
            <h3 className="font-serif text-lg font-bold mb-2">Custom Content</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Co-created thought leadership articles developed in partnership with our brand studio.</p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground mb-4">Interested in media kits and rate cards?</p>
          <a href="mailto:partnerships@thedailybrief.com" className="inline-block px-6 py-3 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors">
            Contact Partnerships Team
          </a>
        </div>
      </div>
    </div>
  );
}
