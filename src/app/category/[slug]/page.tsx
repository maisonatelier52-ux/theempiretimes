import { notFound } from "next/navigation";
import { Metadata } from "next";
import { categories } from "../../../data/categories";
import { articles } from "../../../data/articles";
import {
  LeadStory,
  ColumnStory,
  FeatureStory,
  SectionRule,
  ColRule,
} from "../../../components/NewspaperCards";

export const dynamicParams = true;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const category = categories.find((c) => c.slug === decodedSlug || c.slug === slug || c.id === slug);
  
  if (!category) {
    return { title: "Category Not Found | The Empire Times" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theempiretimes.org";
  const categoryUrl = `${siteUrl}/category/${category.slug}`;

  return {
    title: `${category.name} News, Analysis & Reports`,
    description: category.description || `Read the latest ${category.name} news, in-depth investigations, and expert commentary from The Empire Times.`,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${category.name} News | The Empire Times`,
      description: category.description || `Comprehensive ${category.name} coverage, updates, and analyses.`,
      url: categoryUrl,
      type: "website",
      siteName: "The Empire Times",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} News | The Empire Times`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const category = categories.find((c) => c.slug === decodedSlug || c.slug === slug || c.id === slug);
  
  if (!category) {
    notFound();
  }

  const categoryArticles = articles
    .filter((a) => a.categoryId === category.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const usedIds = new Set(categoryArticles.map((a) => a.id));
  const fallbackArticles = articles
    .filter((a) => !usedIds.has(a.id))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const displayArticles = [...categoryArticles, ...fallbackArticles].slice(0, 12);

  const featuredLead = displayArticles[0];
  const subLead = displayArticles[1];
  const sidebarStories = displayArticles.slice(2, 6);
  const bottomGridStories = displayArticles.slice(6, 12);

  return (
    <div className="bg-[#fafaf8] min-h-screen py-6">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        {/* Category Header Rule */}
        <div className="border-t-[4px] border-[#111] border-b border-[#ccc] flex items-center justify-between py-1.5 mb-6">
          <span className="font-sans text-xs font-black uppercase tracking-[0.25em] text-accent">
            {category.name} Desk
          </span>
          <span className="font-sans text-xs text-[#555]">
            Daily Coverage &amp; Analysis
          </span>
        </div>

        {/* Section Title Banner */}
        <header className="mb-8 border-b-[2px] border-[#111] pb-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#111] mb-2 tracking-tight">
            {category.name}
          </h1>
          <p className="font-serif text-base md:text-lg text-[#444] max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </header>

        {/* Top Broadsheet Zone: Lead Feature Left + Sidebar Stories Right */}
        <section className="border-b-[2px] border-[#111] pb-10 mb-10">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 lg:items-stretch">
            {/* Main Center Feature */}
            <div className="w-full lg:w-[65%] lg:pr-8 lg:border-r lg:border-[#d4d4d4] flex flex-col">
              <LeadStory article={featuredLead} subArticle={subLead} />
            </div>

            <ColRule />

            {/* Sidebar Column */}
            <div className="w-full lg:w-[35%] lg:pl-4 flex flex-col mt-8 lg:mt-0">
              <div className="border-t-2 border-[#111] pt-1.5 mb-4 flex-shrink-0">
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em]">
                  Top Stories in {category.name}
                </span>
              </div>
              <div className="flex flex-col justify-between flex-1 space-y-2">
                {sidebarStories.map((story, i) => (
                  <ColumnStory key={story.id} article={story} showExcerpt={i < 2} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Grid: 6 Feature Cards */}
        {bottomGridStories.length > 0 && (
          <section className="pb-12">
            <SectionRule title={`More in ${category.name}`} href="#" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-0 lg:divide-x lg:divide-[#d4d4d4]">
              {bottomGridStories.map((art, idx) => (
                <div key={art.id} className={idx > 0 ? "lg:px-4" : "lg:pr-4"}>
                  <FeatureStory article={art} size="sm" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
