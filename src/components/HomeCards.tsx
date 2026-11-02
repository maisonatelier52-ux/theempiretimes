import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Article } from "../types/news";
import { categories } from "../data/categories";
import { authors } from "../data/authors";

function getCat(article: Article) {
  return categories.find(c => c.id === article.categoryId);
}
function getAuthor(article: Article) {
  return authors.find(a => a.id === article.authorId);
}
function fmtDate(d: string) {
  return format(new Date(d), "MMM d, yyyy");
}

/* ─── Shared label ─────────────────────────────────── */
function CatLabel({ article, light }: { article: Article; light?: boolean }) {
  const cat = getCat(article);
  if (!cat) return null;
  return (
    <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${light ? "text-accent" : "text-accent"}`}>
      {cat.name}
    </span>
  );
}

/* ─── HERO MAIN ─────────────────────────────────────── */
export function HeroMain({ article }: { article: Article }) {
  const author = getAuthor(article);
  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted mb-3">
        <Image
          src={article.image} alt={article.title} fill priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 60vw"
          loading="eager"
        />
      </div>
      <CatLabel article={article} />
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mt-1 mb-2 group-hover:text-accent transition-colors">
        {article.title}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">{article.excerpt}</p>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        {author && <span className="font-semibold text-primary">{author.name}</span>}
        {author && <span>·</span>}
        <span>{fmtDate(article.publishedAt)}</span>
        <span>·</span>
        <span>{article.readingTime} min read</span>
      </div>
    </Link>
  );
}

/* ─── HERO SECONDARY (with image, medium size) ──────── */
export function HeroSecondary({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="block group border-t border-border pt-4 first:border-t-0 first:pt-0">
      <div className="flex gap-4">
        <div className="relative w-[100px] h-[72px] flex-shrink-0 overflow-hidden bg-muted">
          <Image src={article.image} alt={article.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="100px" />
        </div>
        <div>
          <CatLabel article={article} />
          <h3 className="font-serif text-sm font-bold leading-tight mt-0.5 group-hover:text-accent transition-colors line-clamp-3">
            {article.title}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">{fmtDate(article.publishedAt)}</p>
        </div>
      </div>
    </Link>
  );
}

/* ─── TEXT LIST ITEM ────────────────────────────────── */
export function TextListItem({ article, number }: { article: Article; number?: number }) {
  return (
    <Link href={`/article/${article.slug}`} className="block group py-3 border-b border-border last:border-b-0">
      <div className="flex gap-3 items-start">
        {number !== undefined && (
          <span className="font-sans text-lg font-bold text-border leading-none pt-0.5 flex-shrink-0 w-5 text-right">{number}</span>
        )}
        <div>
          <CatLabel article={article} />
          <h3 className="font-serif text-sm font-bold leading-tight mt-0.5 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{fmtDate(article.publishedAt)}</p>
        </div>
      </div>
    </Link>
  );
}

/* ─── CARD (image + title, compact) ────────────────── */
export function Card({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <div className="relative w-full aspect-[3/2] mb-2 overflow-hidden bg-muted">
        <Image src={article.image} alt={article.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 25vw" />
      </div>
      <CatLabel article={article} />
      <h3 className="font-serif text-sm md:text-base font-bold leading-tight mt-1 group-hover:text-accent transition-colors line-clamp-3">
        {article.title}
      </h3>
      <p className="text-[11px] text-muted-foreground mt-1">{fmtDate(article.publishedAt)}</p>
    </Link>
  );
}

/* ─── CARD LANDSCAPE (image left, text right) ───────── */
export function CardLandscape({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="block group py-3 border-b border-border last:border-b-0">
      <div className="flex gap-3 items-start">
        <div className="relative w-[90px] h-[64px] flex-shrink-0 overflow-hidden bg-muted">
          <Image src={article.image} alt={article.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="90px" />
        </div>
        <div>
          <CatLabel article={article} />
          <h3 className="font-serif text-sm font-bold leading-tight mt-0.5 group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{fmtDate(article.publishedAt)}</p>
        </div>
      </div>
    </Link>
  );
}

/* ─── BIG CARD (tall image, for feature sections) ──── */
export function BigCard({ article }: { article: Article }) {
  const author = getAuthor(article);
  return (
    <Link href={`/article/${article.slug}`} className="block group h-full">
      <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden bg-muted">
        <Image src={article.image} alt={article.title} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw" />
      </div>
      <CatLabel article={article} />
      <h3 className="font-serif text-lg md:text-xl font-bold leading-tight mt-1 mb-1.5 group-hover:text-accent transition-colors">
        {article.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-2">
        {author && <span className="font-semibold text-primary">{author.name}</span>}
        {author && <span>·</span>}
        <span>{fmtDate(article.publishedAt)}</span>
      </div>
    </Link>
  );
}

/* ─── OPINION CARD (dark bg) ────────────────────────── */
export function OpinionCard({ article, number }: { article: Article; number: number }) {
  const author = getAuthor(article);
  return (
    <Link href={`/article/${article.slug}`} className="block group py-4 border-b border-[#2a2a2a] last:border-b-0">
      <div className="flex gap-3 items-start">
        <span className="font-sans text-2xl font-bold text-[#333] leading-none flex-shrink-0">{number.toString().padStart(2,"0")}</span>
        <div>
          {author && (
            <div className="flex items-center gap-2 mb-1">
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[#333] flex-shrink-0">
                <Image src={author.avatar} alt={author.name} fill className="object-cover" sizes="24px" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{author.name}</span>
            </div>
          )}
          <h3 className="font-serif text-sm font-bold leading-tight text-white group-hover:text-accent transition-colors">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

/* ─── SECTION DIVIDER ───────────────────────────────── */
export function SectionDivider({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-5 pb-2 border-b-2 border-primary">
      <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-primary">{title}</h2>
      {href && (
        <Link href={href} className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-accent transition-colors">
          More →
        </Link>
      )}
    </div>
  );
}
