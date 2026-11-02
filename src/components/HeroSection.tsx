import { Article } from "../types/news";
import NewsCard from "./NewsCard";

interface HeroSectionProps {
  articles: Article[];
}

export default function HeroSection({ articles }: HeroSectionProps) {
  if (!articles || articles.length === 0) return null;
  
  const mainFeature = articles[0];
  const secondaryStories = articles.slice(1, 4);

  return (
    <section className="py-8 md:py-12 border-b border-border">
      <div className="container-narrow px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Feature */}
          <div className="lg:col-span-8">
            <NewsCard article={mainFeature} variant="hero-main" />
          </div>

          {/* Secondary Stories */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3 mb-2">
              Top Stories
            </h2>
            {secondaryStories.map((story, index) => (
              <div key={story.id} className={index !== 0 ? "border-t border-border pt-6" : ""}>
                <NewsCard article={story} variant="compact" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
