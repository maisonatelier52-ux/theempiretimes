import Link from "next/link";
import { articles } from "../data/articles";
import { ArrowRight } from "lucide-react";

export default function BreakingNews() {
  const breakingStory = articles.find(a => a.featured) || articles[0];

  return (
    <div className="bg-[#111111] text-white border-b border-[#222]">
      <div className="container-wide px-4 md:px-10 lg:px-12 py-2 flex items-center justify-between text-[11px] sm:text-xs">
        <div className="flex items-center gap-4 w-full">
          {/* Breaking Indicator */}
          <div className="flex items-center gap-1.5 flex-shrink-0 text-accent font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            BREAKING
          </div>
          
          {/* Story Title */}
          <span className="text-gray-300 hidden sm:inline-block">|</span>
          <p className="font-medium truncate flex-grow text-gray-200">
            {breakingStory.title}
            <span className="text-gray-500 ml-3 font-normal hidden md:inline-block">32 mins ago</span>
          </p>

          {/* Link */}
          <Link 
            href={`/article/${breakingStory.slug}`} 
            className="flex-shrink-0 flex items-center gap-1 uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">View full story</span> <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
