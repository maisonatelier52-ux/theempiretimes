import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Article } from "../types/news";
import { categories } from "../data/categories";
import { authors } from "../data/authors";

/* ── Helpers ──────────────────────────────────────────── */
function getCat(a: Article) {
  return categories.find((c) => c.id === a.categoryId);
}
function getAuthor(a: Article) {
  return authors.find((au) => au.id === a.authorId);
}
function fd(d: string) {
  return format(new Date(d), "MMM d, yyyy");
}

/* ── Section Rule (newspaper-style divider) ─────────────
   Thick top rule, bold section label, optional "More" link
──────────────────────────────────────────────────────── */
export function SectionRule({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="border-t-[3px] border-[#111] pt-1.5 mb-4 flex items-baseline justify-between">
      <h2 className="font-sans text-[11px] font-black uppercase tracking-[0.22em] text-[#111]">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="font-sans text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
        >
          More →
        </Link>
      )}
    </div>
  );
}

/* ── Column rule (vertical separator between columns) ── */
export function ColRule() {
  return <div className="hidden lg:block w-px bg-[#d4d4d4] self-stretch" />;
}

/* ── Kicker (section label above a headline) ────────────
   e.g. "POLITICS" in small caps red
──────────────────────────────────────────────────────── */
function Kicker({ article }: { article: Article }) {
  const cat = getCat(article);
  if (!cat) return null;
  return (
    <span className="block font-sans text-[9px] font-black uppercase tracking-[0.22em] text-accent mb-0.5">
      {cat.name}
    </span>
  );
}

/* ── Byline ─────────────────────────────────────────────
   "By JOHN CARTER · Aug 17, 2026"
──────────────────────────────────────────────────────── */
function Byline({ article }: { article: Article }) {
  const author = getAuthor(article);
  return (
    <p className="font-sans text-[10px] text-[#555] mt-1 leading-none">
      {author && (
        <>
          <span className="font-bold uppercase tracking-wide">
            By {author.name}
          </span>
          <span className="mx-1 text-[#999]">·</span>
        </>
      )}
      <span>{fd(article.publishedAt)}</span>
    </p>
  );
}

/* ══════════════════════════════════════════════════════
   LEAD STORY — centrepiece hero with large photo + optional sub-lead
   Used for the front-page dominant story
══════════════════════════════════════════════════════ */
export function LeadStory({
  article,
  subArticle,
}: {
  article: Article;
  subArticle?: Article;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Primary Hero Lead */}
      <Link href={`/article/${article.slug}`} className="block group">
        <article>
          <div className="relative w-full aspect-[16/10] mb-3 overflow-hidden bg-[#e8e8e8]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              loading="eager"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width:768px) 100vw, 55vw"
            />
          </div>
          <Kicker article={article} />
          <h1 className="font-serif text-[1.75rem] md:text-[2.1rem] lg:text-[2.35rem] font-bold leading-[1.08] text-[#111] mb-2 group-hover:text-accent transition-colors">
            {article.title}
          </h1>
          <p className="font-serif text-sm md:text-[0.88rem] leading-[1.5] text-[#333] mb-2.5 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Key Bullet Points / Takeaways */}
          {article.content && article.content.length > 1 && (
            <div className="border-t border-[#e0e0e0] pt-2 mt-2 space-y-1.5">
              {article.content.slice(1, 3).map((para, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2 text-[11px] text-[#444] font-serif">
                  <span className="text-accent font-bold mt-0.5">•</span>
                  <span className="line-clamp-2">{para}</span>
                </div>
              ))}
            </div>
          )}
          <Byline article={article} />
        </article>
      </Link>

      {/* Sub-Lead Story */}
      {subArticle && (
        <div className="mt-4 pt-4 border-t-2 border-[#111]">
          <Link href={`/article/${subArticle.slug}`} className="block group">
            <article>
              <div className="flex items-baseline justify-between mb-1">
                <Kicker article={subArticle} />
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#777]">
                  Analysis
                </span>
              </div>
              <h2 className="font-serif text-[1.15rem] font-bold leading-[1.15] text-[#111] mb-1.5 group-hover:text-accent transition-colors">
                {subArticle.title}
              </h2>
              <p className="font-serif text-[0.82rem] leading-[1.45] text-[#444] line-clamp-2 mb-1">
                {subArticle.excerpt}
              </p>
              <Byline article={subArticle} />
            </article>
          </Link>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COLUMN STORY — text-only stacked story (no image)
   Used in sidebar columns, very dense
══════════════════════════════════════════════════════ */
export function ColumnStory({
  article,
  showExcerpt = true,
}: {
  article: Article;
  showExcerpt?: boolean;
}) {
  return (
    <Link href={`/article/${article.slug}`} className="block group flex-1">
      <article className="py-3 border-b border-[#ddd] last:border-b-0 h-full">
        <Kicker article={article} />
        <h3 className="font-serif text-[0.92rem] font-bold leading-[1.15] text-[#111] mb-1 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        {showExcerpt && (
          <p className="font-serif text-[0.76rem] leading-[1.5] text-[#444] line-clamp-2 mb-1">
            {article.excerpt}
          </p>
        )}
        <Byline article={article} />
      </article>
    </Link>
  );
}


/* ══════════════════════════════════════════════════════
   IMAGE STORY — compact story with small photo left
   Used in section grids
══════════════════════════════════════════════════════ */
export function ImageStory({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <article className="pb-3 mb-3 border-b border-[#ddd] last:border-b-0 last:mb-0 last:pb-0">
        <div className="flex gap-3">
          <div className="relative w-[88px] h-[64px] flex-shrink-0 overflow-hidden bg-[#e8e8e8]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="88px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Kicker article={article} />
            <h3 className="font-serif text-[0.88rem] font-bold leading-[1.15] text-[#111] mb-1 group-hover:text-accent transition-colors line-clamp-3">
              {article.title}
            </h3>
            <Byline article={article} />
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════
   FEATURE STORY — medium card with photo on top
   Used in section features (World, Tech, etc.)
══════════════════════════════════════════════════════ */
export function FeatureStory({
  article,
  size = "md",
}: {
  article: Article;
  size?: "sm" | "md" | "lg";
}) {
  const aspectClass =
    size === "lg"
      ? "aspect-[4/3]"
      : size === "sm"
      ? "aspect-[3/2]"
      : "aspect-[3/2]";
  const headlineClass =
    size === "lg"
      ? "text-[1.35rem] leading-[1.1]"
      : size === "sm"
      ? "text-[0.88rem] leading-[1.15]"
      : "text-[1.05rem] leading-[1.15]";

  return (
    <Link href={`/article/${article.slug}`} className="block group h-full">
      <article className="flex flex-col h-full">
        <div
          className={`relative w-full ${aspectClass} mb-2 overflow-hidden bg-[#e8e8e8]`}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 30vw"
          />
        </div>
        <Kicker article={article} />
        <h3
          className={`font-serif font-bold text-[#111] mb-1 group-hover:text-accent transition-colors ${headlineClass}`}
        >
          {article.title}
        </h3>
        {size !== "sm" && (
          <p className="font-serif text-[0.78rem] leading-[1.5] text-[#444] line-clamp-2 mb-1">
            {article.excerpt}
          </p>
        )}
        <Byline article={article} />
      </article>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════
   NUMBERED STORY — ranked list item with number
   Used in "Top Stories" sidebar
══════════════════════════════════════════════════════ */
export function NumberedStory({
  article,
  number,
}: {
  article: Article;
  number: number;
}) {
  return (
    <Link href={`/article/${article.slug}`} className="block group flex-1">
      <article className="flex gap-3 py-3 border-b border-[#ddd] last:border-b-0 items-start h-full">
        <span className="font-serif text-[1.8rem] font-bold text-[#d4d4d4] leading-none flex-shrink-0 w-7 text-right mt-0.5">
          {number}
        </span>
        <div>
          <Kicker article={article} />
          <h3 className="font-serif text-[0.88rem] font-bold leading-[1.15] text-[#111] mb-0.5 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <Byline article={article} />
        </div>
      </article>
    </Link>
  );
}
