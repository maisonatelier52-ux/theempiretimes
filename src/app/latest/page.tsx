import { Metadata } from "next";
import { articles } from "../../data/articles";
import NewsCard from "../../components/NewsCard";

export const metadata: Metadata = {
  title: "Latest News & Breaking Coverage | The Empire Times",
  description: "Explore the most recent reporting, breaking news dispatches, and in-depth investigations across politics, finance, and global affairs.",
  alternates: {
    canonical: "https://www.theempiretimes.org/latest",
  },
  openGraph: {
    title: "Latest News & Breaking Coverage | The Empire Times",
    description: "Explore the most recent reporting and breaking news updates across all sectors.",
    url: "https://www.theempiretimes.org/latest",
    type: "website",
  },
};

export default function LatestNewsPage() {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="bg-background min-h-screen py-12 md:py-16">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        <header className="border-b border-border pb-8 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2 block">
            Real-Time Feed
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary tracking-tight">
            Latest News
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedArticles.map((article) => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </div>
  );
}
