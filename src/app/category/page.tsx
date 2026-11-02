import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categories } from "../../data/categories";
import { articles } from "../../data/articles";
import { SectionRule } from "../../components/NewspaperCards";

export const metadata: Metadata = {
  title: "Categories & Topics | The Empire Times",
  description: "Browse essential news coverage by topic: U.S., World, Politics, Business, Tech, Culture, Science, Sports, and Health.",
};

export default function AllCategoriesPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="bg-[#fafaf8] min-h-screen py-8">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        {/* Top Header Rule */}
        <div className="border-t-[4px] border-[#111] border-b border-[#ccc] flex items-center justify-between py-2 mb-8">
          <span className="font-sans text-xs font-black uppercase tracking-[0.25em] text-[#111]">
            Topic Directories
          </span>
          <span className="font-sans text-xs text-[#555]">
            All 9 Editorial Sections
          </span>
        </div>

        {/* Page Title */}
        <header className="mb-10 border-b-[2px] border-[#111] pb-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#111] mb-3 tracking-tight">
            News Categories
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#444] max-w-3xl leading-relaxed">
            Explore dedicated reporting across politics, global affairs, technology, economy, culture, science, sports, and health.
          </p>
        </header>

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-[#d4d4d4] pb-6">
          {categories.map((cat) => {
            const count = articles.filter((a) => a.categoryId === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="font-sans text-xs font-bold uppercase tracking-wider px-4 py-2 bg-white border border-[#d4d4d4] text-[#111] hover:bg-[#111] hover:text-white transition-all flex items-center gap-2"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </Link>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 pb-16">
          {categories.map((cat) => {
            const catArticles = sorted.filter((a) => a.categoryId === cat.id);
            const leadArticle = catArticles[0] || sorted[0];
            const secondaryArticles = catArticles.slice(1, 4);

            return (
              <div key={cat.id} className="flex flex-col border-t-2 border-[#111] pt-3">
                <SectionRule title={cat.name} href={`/category/${cat.slug}`} />
                <p className="font-serif text-xs text-[#555] mb-4 min-h-[36px] line-clamp-2">
                  {cat.description}
                </p>

                {/* Lead Article in Category */}
                {leadArticle && (
                  <Link href={`/article/${leadArticle.slug}`} className="block group mb-4">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8e8e8] mb-2.5">
                      <Image
                        src={leadArticle.image}
                        alt={leadArticle.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-snug text-[#111] group-hover:text-accent transition-colors line-clamp-2 mb-1">
                      {leadArticle.title}
                    </h3>
                    <p className="font-serif text-xs text-[#444] line-clamp-2 mb-1.5">
                      {leadArticle.excerpt}
                    </p>
                  </Link>
                )}

                {/* Secondary Headlines */}
                <div className="mt-auto border-t border-[#ddd] pt-3 space-y-3">
                  {secondaryArticles.map((art) => (
                    <Link
                      key={art.id}
                      href={`/article/${art.slug}`}
                      className="block group border-b border-[#eee] last:border-b-0 pb-2"
                    >
                      <h4 className="font-serif text-sm font-bold leading-tight text-[#111] group-hover:text-accent transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                    </Link>
                  ))}

                  <Link
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-1 font-sans text-xs font-black uppercase tracking-widest text-accent hover:underline pt-2"
                  >
                    View All {cat.name} News &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
