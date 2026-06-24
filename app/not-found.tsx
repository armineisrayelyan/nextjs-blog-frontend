import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-stone-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
      >
        Back to home
      </Link>
    </div>
  );
}
