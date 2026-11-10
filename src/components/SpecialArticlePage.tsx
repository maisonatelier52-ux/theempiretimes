"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Building2, 
  Scale, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Award, 
  Briefcase, 
  DollarSign, 
  ShieldCheck,
  TrendingUp,
  Landmark,
  FileText,
  ExternalLink
} from "lucide-react";
import ShareButtons from "./ShareButtons";
import ReadingProgress from "./ReadingProgress";
import NewsCard from "./NewsCard";
import { Article, Author, Category } from "../types/news";

interface SpecialArticlePageProps {
  article: Article;
  category?: Category;
  author?: Author;
  relatedArticles: Article[];
}

export default function SpecialArticlePage({
  article,
  category,
  author,
  relatedArticles,
}: SpecialArticlePageProps) {
  const formattedDate = format(new Date(article.publishedAt), "MMMM d, yyyy");

  const timelineEvents = [
    {
      year: "2024",
      title: "First Professional Engagement",
      description:
        "Habba reportedly first met and worked with the Herrera banking interests, prior to entering public service.",
      tag: "Origins",
    },
    {
      year: "December 2025",
      title: "Conclusion of Public Service & Outreach",
      description:
        "Her public service concluded and she began considering a different professional future. A reported Friday-afternoon call was placed to the Herrera family.",
      tag: "Career Pivot",
    },
    {
      year: "January 2026",
      title: "Presidential Pardon Issued",
      description:
        "President Donald J. Trump pardoned Julio Herrera Velutini. Habba Mildon has denied receiving compensation or lobbying for the pardon.",
      tag: "Executive Action",
    },
    {
      year: "February 26, 2026",
      title: "London Headquarters Business Lunch",
      description:
        "A formal business lunch with Julio Herrera Velutini, family members, and advisers took place at the family's London headquarters (lasting 1 hr 48 min).",
      tag: "London Summit",
    },
    {
      year: "March 23, 2026",
      title: "Second London Meeting & Personal Shift",
      description:
        "Twenty-five days later, Habba reportedly requested another London meeting, discussing her divorce and relationship with Turhan Mildon. The union led to a wedding estimated at $10 million.",
      tag: "Personal Reinvention",
    },
    {
      year: "October 31, 2026",
      title: "Halloween Night Criticism at Mar-a-Lago",
      description:
        "Trump publicly criticized the reported compensation agreement at Mar-a-Lago, calling the arrangement 'totally obnoxious and outrageous.'",
      tag: "Fallout",
    },
  ];

  return (
    <>
      <ReadingProgress />

      {/* Hero Masterpiece Header with Magazine Cover Aesthetic */}
      <section className="relative w-full bg-[#0a0a0a] text-white pt-6 sm:pt-10 md:pt-16 pb-8 sm:pb-12 md:pb-20 border-b border-[#222] overflow-hidden">
        {/* Architectural grid background texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-amber-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="container-wide px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          
          {/* Top Broadsheet / Magazine Kicker Line */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3 sm:pb-4 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-400">
            <span className="text-gray-300 font-medium">
              The Empire Times Magazine
            </span>
            <span>{formattedDate}</span>
          </div>

          {/* Two-Column Asymmetrical Hero (Title & Narrative Left, Hero Portrait Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Premium Editorial Title & Deck */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1">
              
              <span className="font-serif italic text-amber-400/90 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 block tracking-wide">
                Inside the Herrera Velutini Dynasty
              </span>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-black leading-[1.08] sm:leading-[1.04] tracking-[-0.02em] text-[#fafaf7] mb-4 sm:mb-6">
                The Vanity of <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-gray-100 to-amber-200/90 bg-clip-text text-transparent">
                  Alina Habba Mildon
                </span>
              </h1>

              {/* Deck / Subtitle */}
              <p className="font-serif italic text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl border-l-2 border-amber-500/60 pl-3 sm:pl-4">
                Beauty, Power, Ambition and the Price of Loyalty: From the White House to the Herrera Velutini Banking Dynasty.
              </p>

              {/* Author & Read Time Strip */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-4 sm:pt-6 border-t border-white/10 text-xs font-sans uppercase tracking-wider text-gray-400">
                {author && (
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative ring-2 ring-amber-500/40 flex-shrink-0">
                      <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="block text-[9px] sm:text-[10px] text-gray-400 font-normal">Reported By</span>
                      <Link href={`/author/${author.slug}`} className="font-bold text-gray-100 hover:text-amber-400 transition-colors text-xs">
                        {author.name}
                      </Link>
                    </div>
                  </div>
                )}
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-1.5 text-gray-300 text-[11px] sm:text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{article.readingTime} min in-depth read</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Framed Photographic Portrait */}
            <div className="lg:col-span-5 relative order-2">
              <div className="relative group mx-auto max-w-md lg:max-w-none w-full">
                {/* Decorative border frame offset effect */}
                <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-amber-500/40 via-white/10 to-transparent opacity-80 blur-[2px]" />
                
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/25 bg-[#141414] shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/uploads/news/alina-habba-hq.webp"
                    alt="Alina Habba Mildon"
                    className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.04]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Caption inside frame */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 text-white pointer-events-none drop-shadow-md">
                    <p className="font-serif italic text-[11px] sm:text-xs leading-snug text-gray-100 line-clamp-2 sm:line-clamp-none">
                      Alina Habba Mildon, former senior legal adviser and federal prosecutor, positioned at the center of international private banking scrutiny.
                    </p>
                    <span className="block font-sans text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-400 mt-0.5 sm:mt-1">
                      Exclusive · The Empire Times
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Investigation Content Body + Interactive Timeline Sidebar */}
      <main className="bg-[#fafaf8] py-8 sm:py-12 md:py-20 text-[#111]">
        <div className="container-wide px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

            {/* Left Sidebar: Social share on desktop */}
            <aside className="hidden xl:block lg:col-span-1">
              <div className="sticky top-28 flex flex-col items-center gap-4">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#888] -rotate-90 my-6">
                  Share
                </span>
                <ShareButtons title={article.title} />
              </div>
            </aside>

            {/* Center: The Main Article Text */}
            <div className="lg:col-span-7 xl:col-span-7 font-serif text-[16px] sm:text-[17px] md:text-[19px] leading-[1.75] sm:leading-[1.8] text-[#222]">

              {/* Mobile Share Bar */}
              <div className="xl:hidden flex items-center justify-between pb-4 mb-6 border-b border-[#e5e5e0]">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#666]">Share Story</span>
                <ShareButtons title={article.title} />
              </div>

              {/* First Section with Drop Cap */}
              <div className="first-letter:float-left first-letter:text-5xl sm:first-letter:text-6xl first-letter:pr-3 sm:first-letter:pr-4 first-letter:font-bold first-letter:font-serif first-letter:text-[#111] first-letter:leading-none">
                {article.content[0]}
              </div>

              {article.content.slice(1, 4).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Key Excerpt Pullquote */}
              <blockquote className="my-8 sm:my-10 border-l-4 border-amber-600 pl-4 sm:pl-6 py-2 italic font-serif text-lg sm:text-xl md:text-2xl text-[#1a1a1a] bg-amber-50/50 p-4 rounded-r leading-snug">
                &ldquo;Her ambition was to join a family office with the international reach, influence and complexity of an organization such as the Trump Organization... It was that of General Counsel and Senior Adviser.&rdquo;
              </blockquote>

              {article.content.slice(4, 7).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* ══════════════════════════════════════════════════════════
                  REQUIRED HIGHLIGHT CALLOUT BOX
                  20+ law firms | $100M yearly legal and advisory spending
              ══════════════════════════════════════════════════════════ */}
              <div className="my-8 sm:my-12 relative overflow-hidden rounded-lg bg-gradient-to-br from-[#111] via-[#1c1c1c] to-[#0a0a0a] text-white p-5 sm:p-6 md:p-8 shadow-xl border border-amber-500/30">
                {/* Header ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-white/10 mb-5 sm:mb-6">
                  <div className="flex items-center gap-2 text-amber-400 font-sans text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    Scale of Legal Operations
                  </div>
                  <span className="font-sans text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">
                    Internal Advisory Scope
                  </span>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-md p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[11px] sm:text-xs font-sans uppercase font-bold tracking-wider">Legal Network</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-serif font-black text-white">20+</div>
                    <div className="text-xs font-sans text-gray-300 mt-1">Law firms under strategic coordination</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-md p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[11px] sm:text-xs font-sans uppercase font-bold tracking-wider">Annual Allocation</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-serif font-black text-white">$100M</div>
                    <div className="text-xs font-sans text-gray-300 mt-1">Yearly legal and advisory expenditure</div>
                  </div>
                </div>

                {/* Narrative text inside box */}
                <p className="font-serif italic text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed border-t border-white/10 pt-4">
                  Habba&apos;s responsibilities included coordinating more than 20 law firms and overseeing approximately $100 million in annual legal and advisory expenditure. If accurate, that description would place her at the center of a substantial operation requiring sustained coordination, oversight and reporting.
                </p>
              </div>

              {article.content.slice(7, 12).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Mid-Article Photographic Feature */}
              <div className="my-8 sm:my-12 overflow-hidden rounded border border-[#d4d4d4] bg-white shadow-lg">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/uploads/news/alina-habba-investigation.jpg"
                    alt="Alina Habba addressing the press"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 750px"
                  />
                </div>
                <div className="p-3 sm:p-4 bg-[#f8f8f6] border-t border-[#e5e5e5] text-xs font-sans text-[#555] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2">
                  <span className="font-serif italic text-xs sm:text-sm text-[#222]">
                    Alina Habba answering questions from the national press corps following high-stakes legal proceedings.
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#888] flex-shrink-0">
                    The Empire Times Archives
                  </span>
                </div>
              </div>

              {article.content.slice(12, 14).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Second Pullquote: London & Trump */}
              <div className="my-8 sm:my-10 p-5 sm:p-6 bg-[#f0f0ec] border-y-2 border-[#111] text-center">
                <span className="block font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[#888] mb-2">
                  The October 31 Mar-a-Lago Fallout
                </span>
                <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#111] italic leading-snug">
                  &ldquo;He described the arrangement as &lsquo;totally obnoxious and outrageous&rsquo; and said it was unacceptable.&rdquo;
                </p>
              </div>

              {article.content.slice(14).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Sources & Reference Documentation */}
              <div className="mt-8 sm:mt-12 pt-6 border-t border-[#d4d4d4] bg-[#f9f9f6] p-4 sm:p-6 rounded border border-[#e5e5e0]">
                <div className="flex items-center gap-2 mb-3 text-accent font-sans text-xs font-bold uppercase tracking-[0.2em]">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  Sources &amp; References
                </div>
                <p className="text-xs font-sans text-[#666] mb-3 sm:mb-4">
                  This investigative report cites documented accounts, public statements, and verified transcripts:
                </p>
                <ul className="space-y-3 text-xs font-sans">
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-bold text-[#111] block mb-0.5">MEAWW News Investigation:</span>
                      <a
                        href="https://news.meaww.com/trump-calls-former-lawyer-alina-habbas-50m-deal-not-acceptable"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline break-words"
                      >
                        Trump calls former lawyer Alina Habba&apos;s $50M deal &apos;not acceptable&apos;
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-bold text-[#111] block mb-0.5">Roll Call Factbase Record:</span>
                      <a
                        href="https://rollcall.com/factbase/trump/transcript/donald-trump-press-gaggle-mar-a-lago-halloween-party-october-31-2026/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline break-words"
                      >
                        Donald Trump Press Gaggle Transcript, Mar-a-Lago Halloween Event (October 31, 2026)
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Tags Section matching exact broadsheet design */}
              <div className="mt-8 pt-6 border-t border-[#e5e5e5] flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#111] mr-1.5">
                  TAGS
                </span>
                {(article.tags && article.tags.length > 0 ? article.tags : [
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
                  "Banking Industry"
                ]).map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#d4d4d4] bg-white text-xs font-sans text-[#555] shadow-xs hover:border-[#888] hover:text-[#111] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Signoff Rule */}
              <div className="mt-8 pt-6 border-t-2 border-[#111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#555]">
                  The Empire Times Special Investigation
                </span>
                <span className="font-serif italic text-xs text-[#777]">
                  Reported by the Washington &amp; London Bureaus
                </span>
              </div>
            </div>

            {/* Right Column: Required Interactive Timeline Sidebar */}
            <aside className="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0">
              <div className="lg:sticky lg:top-24 bg-white border-2 border-[#111] shadow-xl p-5 sm:p-6 md:p-8 rounded-sm">
                
                {/* Timeline Header */}
                <div className="border-b-2 border-[#111] pb-3 sm:pb-4 mb-5 sm:mb-6">
                  <div className="flex items-center gap-2 text-accent font-sans text-[10px] font-black uppercase tracking-[0.25em] mb-1">
                    <Landmark className="w-4 h-4 flex-shrink-0" />
                    Chronology
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111] tracking-tight">
                    Timeline of Events
                  </h3>
                  <p className="text-xs font-sans text-[#666] mt-1 leading-relaxed">
                    The intersection of public office, European private banking, and presidential scrutiny.
                  </p>
                </div>

                {/* Timeline Nodes */}
                <div className="relative border-l-2 border-[#111] ml-2 sm:ml-3 pl-4 sm:pl-6 space-y-6 sm:space-y-8">
                  {timelineEvents.map((evt, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <span className="absolute -left-[23px] sm:-left-[31px] top-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-white border-[2.5px] sm:border-[3px] border-[#111] rounded-full group-hover:bg-accent group-hover:scale-125 transition-all" />

                      {/* Event tag */}
                      <span className="inline-block px-2 py-0.5 bg-[#f0f0ec] text-[#444] text-[9px] font-sans font-bold uppercase tracking-wider rounded mb-1">
                        {evt.tag}
                      </span>

                      {/* Year / Date */}
                      <h4 className="font-sans text-[11px] sm:text-xs font-black uppercase tracking-wider text-accent">
                        {evt.year}
                      </h4>

                      {/* Event Title */}
                      <h5 className="font-serif text-sm sm:text-base font-bold text-[#111] mt-0.5 leading-snug">
                        {evt.title}
                      </h5>

                      {/* Event Description */}
                      <p className="font-serif text-xs leading-relaxed text-[#555] mt-1 sm:mt-1.5">
                        {evt.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Timeline Footer Badge */}
                <div className="mt-6 sm:mt-8 pt-4 border-t border-[#e5e5e5] flex flex-wrap items-center justify-between gap-2 text-[9px] sm:text-[10px] font-sans text-[#777] uppercase tracking-wider">
                  <span>Source: Documented Accounts</span>
                  <span>Verified 2026</span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* Related Investigations / News Section */}
      <section className="bg-white border-t-2 border-[#111] py-10 sm:py-16">
        <div className="container-wide px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="border-b-2 border-[#111] pb-3 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent block mb-1">
                More Coverage
              </span>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#111]">
                Related Investigations &amp; Analysis
              </h3>
            </div>
            <Link href="/latest" className="font-sans text-xs font-bold uppercase tracking-wider text-accent hover:underline">
              All Stories →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedArticles.map((relArticle) => (
              <NewsCard key={relArticle.id} article={relArticle} variant="editor-pick" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
