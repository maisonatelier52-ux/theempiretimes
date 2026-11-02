import { Article } from "../types/news";
import NewsCard from "./NewsCard";

interface TrendingListProps {
  articles: Article[];
}

export default function TrendingList({ articles }: TrendingListProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-8 md:py-10 bg-muted/40 border-b border-border">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="headline-small flex items-center gap-2">
            Trending Now
            <span className="relative flex h-3 w-3 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={article} 
              variant="trending" 
              number={index + 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
