import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | The Empire Times",
  description: "Get in touch with our newsroom, editorial staff, and media relations team.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Contact Us</h1>
        <p className="font-serif text-lg text-muted-foreground mb-8">
          Have a news tip, correction, or press inquiry? Reach out to our editorial desk directly.
        </p>
        <div className="space-y-6 text-sm border-t border-border pt-6">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-xs mb-1">Newsroom & News Tips</h3>
            <p className="text-muted-foreground">tips@thedailybrief.com</p>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-xs mb-1">Editorial Inquiries</h3>
            <p className="text-muted-foreground">editor@thedailybrief.com</p>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-xs mb-1">Subscriptions & Support</h3>
            <p className="text-muted-foreground">support@thedailybrief.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
