"use client";

export default function Newsletter() {
  return (
    <div className="bg-muted py-16 md:py-24 border-y border-border">
      <div className="container-narrow px-4 xl:px-0 text-center max-w-2xl mx-auto">
        <h2 className="headline-medium mb-4">The Daily Brief</h2>
        <p className="prose-article mb-8 text-muted-foreground">
          The essential stories, expert analysis, and exclusive insights, delivered straight to your inbox every morning.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            required
            className="flex-1 bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
          <button 
            type="submit"
            className="bg-foreground text-background px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-accent transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
