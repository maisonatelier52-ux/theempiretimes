import { Article } from "../types/news";
import { Category } from "../types/news";
import NewsCard from "./NewsCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  category: Category;
  articles: Article[];
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const listArticles = articles.slice(1, 5);

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container-narrow px-4 xl:px-0">
        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
          <h2 className="font-serif text-3xl font-bold">{category.name}</h2>
          <Link 
            href={`/category/${category.slug}`} 
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors"
          >
            More <span className="hidden md:inline">in {category.name}</span> <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Category Feature */}
          <div className="lg:col-span-7">
                <NewsCard key={featured.id} article={featured} variant="compact" />
          </div>
          
          {/* Category List */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {listArticles.map((article, index) => (
              <div key={article.id} className={index !== 0 ? "border-t border-border pt-4" : ""}>
                <NewsCard key={article.id} article={article} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
