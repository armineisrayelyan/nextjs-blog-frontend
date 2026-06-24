import Link from "next/link";

import { cn } from "@/lib/cn";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  basePath?: string;
  searchParams?: Record<string, string | undefined>;
}

export function Pagination({
  currentPage,
  pageCount,
  basePath = "/blog",
  searchParams = {},
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  function buildHref(page: number) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
      if (value) {
        params.set(key, value);
      }
    }

    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={cn(
          "rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100",
          currentPage === 1 && "pointer-events-none opacity-40",
        )}
      >
        Previous
      </Link>

      <div className="hidden items-center gap-1 sm:flex">
        {pages.map((page) => (
          <Link
            key={page}
            href={buildHref(page)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition",
              page === currentPage
                ? "bg-stone-900 text-white"
                : "text-stone-700 hover:bg-stone-100",
            )}
          >
            {page}
          </Link>
        ))}
      </div>

      <span className="px-2 text-sm text-stone-500 sm:hidden">
        Page {currentPage} of {pageCount}
      </span>

      <Link
        href={buildHref(Math.min(pageCount, currentPage + 1))}
        aria-disabled={currentPage === pageCount}
        className={cn(
          "rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100",
          currentPage === pageCount && "pointer-events-none opacity-40",
        )}
      >
        Next
      </Link>
    </nav>
  );
}
