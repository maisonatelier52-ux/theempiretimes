import { Article } from "../types/news";
import NewsCard from "./NewsCard";
import NewsletterCard from "./NewsletterCard";

interface HeroEditorialGridProps {
  articles: Article[];
}

export default function HeroEditorialGrid({ articles }: HeroEditorialGridProps) {
  if (!articles || articles.length === 0) return null;

  const mainFeature = articles[0];
  const subFeatures = articles.slice(1, 3);
  const topStories = articles.slice(3, 9);
  const editorPicks = articles.slice(9, 13);

  return (
    <section className="pt-6 md:pt-8 pb-10 border-b border-border">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 xl:gap-8 items-stretch">
          
          {/* LEFT - MAIN STORY + SUB-FEATURES */}
          <div className="w-full lg:w-[56%] xl:w-[54%] flex flex-col justify-between">
            <div>
              <NewsCard article={mainFeature} variant="hero-main" />
            </div>

            {/* Sub-features grid to fill vertical gap with news */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-border">
              {subFeatures.map((story) => (
                <NewsCard key={story.id} article={story} variant="compact" />
              ))}
            </div>
          </div>

          {/* CENTER - TOP STORIES (approx 26-28%) */}
          <div className="w-full lg:w-[26%] xl:w-[28%] flex flex-col">
            <div className="flex items-center mb-3">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-primary">
                Top Stories
              </h2>
              <div className="flex-grow ml-3 h-[2px] bg-accent w-10 flex-shrink-0"></div>
              <div className="flex-grow h-[1px] bg-border w-full"></div>
            </div>
            
            <div className="flex flex-col justify-between flex-grow">
              {topStories.map((story) => (
                <NewsCard key={story.id} article={story} variant="top-story" />
              ))}
            </div>
          </div>

          {/* RIGHT - EDITOR'S PICKS & NEWSLETTER (approx 18%) */}
          <div className="w-full lg:w-[18%] xl:w-[18%] flex flex-col justify-between gap-6">
            <div className="bg-[#111111] p-4 sm:p-5">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-white mb-1 border-b border-[#333] pb-3">
                Editor's Picks
              </h2>
              <div className="flex flex-col">
                {editorPicks.map((story, idx) => (
                  <NewsCard key={story.id} article={story} variant="editor-pick" number={idx + 1} />
                ))}
              </div>
            </div>
            
            <NewsletterCard />
          </div>

        </div>
      </div>
    </section>
  );
}
