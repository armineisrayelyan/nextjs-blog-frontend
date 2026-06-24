import type { Metadata } from "next";

import { AuthorCard } from "@/components/authors/AuthorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { getSiteMetadata } from "@/lib/metadata";
import { getAuthors } from "@/services/authors";

export async function generateMetadata(): Promise<Metadata> {
  const { siteName } = await getSiteMetadata();

  return {
    title: "Authors",
    description: `Meet the writers behind ${siteName}.`,
    openGraph: {
      title: `Authors | ${siteName}`,
      description: `Meet the writers behind ${siteName}.`,
    },
  };
}

export default async function AuthorsPage() {
  try {
    const { data: authors } = await getAuthors();

    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Authors
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Our writers
          </h1>
          <p className="text-lg leading-8 text-stone-600">
            Discover the people creating stories, guides, and ideas on this blog.
          </p>
        </div>

        {authors.length === 0 ? (
          <EmptyState
            title="No authors found"
            description="Authors will appear here once they are added in Strapi."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map((author) => (
              <AuthorCard key={author.documentId} author={author} />
            ))}
          </div>
        )}
      </div>
    );
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <ErrorState />
      </div>
    );
  }
}
