import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Article } from "../types/news";
import NewsCard from "./NewsCard";

interface LatestNewsGridProps {
  articles: Article[];
}

export default function LatestNewsGrid({ articles }: LatestNewsGridProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-8 md:py-10 border-b border-border">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.1em] text-primary">
              Latest News
            </h2>
            <div className="ml-4 h-[2px] bg-accent w-12 hidden sm:block"></div>
          </div>
          <Link href="/latest" className="text-xs uppercase tracking-widest font-bold hover:text-accent transition-colors flex items-center gap-1">
            View all news <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-10">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
