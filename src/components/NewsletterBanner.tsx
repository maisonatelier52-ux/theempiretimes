export default function NewsletterBanner() {
  return (
    <section className="bg-primary text-white py-12 md:py-16">
      <div className="container-narrow px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
          Stay ahead of the news.
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          A concise briefing of the stories that matter, delivered every morning.
        </p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-grow bg-[#222] border border-[#333] px-4 py-3 text-sm focus:outline-none focus:border-accent text-white"
            required
          />
          <button 
            type="button"
            className="bg-accent text-white font-bold uppercase tracking-widest text-xs px-8 py-3 hover:bg-accent/90 transition-colors sm:w-auto w-full"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
