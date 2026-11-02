"use client";

import { Share2, Link as LinkIcon } from "lucide-react";

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function ShareButtons({ title, url }: { title?: string, url?: string }) {
  const handleShare = (platform: string) => {
    const shareUrl = url || typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = title || 'Check out this article';
    
    let href = '';
    switch (platform) {
      case 'twitter':
        href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (href) {
      window.open(href, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex flex-col gap-4 sticky top-32">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <Share2 className="w-4 h-4" /> Share
      </span>
      <div className="flex flex-row md:flex-col gap-3">
        <button onClick={() => handleShare('twitter')} className="p-2 rounded-full border border-border hover:border-accent hover:text-accent transition-all" aria-label="Share on X">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full border border-border hover:border-accent hover:text-accent transition-all" aria-label="Share on LinkedIn">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('facebook')} className="p-2 rounded-full border border-border hover:border-accent hover:text-accent transition-all" aria-label="Share on Facebook">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('copy')} className="p-2 rounded-full border border-border hover:border-accent hover:text-accent transition-all" aria-label="Copy Link">
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
