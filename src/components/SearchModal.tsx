"use client";

import { useEffect, useState } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { articles } from "../data/articles";
import Link from "next/link";
import { Article } from "../types/news";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 2) {
      const filtered = articles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        a.excerpt.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col p-4 md:p-8 transition-opacity duration-300">
      <div className="max-w-3xl w-full mx-auto bg-surface flex flex-col h-full md:h-auto md:max-h-[80vh] shadow-2xl border border-border">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border bg-muted/30">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">Search The News</h2>
          <button onClick={onClose} className="hover:text-accent transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Input */}
        <div className="p-6 md:p-8 border-b border-border relative">
          <SearchIcon className="absolute left-10 md:left-12 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <input 
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search stories..."
            className="w-full text-2xl md:text-4xl font-serif border-none outline-none bg-transparent pl-12 py-2 placeholder:text-muted-foreground/50 focus:ring-0"
          />
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
          {query.trim().length <= 2 ? (
            <div className="text-muted-foreground">
              <h3 className="font-bold text-xs uppercase tracking-widest mb-4">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {["Politics", "Technology", "World", "Business"].map(term => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 border border-border text-sm hover:border-accent hover:text-accent transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Results</h3>
              {results.map(article => (
                <Link 
                  href={`/article/${article.slug}`} 
                  key={article.id}
                  onClick={onClose}
                  className="block group"
                >
                  <article>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1 block">
                      Category
                    </span>
                    <h4 className="font-serif text-xl font-medium group-hover:text-accent transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{article.excerpt}</p>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No results found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
