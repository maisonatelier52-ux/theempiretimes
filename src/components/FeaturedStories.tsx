import { Article } from "../types/news";
import NewsCard from "./NewsCard";

interface FeaturedStoriesProps {
  articles: Article[];
  title?: string;
}

export default function FeaturedStories({ articles, title = "Editor's Picks" }: FeaturedStoriesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container-narrow px-4 xl:px-0">
        <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-border pb-4">
          <h2 className="headline-small">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {articles.slice(0, 4).map(article => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
