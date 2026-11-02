"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { headerNavigation } from "../data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex flex-col transition-opacity duration-300">
      <div className="flex justify-between items-center p-4 border-b border-border flex-shrink-0">
        <span className="font-serif text-xl font-bold tracking-tight text-[#111]">THE EMPIRE TIMES</span>
        <button onClick={onClose} className="p-2 hover:text-accent" aria-label="Close menu">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-start">
        <nav>
          <ul className="flex flex-col space-y-2.5">
            {headerNavigation.map((item) => (
              <li key={item.name} className="border-b border-border/40 pb-2">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-serif text-xl md:text-2xl font-medium hover:text-accent transition-colors block py-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 mb-6">
          <button className="w-full bg-foreground text-background font-bold uppercase tracking-widest py-3.5 hover:bg-accent transition-colors text-xs">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </div>
  );
}
