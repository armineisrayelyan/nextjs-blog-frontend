"use client";

import Link from "next/link";
import { useState } from "react";

import { Navigation } from "@/components/layout/Navigation";
import { cn } from "@/lib/cn";

interface HeaderProps {
  siteName: string;
}

export function Header({ siteName }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-stone-900"
        >
          {siteName}
        </Link>

        <Navigation className="hidden md:flex" />

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "border-t border-stone-200 bg-white px-4 py-4 md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <Navigation
          className="flex-col items-start gap-2"
          onNavigate={() => setMobileOpen(false)}
        />
      </div>
    </header>
  );
}
