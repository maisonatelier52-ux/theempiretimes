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

export const dynamicParams = true;

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

  return {
    title: `${article.title} | The Empire Times`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    }
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

  // Get related articles
  const relatedArticles = articles
    .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, 3);

  return (
    <>
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

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mr-2 mt-1">Tags:</span>
                {article.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-muted text-xs uppercase tracking-widest font-bold text-primary hover:bg-border transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        {author && (
          <div className="container-narrow px-4 xl:px-0 mt-16 pt-12 border-t border-border">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-primary mb-6">About the Author</h2>
            <AuthorCard author={author} />
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-[#F9FAFB] mt-20 py-16 border-t border-border">
            <div className="container-wide px-4 md:px-10 lg:px-12">
              <div className="flex items-center mb-10">
                <h2 className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.1em] text-primary">
                  More from {category?.name}
                </h2>
                <div className="ml-4 h-[2px] bg-accent w-12"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {relatedArticles.map(article => (
                  <NewsCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
