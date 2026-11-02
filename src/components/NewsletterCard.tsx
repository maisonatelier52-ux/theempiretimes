export default function NewsletterCard() {
  return (
    <div className="bg-[#1a1a1a] p-6 text-white border-t-2 border-accent">
      <h3 className="font-serif text-2xl font-bold mb-2">Stay informed daily</h3>
      <p className="text-gray-400 text-sm mb-5">
        Get the top stories straight to your inbox every morning.
      </p>
      <form className="flex flex-col gap-3">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="bg-[#2a2a2a] border border-[#3a3a3a] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent w-full"
          required
        />
        <button 
          type="button"
          className="bg-accent text-white font-bold uppercase tracking-wider text-xs py-3 px-4 hover:bg-accent/90 transition-colors w-full"
        >
          Subscribe
        </button>
      </form>
      <p className="text-[#666] text-[10px] mt-3 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
