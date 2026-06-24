import { ArticleGridSkeleton } from "@/components/ui/LoadingSkeleton";

export default function AuthorDetailLoading() {
  return (
    <div className="pb-20">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 sm:flex-row sm:px-6 lg:px-8">
          <div className="h-28 w-28 animate-pulse rounded-full bg-stone-200" />
          <div className="space-y-3">
            <div className="h-4 w-16 animate-pulse rounded bg-stone-200" />
            <div className="h-10 w-48 animate-pulse rounded bg-stone-200" />
            <div className="h-5 w-56 animate-pulse rounded bg-stone-200" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ArticleGridSkeleton count={6} />
      </div>
    </div>
  );
}
