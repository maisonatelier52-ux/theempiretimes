"use client";

import Link from "next/link";
import { cn } from "../lib/utils";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  inverted?: boolean;
}

export default function AnimatedLogo({
  className,
  size = "lg",
  showTagline = true,
  inverted = false,
}: AnimatedLogoProps) {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl lg:text-5xl",
    xl: "text-4xl md:text-5xl lg:text-6xl",
  };

  const taglineSizeClasses = {
    sm: "text-[9px] tracking-[0.25em]",
    md: "text-[10px] tracking-[0.28em]",
    lg: "text-[11px] tracking-[0.32em]",
    xl: "text-xs tracking-[0.35em]",
  };

  const letters = "THE EMPIRE TIMES".split("");

  const textColor = inverted ? "text-white" : "text-[#111]";
  const ruleColor = inverted ? "bg-white" : "bg-[#111]";
  const tagColor = inverted ? "text-gray-300" : "text-[#111]";

  return (
    <div className={cn("flex flex-col items-center justify-center text-center select-none", className)}>
      <Link href="/" className="relative group flex flex-col items-center gap-0 py-2 px-2">

        {/* Masthead letters */}
        <div className={cn(
          "flex items-end justify-center font-serif font-black uppercase leading-none",
          textColor,
          sizeClasses[size]
        )}>
          {letters.map((char, i) =>
            char === " " ? (
              <span key={i} className="inline-block" style={{ width: "0.28em" }} />
            ) : (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: `logoDrop 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.045}s both`,
                }}
              >
                {char}
              </span>
            )
          )}
        </div>

        {/* Animated rule — draws from left to right */}
        <span
          className={cn("block h-[2.5px] mt-[5px] w-full origin-left", ruleColor)}
          style={{ animation: "logoRule 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.38s both" }}
        />

        {/* Second thinner rule */}
        <span
          className={cn("block h-px mt-[3px] w-full origin-left opacity-40", ruleColor)}
          style={{ animation: "logoRule 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.46s both" }}
        />

        {/* Tagline */}
        {showTagline && (
          <span
            className={cn(
              "font-sans uppercase mt-[6px] opacity-0 font-light",
              tagColor,
              taglineSizeClasses[size]
            )}
            style={{ animation: "logoTaglineFade 0.6s ease-out 0.72s forwards" }}
          >
            Essential stories. Real impact.
          </span>
        )}

        {/* Hover shimmer overlay */}
        <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
          <span className="block w-full h-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </span>
      </Link>
    </div>
  );
}
