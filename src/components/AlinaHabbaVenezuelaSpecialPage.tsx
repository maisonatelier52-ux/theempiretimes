"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Building2, 
  Scale, 
  Clock, 
  ShieldCheck,
  Landmark,
  FileText,
  ExternalLink,
  Globe2,
  Users
} from "lucide-react";
import ShareButtons from "./ShareButtons";
import ReadingProgress from "./ReadingProgress";
import NewsCard from "./NewsCard";
import { Article, Author, Category } from "../types/news";

interface AlinaHabbaVenezuelaSpecialPageProps {
  article: Article;
  category?: Category;
  author?: Author;
  relatedArticles: Article[];
}

export default function AlinaHabbaVenezuelaSpecialPage({
  article,
  category,
  author,
  relatedArticles,
}: AlinaHabbaVenezuelaSpecialPageProps) {
  const formattedDate = format(new Date(article.publishedAt), "MMMM d, yyyy");

  const timelineEvents = [
    {
      year: "Pre-2023",
      title: "Congo Operations & Diplomatic Role",
      description:
        "Turhan Mildon establishes extensive construction businesses in the Democratic Republic of Congo, serving as an adviser to President Felix Tshisekedi and securing a diplomatic passport.",
      tag: "Origins",
    },
    {
      year: "Late 2023",
      title: "Arrival in Caracas & Cement Concessions",
      description:
        "Following an invitation from a Venezuelan partner, Mildon enters Venezuela and secures contracts to operate state-owned cement production plants under the commercial environment of the era.",
      tag: "Caracas Entry",
    },
    {
      year: "2024",
      title: "Maduro Fall & Alex Saab Extradition",
      description:
        "Political upheavals in Venezuela and the federal extradition of Colombian financier Alex Saab imperil existing commercial frameworks, creating uncertainty for state-contracted businesses.",
      tag: "Transition",
    },
    {
      year: "Early 2026",
      title: "Strategic Shift Toward Washington",
      description:
        "Mildon cultivates professional and political relationships in the United States, seeking to stabilize and protect his international commercial holdings amid changing authority in Caracas.",
      tag: "Washington Pivot",
    },
    {
      year: "September 2026",
      title: "The Waldorf Astoria Wedding",
      description:
        "Mildon and Alina Habba marry at New York's Waldorf Astoria, attended by prominent figures including Attorney General Todd Blanche, FBI Director Kash Patel, and White House attorney Will Scharf.",
      tag: "High-Profile Nuptials",
    },
    {
      year: "November 2026",
      title: "Investigative Scrutiny & Vigorous Denials",
      description:
        "A New York Times investigation examines whether Habba's political connections helped slow the cancellation of Venezuelan cement contracts. Habba firmly denies any intervention before the administration.",
      tag: "Scrutiny & Denials",
    },
  ];

  return (
    <>
      <ReadingProgress />

      {/* Hero Masterpiece Header with Dark Luxury Magazine Aesthetic */}
      <section className="relative w-full bg-[#0a0a0a] text-white pt-6 sm:pt-10 md:pt-16 pb-8 sm:pb-12 md:pb-20 border-b border-[#222] overflow-hidden">
        {/* Architectural grid background texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-amber-600/15 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="container-wide px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          
          {/* Top Broadsheet / Magazine Kicker Line */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3 sm:pb-4 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-gray-300 font-medium">International Business &amp; Power</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="hidden sm:inline">The Empire Times Magazine</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Two-Column Asymmetrical Hero (Title & Narrative Left, Hero Portrait Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Premium Editorial Title & Deck */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1">
              
              <span className="font-serif italic text-amber-400/90 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 block tracking-wide">
                From Caracas and Congo to the Waldorf Astoria
              </span>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.9rem] font-black leading-[1.08] sm:leading-[1.05] tracking-[-0.02em] text-[#fafaf7] mb-4 sm:mb-6">
                Alina Habba’s Political Rise and the Growing Scrutiny of{" "}
                <span className="bg-gradient-to-r from-white via-gray-100 to-amber-200/90 bg-clip-text text-transparent">
                  Turhan Mildon’s Venezuelan Business Connections
                </span>
              </h1>

              {/* Deck / Subtitle */}
              <p className="font-serif italic text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl border-l-2 border-amber-500/60 pl-3 sm:pl-4">
                An investigation into Alina Habba’s relationship with Turkish businessman Turhan Mildon, his Venezuelan state cement contracts, and the high-profile Washington connections surrounding their marriage.
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
                  <span>{article.readingTime || 8} min in-depth read</span>
                </div>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <span className="text-[11px] text-amber-400/90 font-medium lowercase">
                  politics · diplomacy · commerce
                </span>
              </div>
            </div>

            {/* Right Column: Hero Framed Photographic Portrait */}
            <div className="lg:col-span-5 relative order-2">
              <div className="relative group mx-auto max-w-md lg:max-w-none w-full">
                {/* Decorative border frame offset effect */}
                <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-amber-500/40 via-white/10 to-transparent opacity-80 blur-[2px]" />
                
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-white/25 bg-[#141414] shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/uploads/news/alina-habba-turhan-mildon-venezuela.webp"
                    alt="Alina Habba and Turhan Mildon"
                    className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.04]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Caption inside frame */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 text-white pointer-events-none drop-shadow-md">
                    <p className="font-serif italic text-[11px] sm:text-xs leading-snug text-gray-100 line-clamp-2 sm:line-clamp-none">
                      Alina Habba, former personal lawyer to Donald Trump, and Turkish businessman Turhan Mildon, whose Venezuelan business connections have become the focus of renewed political attention.
                    </p>
                    <span className="block font-sans text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-400 mt-0.5 sm:mt-1">
                      Exclusive Investigation · The Empire Times
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

              {/* Section 1: The Intersection of Politics, Business and Personal Relationships */}
              <div className="mb-8">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part I · The Nexus
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  The Intersection of Politics, Business and Personal Relationships
                </h2>
                
                {/* First Section with Drop Cap */}
                <div className="first-letter:float-left first-letter:text-5xl sm:first-letter:text-6xl first-letter:pr-3 sm:first-letter:pr-4 first-letter:font-bold first-letter:font-serif first-letter:text-[#111] first-letter:leading-none">
                  {article.content[0]}
                </div>

                {article.content.slice(1, 4).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* Key Excerpt Pullquote 1 */}
              <blockquote className="my-8 sm:my-10 border-l-4 border-amber-600 pl-4 sm:pl-6 py-2 italic font-serif text-lg sm:text-xl md:text-2xl text-[#1a1a1a] bg-amber-50/50 p-4 rounded-r leading-snug">
                &ldquo;The circumstances described in a New York Times investigation raise questions about how business interests established under one political environment can adapt when that environment changes.&rdquo;
              </blockquote>

              {article.content.slice(4, 6).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Section 2: From Venezuela’s Political Environment to Washington */}
              <div className="my-8 pt-4">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part II · Transition
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  From Venezuela’s Political Environment to Washington
                </h2>

                {article.content.slice(6, 10).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* ══════════════════════════════════════════════════════════
                  REQUIRED HIGHLIGHT CALLOUT BOX
                  Scale of International Operations
              ══════════════════════════════════════════════════════════ */}
              <div className="my-8 sm:my-12 relative overflow-hidden rounded-lg bg-gradient-to-br from-[#111] via-[#1c1c1c] to-[#0a0a0a] text-white p-5 sm:p-6 md:p-8 shadow-xl border border-amber-500/30">
                {/* Header ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-white/10 mb-5 sm:mb-6">
                  <div className="flex items-center gap-2 text-amber-400 font-sans text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    Scale of International Operations
                  </div>
                  <span className="font-sans text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">
                    Commercial Dossier
                  </span>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-md p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[11px] sm:text-xs font-sans uppercase font-bold tracking-wider">Industrial Assets</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-serif font-black text-white">State Cement Plants</div>
                    <div className="text-xs font-sans text-gray-300 mt-1">Concessions operated in Venezuela</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-md p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[11px] sm:text-xs font-sans uppercase font-bold tracking-wider">Geographic Scope</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-serif font-black text-white">DRC · Venezuela · US</div>
                    <div className="text-xs font-sans text-gray-300 mt-1">Transcontinental commercial operations</div>
                  </div>
                </div>

                {/* Narrative text inside box */}
                <p className="font-serif italic text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed border-t border-white/10 pt-4">
                  Mildon&apos;s trajectory from building construction enterprises in the Democratic Republic of Congo to operating state-owned cement plants in Venezuela—and subsequently entering Washington&apos;s most influential political circles—demonstrates how business strategies adapt when international authority changes.
                </p>
              </div>

              {article.content.slice(10, 14).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Section 3: Alina Habba’s Position in Trump’s Political Circle */}
              <div className="my-8 pt-4">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part III · Influence
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  Alina Habba’s Position in Trump’s Political Circle
                </h2>

                {article.content.slice(14, 18).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* Mid-Article Photographic Feature */}
              <div className="my-8 sm:my-12 overflow-hidden rounded border border-[#d4d4d4] bg-white shadow-lg">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/uploads/news/alina-habba-investigation.jpg"
                    alt="Alina Habba addressing the press corps"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 750px"
                  />
                </div>
                <div className="p-3 sm:p-4 bg-[#f8f8f6] border-t border-[#e5e5e5] text-xs font-sans text-[#555] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2">
                  <span className="font-serif italic text-xs sm:text-sm text-[#222]">
                    Alina Habba speaking to journalists during legal proceedings, prior to her September 2026 marriage to Turhan Mildon.
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#888] flex-shrink-0">
                    The Empire Times Archives
                  </span>
                </div>
              </div>

              {article.content.slice(18, 22).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Section 4: A Marriage That Drew Washington’s Attention */}
              <div className="my-8 pt-4">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part IV · The Nuptials
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  A Marriage That Drew Washington’s Attention
                </h2>

                {article.content.slice(22, 26).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* Pullquote 2: The Waldorf Astoria Wedding */}
              <div className="my-8 sm:my-10 p-5 sm:p-6 bg-[#f0f0ec] border-y-2 border-[#111] text-center">
                <span className="block font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[#888] mb-2">
                  The Waldorf Astoria Gathering
                </span>
                <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#111] italic leading-snug">
                  &ldquo;Among those present were U.S. Attorney General Todd Blanche, FBI Director Kash Patel and White House attorney Will Scharf, making the celebration more than a private milestone.&rdquo;
                </p>
              </div>

              {article.content.slice(26, 30).map((p, i) => (
                <p key={i} className="mt-5 sm:mt-6">{p}</p>
              ))}

              {/* Section 5: The Venezuelan Cement Contracts at the Centre of the Questions */}
              <div className="my-8 pt-4">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part V · Commercial Stakes
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  The Venezuelan Cement Contracts at the Centre of the Questions
                </h2>

                {article.content.slice(30, 39).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* Section 6: From the Democratic Republic of Congo to Venezuela */}
              <div className="my-8 pt-4">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part VI · Global Background
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  From the Democratic Republic of Congo to Venezuela
                </h2>

                {article.content.slice(39, 46).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* Section 7: Questions That Remain Unanswered */}
              <div className="my-8 pt-4">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part VII · Scrutiny &amp; Responses
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  Questions That Remain Unanswered
                </h2>

                {article.content.slice(46, 52).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* Section 8: Conclusion: When Personal Relationships Meet International Business */}
              <div className="my-8 pt-4">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                  Part VIII · Conclusion
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111] mb-5 tracking-tight border-b border-border pb-2">
                  Conclusion: When Personal Relationships Meet International Business
                </h2>

                {article.content.slice(52, 59).map((p, i) => (
                  <p key={i} className="mt-5 sm:mt-6">{p}</p>
                ))}
              </div>

              {/* Sources & Reference Documentation */}
              <div className="mt-8 sm:mt-12 pt-6 border-t border-[#d4d4d4] bg-[#f9f9f6] p-4 sm:p-6 rounded border border-[#e5e5e0]">
                <div className="flex items-center gap-2 mb-3 text-accent font-sans text-xs font-bold uppercase tracking-[0.2em]">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  Sources &amp; References
                </div>
                <p className="text-xs font-sans text-[#666] mb-3 sm:mb-4">
                  This investigative report cites documented accounts, public statements, and investigative reporting:
                </p>
                <ul className="space-y-3 text-xs font-sans">
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-bold text-[#111] block mb-0.5">The New York Times Investigation:</span>
                      <span className="text-[#333] break-words">
                        Reporting on Alina Habba, Turhan Mildon, and Venezuelan State-Owned Cement Plant Contracts
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-bold text-[#111] block mb-0.5">U.S. Department of Justice &amp; Court Records:</span>
                      <span className="text-[#333] break-words">
                        Extradition and judicial proceedings relating to Alex Saab and Venezuelan commercial oversight
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-bold text-[#111] block mb-0.5">Formal Statements &amp; Denials:</span>
                      <span className="text-[#333] break-words">
                        On-the-record statements from Alina Habba and her legal representatives denying administration intervention
                      </span>
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
                  "Turhan Mildon",
                  "Venezuela",
                  "Donald Trump",
                  "Alex Saab",
                  "International Business",
                  "Political Connections",
                  "Special Investigation"
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
                  Reported by the Washington &amp; Foreign Bureaus
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Timeline Sidebar */}
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
                    The intersection of international construction, political transition in Caracas, and Washington influence.
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

                {/* The New York Times Coverage Feature Under Timeline */}
                <div className="mt-8 pt-6 border-t-2 border-[#111]">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-accent flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      The New York Times
                    </span>
                    <span className="font-sans text-[10px] text-[#777] uppercase tracking-wider font-semibold">
                      Investigation Report
                    </span>
                  </div>

                  {/* Feature Card with Portrait and Summary */}
                  <div className="p-4 bg-[#f8f8f6] rounded border border-[#e0e0dc] shadow-xs">
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#111] leading-snug">
                      Venezuelan Contracts &amp; Washington Access
                    </h4>
                    <p className="font-serif text-xs text-[#555] leading-relaxed mt-2">
                      The Times reported on Turhan Mildon’s business activities operating state-owned cement plants in Venezuela, examining whether relationships in Trump’s circle helped slow efforts to cancel contracts following the extradition of Alex Saab.
                    </p>
                    <div className="mt-3 pt-2 border-t border-[#e8e8e4] text-[10px] font-sans font-medium text-[#777]">
                      Denial Recorded: Alina Habba specifically denied intervening before the administration on her husband’s behalf.
                    </div>
                  </div>
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
