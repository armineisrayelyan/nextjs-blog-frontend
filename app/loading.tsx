import { ArticleGridSkeleton, FeaturedArticleSkeleton } from "@/components/ui/LoadingSkeleton";

export default function HomeLoading() {
  return (
    <div className="space-y-12 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
          <div className="h-14 w-full animate-pulse rounded bg-stone-200" />
          <div className="h-6 w-5/6 animate-pulse rounded bg-stone-200" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FeaturedArticleSkeleton />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ArticleGridSkeleton count={6} />
      </div>
    </div>
  );
}
