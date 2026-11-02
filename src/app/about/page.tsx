import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | The Empire Times",
  description: "Learn about our editorial mission, values, and journalism standards.",
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">About The Empire Times</h1>
        <p className="font-serif text-xl text-muted-foreground mb-8 leading-relaxed">
          The Empire Times is a digital-first publication dedicated to delivering rigorous, independent, and high-impact journalism across politics, technology, business, and global culture.
        </p>
        <div className="prose-article space-y-6">
          <p>
            Founded in 2024, our newsroom operates on the principle that clarity and analytical depth are paramount in an era of information overload. We strive to contextualize complex developments with objectivity and speed.
          </p>
          <p>
            Our team of global correspondents and industry analysts works around the clock to bring readers verified reporting, transparent sourcing, and balanced perspectives.
          </p>
        </div>
      </div>
    </div>
  );
}
