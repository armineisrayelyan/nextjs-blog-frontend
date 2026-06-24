"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/cn";
import type { Category } from "@/types/strapi";

interface CategoryFilterProps {
  categories: Category[];
  basePath?: string;
}

export function CategoryFilter({
  categories,
  basePath = "/blog",
}: CategoryFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function buildHref(slug?: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    params.delete("page");

    const queryString = params.toString();
    const path = basePath === pathname ? basePath : basePath;
    return queryString ? `${path}?${queryString}` : path;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref()}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
          !activeCategory
            ? "bg-stone-900 text-white"
            : "bg-stone-100 text-stone-700 hover:bg-stone-200",
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.documentId}
          href={buildHref(category.slug)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors",
            activeCategory === category.slug
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200",
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
