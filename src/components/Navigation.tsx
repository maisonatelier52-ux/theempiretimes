"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

import { headerNavigation } from "../data/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="py-3 overflow-x-auto scrollbar-hide">
      <ul className="flex items-center space-x-6 lg:space-x-8 whitespace-nowrap">
        {headerNavigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "text-[13px] font-bold uppercase tracking-[0.1em] transition-colors pb-[10px] border-b-[3px]",
                  isActive 
                    ? "text-accent border-accent" 
                    : "text-foreground hover:text-accent border-transparent"
                )}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
