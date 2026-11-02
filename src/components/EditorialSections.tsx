import { Article } from "../types/news";
import NewsCard from "./NewsCard";

interface EditorialSectionsProps {
  articles: Article[];
}

export function WorldSection({ articles }: { articles: Article[] }) {
  if (articles.length < 3) return null;
  const main = articles[0];
  const subFeatures = articles.slice(1, 3);
  const sideStories = articles.slice(3, 9).length >= 6 ? articles.slice(3, 9) : articles.slice(1, 7);

  return (
    <section className="py-8 md:py-10 border-b border-border">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <SectionHeader title="World" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <NewsCard article={main} variant="hero-main" />
            {subFeatures.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-border">
                {subFeatures.map((story) => (
                  <NewsCard key={story.id} article={story} variant="compact" />
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sideStories.map((story, idx) => (
              <NewsCard key={`${story.id}-world-side-${idx}`} article={story} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechnologySection({ articles }: { articles: Article[] }) {
  if (articles.length < 2) return null;
  const main = articles[0];
  const others = articles.slice(1, 5);

  return (
    <section className="py-8 md:py-10 border-b border-border bg-[#F9FAFB]">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <SectionHeader title="Technology" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <NewsCard article={main} variant="hero-main" />
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {others.map((story) => (
              <NewsCard key={story.id} article={story} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  const displayArticles = articles.slice(0, 4);

  return (
    <section className="py-8 md:py-10 border-b border-border">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <SectionHeader title="Business" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayArticles.map((story) => (
            <NewsCard key={story.id} article={story} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DualSection({ title1, articles1, title2, articles2 }: { title1: string, articles1: Article[], title2: string, articles2: Article[] }) {
  if (!articles1?.length && !articles2?.length) return null;
  return (
    <section className="py-8 md:py-10 border-b border-border">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {articles1?.length > 0 && (
            <div className="w-full lg:w-1/2">
              <SectionHeader title={title1} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles1.slice(0, 4).map((story) => (
                  <NewsCard key={story.id} article={story} variant="compact" />
                ))}
              </div>
            </div>
          )}
          {articles2?.length > 0 && (
            <div className="w-full lg:w-1/2">
              <SectionHeader title={title2} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles2.slice(0, 4).map((story) => (
                  <NewsCard key={story.id} article={story} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center mb-6">
      <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.1em] text-primary">
        {title}
      </h2>
      <div className="ml-4 h-[2px] bg-accent w-12"></div>
    </div>
  );
}
