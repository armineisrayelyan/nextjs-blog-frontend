import { ArticleGridSkeleton } from "@/components/ui/LoadingSkeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl space-y-4">
        <div className="h-4 w-16 animate-pulse rounded bg-stone-200" />
        <div className="h-12 w-full animate-pulse rounded bg-stone-200" />
        <div className="h-6 w-5/6 animate-pulse rounded bg-stone-200" />
      </div>
      <ArticleGridSkeleton count={9} />
    </div>
  );
}
