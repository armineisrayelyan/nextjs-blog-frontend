export default function AuthorsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl space-y-4">
        <div className="h-4 w-20 animate-pulse rounded bg-stone-200" />
        <div className="h-12 w-full animate-pulse rounded bg-stone-200" />
        <div className="h-6 w-5/6 animate-pulse rounded bg-stone-200" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl border border-stone-200 bg-white p-6"
          >
            <div className="mb-4 h-24 w-24 animate-pulse rounded-full bg-stone-200" />
            <div className="h-5 w-32 animate-pulse rounded bg-stone-200" />
            <div className="mt-2 h-4 w-40 animate-pulse rounded bg-stone-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
