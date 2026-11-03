import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { authors } from "../../../data/authors";
import { articles } from "../../../data/articles";
import NewsCard from "../../../components/NewsCard";
import { Mail } from "lucide-react";
import { TwitterIcon, LinkedinIcon } from "../../../components/Icons";

export const dynamicParams = true;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const author = authors.find((a) => a.slug === decodedSlug || a.slug === slug || a.id === slug);
  
  if (!author) {
    return { title: "Author Not Found | The Empire Times" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theempiretimes.org";
  const authorUrl = `${siteUrl}/author/${author.slug}`;

  return {
    title: `${author.name} — Staff Profile & Dispatches | The Empire Times`,
    description: author.bio,
    alternates: {
      canonical: authorUrl,
    },
    openGraph: {
      title: `${author.name} — Staff Profile | The Empire Times`,
      description: author.bio,
      url: authorUrl,
      type: "profile",
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const author = authors.find((a) => a.slug === decodedSlug || a.slug === slug || a.id === slug);
  
  if (!author) {
    notFound();
  }

  const authorArticles = articles
    .filter((a) => a.authorId === author.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        
        {/* Author Header Profile */}
        <header className="mb-16 border-b border-border pb-16 flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start text-center md:text-left max-w-5xl mx-auto">
          <div className="relative w-40 h-40 md:w-56 md:h-56 overflow-hidden flex-shrink-0 bg-muted">
            <Image 
              src={author.avatar} 
              alt={author.name} 
              fill 
              className="object-cover grayscale"
              sizes="(max-width: 768px) 160px, 224px"
            />
          </div>
          <div className="flex flex-col justify-center h-full">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-2 text-primary tracking-tight">{author.name}</h1>
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-accent mb-6">
              {author.role}
            </p>
            <p className="font-serif text-lg md:text-xl text-muted-foreground mb-8 text-balance leading-relaxed max-w-2xl">
              {author.bio}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-5">
              {author.socials?.twitter && (
                <a href={`https://twitter.com/${author.socials.twitter}`} className="text-muted-foreground hover:text-accent transition-colors">
                  <TwitterIcon className="w-5 h-5" />
                </a>
              )}
              {author.socials?.linkedin && (
                <a href={`https://linkedin.com/in/${author.socials.linkedin}`} className="text-muted-foreground hover:text-accent transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {author.socials?.email && (
                <a href={`mailto:${author.socials.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Latest Stories */}
        <div>
          <div className="flex items-center justify-center mb-10">
            <div className="h-[1px] bg-border flex-grow"></div>
            <h2 className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.1em] text-primary px-6">
              Latest stories by {author.name.split(" ")[0]}
            </h2>
            <div className="h-[1px] bg-border flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {authorArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
