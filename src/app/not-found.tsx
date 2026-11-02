import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-background">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">404 Error</span>
      <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-primary">Article Not Found</h1>
      <p className="font-serif text-lg text-muted-foreground max-w-md mb-8">
        The story you are looking for might have been moved, renamed, or is currently unavailable.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-accent transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
