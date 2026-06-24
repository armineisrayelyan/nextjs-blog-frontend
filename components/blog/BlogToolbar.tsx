import { Suspense } from "react";

import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { SearchBar } from "@/components/ui/SearchBar";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import type { Category } from "@/types/strapi";

interface BlogToolbarProps {
  categories: Category[];
  searchDefaultValue?: string;
  basePath?: string;
}

function ToolbarFallback() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-12 w-full" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton key={index} className="h-9 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export function BlogToolbar({
  categories,
  searchDefaultValue = "",
  basePath = "/blog",
}: BlogToolbarProps) {
  return (
    <div className="space-y-4">
      <Suspense fallback={<LoadingSkeleton className="h-12 w-full" />}>
        <SearchBar defaultValue={searchDefaultValue} basePath={basePath} />
      </Suspense>
      <Suspense fallback={<ToolbarFallback />}>
        <CategoryFilter categories={categories} basePath={basePath} />
      </Suspense>
    </div>
  );
}
