"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { cn } from "../lib/utils";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";
import AnimatedLogo from "./AnimatedLogo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="w-full bg-background flex flex-col items-center">
        {/* Main Header / Masthead */}
        <div className="w-full border-b border-border py-3 md:py-4">
          <div className="container-wide px-4 md:px-10 lg:px-12 flex items-center justify-between">
            {/* Left: Hamburger */}
            <div className="w-1/4 flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 hover:text-accent transition-colors md:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 hover:text-accent transition-colors hidden md:block"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Center: Animated Logo */}
            <div className="w-2/4 flex flex-col items-center justify-center text-center">
              <AnimatedLogo size="md" showTagline />
            </div>

            {/* Right: Search only */}
            <div className="w-1/4 flex items-center justify-end">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 -mr-2 hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation (Sticky) */}
        <div className={cn(
          "w-full transition-all duration-300 z-40 bg-background/95 backdrop-blur-sm border-b border-border",
          isScrolled ? "fixed top-0 shadow-sm py-0" : "relative"
        )}>
          <div className="container-wide px-4 md:px-10 lg:px-12">
            <Navigation />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
