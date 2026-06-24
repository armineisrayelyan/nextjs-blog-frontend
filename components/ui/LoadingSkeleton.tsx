import { cn } from "@/lib/cn";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={cn("animate-pulse rounded-2xl bg-stone-200/80", className)} />;
}

export function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <LoadingSkeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <LoadingSkeleton className="h-4 w-24" />
        <LoadingSkeleton className="h-7 w-full" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function FeaturedArticleSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
      <div className="grid gap-0 lg:grid-cols-2">
        <LoadingSkeleton className="min-h-72 rounded-none lg:min-h-[28rem]" />
        <div className="space-y-4 p-8">
          <LoadingSkeleton className="h-4 w-32" />
          <LoadingSkeleton className="h-12 w-full" />
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-5/6" />
          <LoadingSkeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}
