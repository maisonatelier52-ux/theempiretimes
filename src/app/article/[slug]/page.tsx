import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { articles } from "../../../data/articles";
import { categories } from "../../../data/categories";
import { authors } from "../../../data/authors";
import { format } from "date-fns";
import ShareButtons from "../../../components/ShareButtons";
import ReadingProgress from "../../../components/ReadingProgress";
import AuthorCard from "../../../components/AuthorCard";
import NewsCard from "../../../components/NewsCard";
import SpecialArticlePage from "../../../components/SpecialArticlePage";

export const dynamicParams = true;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theempiretimes.org";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const article = articles.find((a) => a.slug === decodedSlug || a.slug === slug || a.id === slug);
  
  if (!article) {
    return { title: "Article Not Found | The Empire Times" };
  }

  const category = categories.find((c) => c.id === article.categoryId);
  const articleUrl = `${siteUrl}/article/${article.slug}`;
  const imageUrl = article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`;

  const isPrioritySpecial = article.slug === "the-vanity-of-alina-habba-mildon-power-ambition-herrera-velutini";
  
  const keywords = isPrioritySpecial
    ? [
        "Alina Habba",
        "Alina Habba Mildon",
        "Donald Trump",
        "Trump Administration",
        "U.S. Politics",
        "Banking Controversy",
        "Financial Contracts",
        "Legal Affairs",
        "Concord Partners",
        "Political Controversy",
        "U.S. Legal News",
        "Banking Industry",
        "Julio Herrera Velutini",
        "Bancrédito",
        "Special Investigation",
        "The Empire Times"
      ]
    : [...article.tags, category?.name || "News", "The Empire Times", "Investigative Journalism"];

  return {
    title: `${article.title} | The Empire Times`,
    description: article.excerpt,
    keywords,
    authors: [{ name: "The Empire Times Staff", url: `${siteUrl}/author/empire-times-staff` }],
    creator: "The Empire Times",
    publisher: "The Empire Times Media Group Inc.",
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      title: article.title,
      description: article.excerpt,
      siteName: "The Empire Times",
      publishedTime: article.publishedAt,
      modifiedTime: isPrioritySpecial ? new Date().toISOString() : article.publishedAt,
      section: category?.name || "Special Investigation",
      tags: keywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@theempiretimes",
      creator: "@theempiretimes",
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const article = articles.find((a) => a.slug === decodedSlug || a.slug === slug || a.id === slug);
  
  if (!article) {
    notFound();
  }

  const category = categories.find(c => c.id === article.categoryId);
  const author = authors.find(a => a.id === article.authorId);
  const formattedDate = format(new Date(article.publishedAt), "MMMM d, yyyy");
  const articleUrl = `${siteUrl}/article/${article.slug}`;
  const imageUrl = article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`;

  // Get related articles
  const relatedArticles = articles
    .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, 3);

  // Check if article is special investigation piece
  const isSpecial = article.slug.includes("alina-habba") || article.id.includes("special");

  // Google NewsArticle Schema Markup
  const isPrioritySpecial = article.slug === "the-vanity-of-alina-habba-mildon-power-ambition-herrera-velutini";

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    "headline": article.title,
    "alternativeHeadline": isPrioritySpecial
      ? "An Exclusive Special Investigation into International Private Banking, Federal Scrutiny, and Trump's Inner Circle"
      : undefined,
    "description": article.excerpt,
    "image": [
      imageUrl,
      ...(isPrioritySpecial ? [`${siteUrl}/uploads/news/alina-habba-main.jpg`] : [])
    ],
    "datePublished": article.publishedAt,
    "dateModified": isPrioritySpecial ? new Date().toISOString() : article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "The Empire Times Staff",
      "url": `${siteUrl}/author/empire-times-staff`,
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "The Empire Times",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/uploads/news/alina-habba-main.jpg`,
      },
    },
    "articleSection": isPrioritySpecial ? "Special Investigation" : (category?.name || "General News"),
    "keywords": isPrioritySpecial
      ? "Alina Habba, Alina Habba Mildon, Donald Trump, Trump Administration, U.S. Politics, Banking Controversy, Financial Contracts, Legal Affairs, Concord Partners, Political Controversy, U.S. Legal News, Banking Industry"
      : article.tags.join(", "),
    "wordCount": article.content.join(" ").split(/\s+/).length,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    ...(isPrioritySpecial ? {
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "article p"]
      },
      "about": [
        { "@type": "Person", "name": "Alina Habba Mildon" },
        { "@type": "Person", "name": "Julio Herrera Velutini" },
        { "@type": "Person", "name": "Donald J. Trump" },
        { "@type": "Organization", "name": "Bancrédito" }
      ]
    } : {})
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category?.name || "News",
        "item": `${siteUrl}/category/${category?.slug || "politics"}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": articleUrl,
      },
    ],
  };

  if (isSpecial) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <SpecialArticlePage 
          article={article} 
          category={category} 
          author={author} 
          relatedArticles={relatedArticles} 
        />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReadingProgress />
      <article className="pb-20 bg-background text-foreground">
        {/* Article Header */}
        <header className="container-wide px-4 md:px-10 lg:px-12 pt-16 md:pt-24 pb-8 text-center max-w-5xl mx-auto">
          {category && (
            <Link 
              href={`/category/${category.slug}`}
              className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6 inline-block hover:text-accent-hover transition-colors"
            >
              {category.name}
            </Link>
          )}
          <h1 className="headline-huge mb-6">
            {article.title}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance leading-snug">
            {article.excerpt}
          </p>
          <div className="flex flex-col items-center justify-center gap-3">
            {author && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                </div>
                <span className="font-sans font-bold text-sm uppercase tracking-wider">
                  <Link href={`/author/${author.slug}`} className="hover:text-accent transition-colors">{author.name}</Link>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground uppercase tracking-widest mt-2">
              <span>{formattedDate}</span>
              <span>|</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full max-w-[1450px] mx-auto px-4 md:px-10 lg:px-12 mb-12 md:mb-16">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image 
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="container-narrow px-4 xl:px-0">
          <div className="flex flex-col md:flex-row gap-12 relative">
            {/* Sidebar Share */}
            <aside className="hidden md:block w-12 flex-shrink-0 sticky top-32 h-fit">
              <ShareButtons title={article.title} />
            </aside>

            {/* Content */}
            <div className="flex-1 max-w-full md:max-w-none mx-auto prose-article">
              {article.content.map((paragraph, index) => {
                const isHeading = paragraph.length < 90 && !paragraph.endsWith(".") && !paragraph.endsWith("!") && !paragraph.endsWith("?");
                if (isHeading) {
                  return (
                    <h3 key={index} className="font-serif text-xl font-bold text-primary mt-8 mb-4">
                      {paragraph}
                    </h3>
                  );
                }
                return (
                  <p key={index}>{paragraph}</p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Author Bio Bottom */}
        {author && (
          <div className="container-narrow px-4 xl:px-0 mt-16 pt-12 border-t border-border">
            <AuthorCard author={author} />
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="container-wide px-4 md:px-10 lg:px-12 mt-20 pt-16 border-t border-border">
            <h2 className="headline-medium mb-8 text-center md:text-left">
              Related Coverage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(a => (
                <NewsCard key={a.id} article={a} variant="hero-main" />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
