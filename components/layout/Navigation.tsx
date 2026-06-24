import Link from "next/link";

import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
];

interface NavigationProps {
  className?: string;
  onNavigate?: () => void;
}

export function Navigation({ className, onNavigate }: NavigationProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
