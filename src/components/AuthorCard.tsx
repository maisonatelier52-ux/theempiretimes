import Link from "next/link";
import Image from "next/image";
import { Author } from "../types/news";

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <Link href={`/author/${author.slug}`} className="block group">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 border border-border bg-surface hover:border-accent transition-colors">
        <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-muted">
          <Image 
            src={author.avatar} 
            alt={author.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="96px"
          />
        </div>
        <div className="text-center md:text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1 block">
            {author.role}
          </span>
          <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {author.bio}
          </p>
        </div>
      </div>
    </Link>
  );
}
