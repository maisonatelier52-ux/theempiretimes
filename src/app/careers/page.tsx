import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | The Empire Times",
  description: "Join our global newsroom and help shape the future of independent journalism.",
};

export default function CareersPage() {
  const positions = [
    { title: "Senior Political Correspondent", department: "Editorial", location: "Washington, D.C. / Remote" },
    { title: "Technology & AI Reporter", department: "Editorial", location: "San Francisco / Remote" },
    { title: "Lead Full-Stack Engineer", department: "Engineering", location: "New York / Hybrid" },
    { title: "Product Designer (UX/UI)", department: "Product", location: "London / Remote" },
  ];

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container-narrow px-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">Join Our Team</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Careers at The Empire Times</h1>
        <p className="font-serif text-lg text-muted-foreground mb-12 leading-relaxed">
          We are looking for passionate journalists, engineers, designers, and thinkers committed to publishing accurate, impactful reporting for a global audience.
        </p>

        <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-primary mb-6">Open Positions</h2>
        <div className="space-y-4">
          {positions.map((pos) => (
            <div key={pos.title} className="p-6 border border-border bg-surface hover:border-accent transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-primary">{pos.title}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{pos.department} &middot; {pos.location}</p>
              </div>
              <button className="px-5 py-2.5 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors self-start md:self-auto">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
