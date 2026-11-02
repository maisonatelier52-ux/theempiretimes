import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Article } from "../types/news";
import { categories } from "../data/categories";
import { authors } from "../data/authors";
import { cn } from "../lib/utils";

interface NewsCardProps {
  article: Article;
  variant?: "hero-main" | "top-story" | "editor-pick" | "compact" | "text-only" | "trending";
  number?: number;
  className?: string;
}

export default function NewsCard({ article, variant = "compact", number, className }: NewsCardProps) {
  if (!article) return null;

  const category = categories.find(c => c.id === article.categoryId);
  const author = authors.find(a => a.id === article.authorId);
  const authorName = author ? author.name : article.authorId;
  const formattedDate = format(new Date(article.publishedAt), "MMM d, yyyy");

  if (variant === "hero-main") {
    return (
      <Link href={`/article/${article.slug}`} className={cn("block group", className)}>
        <article className="flex flex-col h-full">
          <div className="relative w-full h-[260px] md:h-[340px] lg:h-[360px] mb-3 overflow-hidden bg-muted">
            <Image 
              src={article.image} 
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="flex flex-col">
            {category && (
              <span className="category-label mb-2">{category.name}</span>
            )}
            <h2 className="headline-large mb-2.5 group-hover:text-accent transition-colors">
              {article.title}
            </h2>
            <p className="prose-article line-clamp-3 mb-3 text-foreground/80">
              {article.excerpt}
            </p>
            <div className="meta-text flex items-center gap-2">
              <span className="font-semibold text-foreground">{authorName}</span>
              <span>&middot;</span>
              <span>{formattedDate}</span>
              <span>&middot;</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "top-story") {
    return (
      <Link href={`/article/${article.slug}`} className={cn("block group", className)}>
        <article className="flex gap-4 items-start py-3 border-b border-border last:border-b-0">
          <div className="relative w-[90px] h-[68px] flex-shrink-0 overflow-hidden bg-muted">
            <Image 
              src={article.image} 
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="90px"
            />
          </div>
          <div className="flex flex-col flex-grow">
            {category && (
              <span className="category-label mb-1 text-[9px]">{category.name}</span>
            )}
            <h3 className="font-serif text-sm font-bold leading-tight mb-1.5 group-hover:text-accent transition-colors">
              {article.title}
            </h3>
            <div className="meta-text text-[11px] flex items-center gap-1.5">
              <span>{formattedDate}</span>
              <span>&middot;</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "editor-pick") {
    return (
      <Link href={`/article/${article.slug}`} className={cn("block group", className)}>
        <article className="flex gap-3.5 items-start py-3 border-b border-[#333] last:border-b-0">
          <span className="font-sans text-xl text-muted-foreground font-light leading-none pt-0.5">
            {number?.toString().padStart(2, '0')}
          </span>
          <div className="flex flex-col">
            <h3 className="font-serif text-sm font-bold leading-tight mb-1 group-hover:text-accent transition-colors text-white">
              {article.title}
            </h3>
            <div className="meta-text text-[11px] text-gray-400">
              {formattedDate}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "trending") {
    return (
      <Link href={`/article/${article.slug}`} className={cn("block group", className)}>
        <article className="flex gap-3 items-start">
          <span className="font-sans text-xl font-bold text-accent leading-none pt-1 flex-shrink-0">
            {number?.toString().padStart(2, '0')}
          </span>
          <div className="relative w-[70px] h-[52px] flex-shrink-0 overflow-hidden bg-muted">
            <Image 
              src={article.image} 
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="70px"
            />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            {category && (
              <span className="category-label mb-0.5 text-[9px]">{category.name}</span>
            )}
            <h3 className="font-serif text-xs md:text-sm font-bold leading-tight mb-1 group-hover:text-accent transition-colors text-primary line-clamp-2">
              {article.title}
            </h3>
            <div className="meta-text text-[10px] text-muted-foreground">
              {formattedDate}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "text-only") {
    return (
      <Link href={`/article/${article.slug}`} className={cn("block group", className)}>
        <article className="py-2.5 border-b border-border last:border-b-0">
          {category && (
            <span className="category-label mb-1 block text-[9px]">{category.name}</span>
          )}
          <h3 className="font-serif text-sm md:text-base font-bold leading-tight mb-1 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <div className="meta-text text-[11px]">
            {formattedDate} &middot; {article.readingTime} min
          </div>
        </article>
      </Link>
    );
  }

  // default compact
  return (
    <Link href={`/article/${article.slug}`} className={cn("block group", className)}>
      <article className="flex flex-col h-full">
        <div className="relative aspect-[3/2] mb-2.5 overflow-hidden bg-muted">
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
        </div>
        <div className="flex flex-col flex-grow">
          {category && (
            <span className="category-label mb-1 text-[10px]">{category.name}</span>
          )}
          <h3 className="font-serif text-sm md:text-base font-bold leading-tight mb-1.5 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <div className="meta-text text-[11px] mt-auto pt-1 flex items-center gap-1.5">
            <span>{formattedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
