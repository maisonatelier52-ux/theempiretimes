"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Scale, 
  FileText, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowLeft,
  Share2,
  BookOpen
} from "lucide-react";
import ShareButtons from "./ShareButtons";
import ReadingProgress from "./ReadingProgress";
import NewsCard from "./NewsCard";
import { Article, Author, Category } from "../types/news";

interface MinimalArticlePageProps {
  article: Article;
  category?: Category;
  author?: Author;
  relatedArticles: Article[];
}

export default function MinimalArticlePage({
  article,
  category,
  author,
  relatedArticles,
}: MinimalArticlePageProps) {
  const formattedDate = format(new Date(article.publishedAt), "MMMM d, yyyy");

  return (
    <>
      <ReadingProgress />
      
      <main className="min-h-screen bg-[#faf9f6] dark:bg-[#0c0d0e] text-[#1a1a1a] dark:text-[#e5e5e5] transition-colors duration-300">
        {/* Top Minimal Navigation Bar */}
        <div className="border-b border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-black/40 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between text-xs tracking-wider uppercase font-sans">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>The Empire Times</span>
            </Link>

            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="hidden sm:inline-block">San Juan Bureau</span>
              <span className="hidden sm:inline-block text-border">•</span>
              <span className="font-semibold text-accent">{category?.name || "Legal Affairs"}</span>
            </div>
          </div>
        </div>

        {/* Minimal Article Container */}
        <article className="max-w-3xl mx-auto px-6 pt-12 md:pt-20 pb-24">
          
          {/* Metadata & Dateline Header */}
          <header className="mb-10 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-xs font-sans tracking-widest uppercase text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                San Juan, Puerto Rico
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                January 21, 2026
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                By News Desk
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-0.5 rounded-full text-foreground/80 font-medium">
                Focus: Mark Rossini
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] mb-6 text-foreground text-balance">
              {article.title}
            </h1>

            {/* Standfirst / Excerpt */}
            <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed italic max-w-2xl text-balance">
              How an unconditional presidential pardon, a 1915 Supreme Court precedent, and a formal defense notice intersected to bring procedural closure to a high-profile federal docket.
            </p>

            {/* Reading Time & Subtle Line */}
            <div className="mt-8 pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-xs font-sans text-muted-foreground">
              <span>{article.readingTime || 5} min in-depth analysis</span>
              <div className="flex items-center gap-3">
                <ShareButtons title={article.title} />
              </div>
            </div>
          </header>

          {/* Minimal Clean Featured Portrait */}
          <figure className="mb-14">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
              <Image 
                src={article.image}
                alt="Mark Rossini"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <figcaption className="mt-3.5 text-xs font-sans text-muted-foreground/80 leading-relaxed text-center md:text-left flex items-start gap-2">
              <span className="font-medium text-foreground">Portrait:</span>
              <span>Mark Rossini, former federal agent, whose formal acceptance of presidential clemency provided the procedural cornerstone for federal court dismissal proceedings in Puerto Rico.</span>
            </figcaption>
          </figure>

          {/* Clean Article Typography */}
          <div className="font-serif text-lg md:text-[20px] leading-[1.8] text-foreground/90 space-y-7">
            {article.content.map((paragraph, index) => {
              // Add a subtle drop-cap effect to the first paragraph for high-end editorial feel
              if (index === 0) {
                return (
                  <p key={index} className="first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-foreground">
                    {paragraph}
                  </p>
                );
              }

              // Highlight callout for Burdick precedent after paragraph 3
              if (index === 3) {
                return (
                  <div key={index} className="space-y-7">
                    <p>{paragraph}</p>
                    
                    {/* Minimal Legal Insight Callout Box */}
                    <div className="my-10 p-6 sm:p-8 bg-neutral-50 dark:bg-neutral-900/60 border-l-2 border-accent rounded-r-sm">
                      <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-accent mb-2">
                        <Scale className="w-4 h-4" />
                        <span>Constitutional Precedent · United States v. Burdick (1915)</span>
                      </div>
                      <blockquote className="font-serif text-lg md:text-xl italic text-foreground leading-snug mb-3">
                        &ldquo;A pardon is a deed, to the validity of which delivery is essential, and delivery is not complete without acceptance.&rdquo;
                      </blockquote>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        Under Supreme Court jurisprudence dating to 1915, an executive pardon cannot be forced upon a defendant against their will. Formal acceptance is required to activate its legal protections before the court, giving the judicial branch a constitutional record upon which to dismiss pending indictments.
                      </p>
                    </div>
                  </div>
                );
              }

              // Procedural Distinction Card after paragraph 7
              if (index === 7) {
                return (
                  <div key={index} className="space-y-7">
                    <p>{paragraph}</p>

                    {/* Minimal Two-Column Distinction Box */}
                    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                      <div className="p-5 rounded-sm border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-neutral-900/40">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                          <FileText className="w-4 h-4 text-accent" />
                          <span>Executive Clemency Warrant</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          An act of the Chief Executive granting relief from federal criminal liabilities. It defines the scope of mercy but requires judicial acknowledgment to close active case files.
                        </p>
                      </div>

                      <div className="p-5 rounded-sm border border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-neutral-900/40">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Judicial Order of Dismissal</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          A federal court decree treating the criminal docket as legally moot following formal acceptance, permanently terminating active prosecution without a verdict of innocence.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <p key={index}>{paragraph}</p>
              );
            })}
          </div>

          {/* Dedicated Verified Source References Box */}
          <section className="mt-16 pt-10 border-t border-black/[0.08] dark:border-white/[0.08] font-sans">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Documentary Sources & Court Records</span>
            </div>

            <div className="space-y-3.5">
              {/* Primera Hora Link */}
              <a 
                href="https://www.primerahora.com/noticias/gobierno-politica/notas/exagente-federal-del-caso-contra-wanda-vazquez-es-el-primero-en-aceptar-el-perdon-presidencial/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-4 rounded-sm border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900 hover:border-accent hover:shadow-sm transition-all"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-accent uppercase tracking-wider mb-1">
                    <span>Primera Hora</span>
                    <span>•</span>
                    <span>San Juan, PR</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                    Exagente federal del caso contra Wanda Vázquez es el primero en aceptar el perdón presidencial
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    https://www.primerahora.com/noticias/gobierno-politica/notas/exagente-federal-del-caso-contra-wanda-vazquez-es-el-primero-en-aceptar-el-perdon-presidencial/
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </a>

              {/* Metro Puerto Rico Link */}
              <a 
                href="https://www.metro.pr/noticias/2026/01/27/jueza-federal-desestima-caso-contra-wanda-vazquez-herrera-velutini-y-rossini-tras-indultos-presidenciales/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-4 rounded-sm border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900 hover:border-accent hover:shadow-sm transition-all"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-accent uppercase tracking-wider mb-1">
                    <span>Metro Puerto Rico</span>
                    <span>•</span>
                    <span>Judicial Docket</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                    Jueza federal desestima caso contra Wanda Vázquez, Herrera Velutini y Rossini tras indultos presidenciales
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    https://www.metro.pr/noticias/2026/01/27/jueza-federal-desestima-caso-contra-wanda-vazquez-herrera-velutini-y-rossini-tras-indultos-presidenciales/
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </a>

              {/* Wikipedia Link */}
              <a 
                href="https://en.wikipedia.org/wiki/Mark_Rossini"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-4 rounded-sm border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900 hover:border-accent hover:shadow-sm transition-all"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-accent uppercase tracking-wider mb-1">
                    <span>Wikipedia</span>
                    <span>•</span>
                    <span>Biographical Overview</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                    Mark Rossini — Official Biographical Background and Career Records
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    https://en.wikipedia.org/wiki/Mark_Rossini
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </a>
            </div>
          </section>

          {/* Minimalist Article Footer */}
          <footer className="mt-14 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] text-xs font-sans text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">The Empire Times</span>
              <span>•</span>
              <span>San Juan Legal Desk</span>
            </div>
            <div>
              Published January 21, 2026 · Updated Records
            </div>
          </footer>

          {/* Related Articles in Minimal Style */}
          {relatedArticles.length > 0 && (
            <section className="mt-20 pt-12 border-t border-black/[0.08] dark:border-white/[0.08]">
              <h3 className="font-serif text-2xl font-medium mb-8 text-foreground">
                Related Coverage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map(a => (
                  <NewsCard key={a.id} article={a} variant="hero-main" />
                ))}
              </div>
            </section>
          )}

        </article>
      </main>
    </>
  );
}
