"use client";

import Link from "next/link";
import { footerNavigation } from "../data/navigation";
import { ArrowUp, Mail } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-10 border-t border-[#222222]">
      <div className="container-wide px-4 md:px-10 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16">
          
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <div className="flex justify-start mb-3">
                <AnimatedLogo size="md" showTagline inverted className="items-start text-left" />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-6 font-sans">
                Independent global journalism covering politics, technology, business, science, and world affairs for readers demanding clarity and analytical depth.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block text-gray-500">
                Follow The Empire Times
              </span>
              <div className="flex flex-wrap gap-3">
                {footerNavigation.social.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest font-bold px-3 py-1.5 border border-[#333] text-gray-300 hover:border-accent hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">Sections</h3>
            <ul className="space-y-3">
              {footerNavigation.categories.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">Company</h3>
            <ul className="space-y-3">
              {footerNavigation.about.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/latest" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Real-Time Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Preferences */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">Legal & Support</h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#222222] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; 2026 The Empire Times Media Group Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-500 font-serif italic hidden md:inline-block">
              Designed for the modern reader
            </span>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-accent transition-colors cursor-pointer"
            >
              Back to Top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
