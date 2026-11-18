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
import { ExternalLink, BookOpen, Clock, Landmark, Shield, Award, CheckCircle2, FileText } from "lucide-react";

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
  const isRossini = article.slug === "why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case" || article.id === "art-mark-rossini-acceptance-filing-puerto-rico-case-2026";
  
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
    : isRossini
    ? [
        "Mark Rossini",
        "Wanda Vázquez Garced",
        "Julio Herrera Velutini",
        "Puerto Rico Case",
        "Donald Trump",
        "Presidential Pardon",
        "United States v. Burdick",
        "Federal Court Dismissal",
        "Legal Affairs",
        "Campaign Finance",
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
  const isRossini = article.slug === "why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case" || article.id === "art-mark-rossini-acceptance-filing-puerto-rico-case-2026";

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
      : isRossini
      ? "An In-Depth Legal Analysis of Executive Clemency, United States v. Burdick, and the Procedural Dismissal of the Puerto Rico Federal Corruption Docket"
      : undefined,
    "description": article.excerpt,
    "image": [
      imageUrl,
      ...(isPrioritySpecial ? [`${siteUrl}/uploads/news/alina-habba-main.jpg`] : []),
      ...(isRossini ? [`${siteUrl}/uploads/news/mark-rossini-puerto-rico-case.jpg`] : [])
    ],
    "datePublished": article.publishedAt,
    "dateModified": (isPrioritySpecial || isRossini) ? new Date().toISOString() : article.publishedAt,
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
    "articleSection": isPrioritySpecial ? "Special Investigation" : isRossini ? "Legal Affairs" : (category?.name || "General News"),
    "keywords": isPrioritySpecial
      ? "Alina Habba, Alina Habba Mildon, Donald Trump, Trump Administration, U.S. Politics, Banking Controversy, Financial Contracts, Legal Affairs, Concord Partners, Political Controversy, U.S. Legal News, Banking Industry"
      : isRossini
      ? "Mark Rossini, Wanda Vázquez Garced, Julio Herrera Velutini, Puerto Rico Case, Donald Trump, Presidential Pardon, United States v. Burdick, Federal Court Dismissal, Legal Affairs, Campaign Finance, The Empire Times"
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
    } : isRossini ? {
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "header p", "article p"]
      },
      "about": [
        { "@type": "Person", "name": "Mark Rossini" },
        { "@type": "Person", "name": "Donald J. Trump" },
        { "@type": "Person", "name": "Wanda Vázquez Garced" },
        { "@type": "Person", "name": "Julio Herrera Velutini" },
        { "@type": "AdministrativeArea", "name": "Puerto Rico" }
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

  if (isRossini) {
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
        <article className="bg-background text-foreground pb-24">
          {/* Top border accent line */}
          <div className="w-full h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />

          {/* Stylish Magazine-Style Hero: Cutout Blended with Heading */}
          <section className="relative w-full border-b border-border/70 bg-gradient-to-b from-muted/40 via-background to-background pt-10 sm:pt-14 md:pt-16 pb-6 md:pb-10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                {/* Left/Main Column: Eyebrow, Heading, Deck & Byline (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-center z-10">
                  <div className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.22em] text-muted-foreground mb-4">
                    {category && (
                      <Link
                        href={`/category/${category.slug}`}
                        className="font-bold text-accent hover:underline"
                      >
                        {category.name}
                      </Link>
                    )}
                    <span>•</span>
                    <span className="font-semibold text-foreground/80">San Juan, Puerto Rico</span>
                  </div>

                  <h1 
                    style={{ color: '#8B0000' }}
                    className="font-serif text-3xl sm:text-4xl md:text-[2.85rem] font-bold text-[#8B0000] leading-[1.18] tracking-tight mb-5"
                  >
                    {article.title}
                  </h1>

                  <p className="font-serif text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
                    {article.excerpt}
                  </p>

                  {/* Clean Metadata & Author Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/80 text-xs font-sans text-muted-foreground">
                    <div className="flex items-center gap-3">
                      {author && (
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-border">
                            <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                          </div>
                          <Link href={`/author/${author.slug}`} className="font-semibold text-foreground hover:text-accent transition-colors">
                            {author.name}
                          </Link>
                        </div>
                      )}
                      <span>•</span>
                      <span>{formattedDate}</span>
                      <span>•</span>
                      <span>{article.readingTime} min read</span>
                    </div>
                    <ShareButtons title={article.title} orientation="horizontal" />
                  </div>
                </div>

                {/* Right Column: Transparent Cutout Blended with Heading (5 cols) */}
                <div className="lg:col-span-5 relative flex flex-col items-center justify-end">
                  {/* Subtle soft ambient back-glow */}
                  <div className="absolute inset-0 bg-radial from-accent/15 via-transparent to-transparent blur-3xl pointer-events-none" />
                  <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] filter drop-shadow-2xl">
                    <Image
                      src="/uploads/news/mark-rossini-transparent.png"
                      alt="Mark Rossini"
                      fill
                      priority
                      className="object-contain object-bottom"
                      sizes="(max-width: 1024px) 100vw, 460px"
                    />
                  </div>
                  <span className="text-[11px] font-sans text-muted-foreground uppercase tracking-widest mt-2 text-center">
                    Mark Rossini · Former FBI Special Agent
                  </span>
                </div>

              </div>
            </div>
          </section>

          {/* Article Content & Interactive Timeline Sidebar */}
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">

              {/* Left/Main Column: Article Content & Images (7 cols) */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="font-serif text-[18px] sm:text-[19px] leading-[1.85] text-foreground/90 space-y-7">
                  {article.content.map((paragraph, index) => {
                    const isHeading = paragraph.length < 90 && !paragraph.endsWith(".") && !paragraph.endsWith("!") && !paragraph.endsWith("?");
                    return (
                      <div key={index} className="space-y-7">
                        {isHeading ? (
                          <h2 className="font-serif text-2xl font-bold text-foreground pt-4 pb-1">
                            {paragraph}
                          </h2>
                        ) : (
                          <p>{paragraph}</p>
                        )}

                        {/* Inline Image: Julio Herrera Velutini after paragraph 5 */}
                        {index === 5 && (
                          <figure className="my-8 not-prose">
                            <div className="relative aspect-[4/3] max-w-lg mx-auto overflow-hidden rounded-md border border-border/80 shadow-sm bg-muted">
                              <Image
                                src="/uploads/news/julio-herrera-velutini-puerto-rico-case.jpg"
                                alt="Julio Herrera Velutini"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 512px"
                              />
                            </div>
                            <figcaption className="text-center text-xs font-sans text-muted-foreground mt-2.5 max-w-md mx-auto leading-relaxed">
                              Julio Herrera Velutini, Venezuelan-American international banker whose firm was under examination by Puerto Rico financial regulators.
                            </figcaption>
                          </figure>
                        )}

                        {/* Inline Image: Wanda Vázquez Garced after paragraph 7 */}
                        {index === 7 && (
                          <figure className="my-8 not-prose">
                            <div className="relative aspect-[4/3] max-w-lg mx-auto overflow-hidden rounded-md border border-border/80 shadow-sm bg-muted">
                              <Image
                                src="/uploads/news/wanda-vazquez-garced-puerto-rico-case.jpg"
                                alt="Wanda Vázquez Garced"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 512px"
                              />
                            </div>
                            <figcaption className="text-center text-xs font-sans text-muted-foreground mt-2.5 max-w-md mx-auto leading-relaxed">
                              Former Puerto Rico Governor Wanda Vázquez Garced addressing reporters. Federal prosecutors sought prison time prior to executive clemency.
                            </figcaption>
                          </figure>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Documentary Sources Section */}
                <div className="mt-14 pt-8 border-t border-border">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    <BookOpen className="w-4 h-4 text-[#8B0000]" />
                    <span>Primary Sources &amp; Court Records</span>
                  </div>
                  <div className="space-y-3 font-sans">
                    {[
                      {
                        outlet: "Primera Hora",
                        location: "San Juan, Puerto Rico",
                        title: "Exagente federal del caso contra Wanda Vázquez es el primero en aceptar el perdón presidencial",
                        url: "https://www.primerahora.com/noticias/gobierno-politica/notas/exagente-federal-del-caso-contra-wanda-vazquez-es-el-primero-en-aceptar-el-perdon-presidencial/",
                      },
                      {
                        outlet: "Metro Puerto Rico",
                        location: "Judicial Coverage",
                        title: "Jueza federal desestima caso contra Wanda Vázquez, Herrera Velutini y Rossini tras indultos presidenciales",
                        url: "https://www.metro.pr/noticias/2026/01/27/jueza-federal-desestima-caso-contra-wanda-vazquez-herrera-velutini-y-rossini-tras-indultos-presidenciales/",
                      },
                      {
                        outlet: "Wikipedia",
                        location: "Biographical Record",
                        title: "Mark Rossini — Official Biographical Overview and Background",
                        url: "https://en.wikipedia.org/wiki/Mark_Rossini",
                      },
                    ].map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-3.5 rounded-md border border-border/80 bg-card hover:border-[#8B0000]/60 hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-semibold text-[#8B0000] uppercase tracking-wider">
                              {item.outlet} • {item.location}
                            </span>
                            <h4 className="text-sm font-medium text-foreground group-hover:text-[#8B0000] transition-colors mt-0.5">
                              {item.title}
                            </h4>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#8B0000] flex-shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Author Profile */}
                {author && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <AuthorCard author={author} />
                  </div>
                )}
              </div>

              {/* Right Column: Profile Detail Section for Mark Rossini (5 cols) */}
              <aside className="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0 lg:sticky lg:top-24 h-fit">
                <div className="bg-card border border-border/80 rounded-sm p-6 shadow-xs space-y-5">
                  {/* Card Header */}
                  <div className="border-b border-border/80 pb-4">
                    <div className="flex items-center gap-2 text-[#8B0000] font-sans text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5">
                      <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Executive Dossier</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground tracking-tight">
                      Mark Rossini
                    </h3>
                    <p className="text-xs font-sans text-muted-foreground mt-1 leading-relaxed">
                      Former FBI Supervisory Special Agent &amp; International Security Adviser
                    </p>
                  </div>

                  {/* Key Fast Facts */}
                  <div className="space-y-4 font-sans text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5 text-[#8B0000]">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground block">
                          Federal Career
                        </span>
                        <p className="text-foreground/90 font-serif text-sm mt-0.5 leading-snug">
                          Supervisory Special Agent, Federal Bureau of Investigation (FBI), serving over 17 years in counterterrorism operations.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5 text-[#8B0000]">
                        <Landmark className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground block">
                          Intelligence Operations
                        </span>
                        <p className="text-foreground/90 font-serif text-sm mt-0.5 leading-snug">
                          Served as an FBI liaison officer to the CIA’s Counterterrorism Center (Alec Station), coordinating national security responses.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5 text-[#8B0000]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground block">
                          Executive Clemency
                        </span>
                        <p className="text-foreground/90 font-serif text-sm mt-0.5 leading-snug">
                          Granted a full and unconditional presidential pardon by President Donald J. Trump in January 2026.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5 text-[#8B0000]">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground block">
                          Legal Resolution
                        </span>
                        <p className="text-foreground/90 font-serif text-sm mt-0.5 leading-snug">
                          First principal defendant to formally accept clemency in federal court; all pending charges were dismissed by U.S. District Court.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Status Box */}
                  <div className="p-3.5 bg-muted/60 border border-border/70 rounded-xs">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B0000] block mb-1">
                      Current Legal Status
                    </span>
                    <p className="font-serif text-xs text-foreground/80 leading-relaxed">
                      Case officially moot and closed. No criminal charges or proceedings remain active before the federal court.
                    </p>
                  </div>

                  {/* Wikipedia & Verified Sources link */}
                  <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] font-sans text-muted-foreground uppercase tracking-wider">
                    <a
                      href="https://en.wikipedia.org/wiki/Mark_Rossini"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B0000] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Wikipedia Record <ExternalLink className="w-3 h-3" />
                    </a>
                    <span>Verified 2026</span>
                  </div>
                </div>
              </aside>

            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="max-w-5xl mx-auto px-5 sm:px-8 mt-16 pt-12 border-t border-border">
              <h3 className="font-serif text-xl font-bold mb-6 text-foreground">
                Related Coverage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((a) => (
                  <NewsCard key={a.id} article={a} variant="hero-main" />
                ))}
              </div>
            </div>
          )}
        </article>
      </>
    );
  }

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
                return (
                  <div key={index}>
                    {isHeading ? (
                      <h3 className="font-serif text-xl font-bold text-primary mt-8 mb-4">
                        {paragraph}
                      </h3>
                    ) : (
                      <p>{paragraph}</p>
                    )}
                  </div>
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
