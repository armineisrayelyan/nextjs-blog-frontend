import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/articles/ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { getStrapiMediaAlt, getStrapiMediaUrl } from "@/lib/media";
import { getSiteMetadata } from "@/lib/metadata";
import { getArticles } from "@/services/articles";
import { getAuthor, getAuthors } from "@/services/authors";

interface AuthorPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const { data } = await getAuthors();
    return data.map((author) => ({ documentId: author.documentId }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { documentId } = await params;
  const { siteName } = await getSiteMetadata();

  try {
    const author = await getAuthor(documentId);

    if (!author) {
      return { title: "Author not found" };
    }

    const avatarUrl = getStrapiMediaUrl(author.avatar);

    return {
      title: author.name,
      description: `Articles written by ${author.name} on ${siteName}.`,
      openGraph: {
        title: `${author.name} | ${siteName}`,
        description: `Articles written by ${author.name}.`,
        ...(avatarUrl ? { images: [{ url: avatarUrl, alt: author.name }] } : {}),
      },
    };
  } catch {
    return { title: "Author" };
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { documentId } = await params;

  try {
    const [author, articlesResponse] = await Promise.all([
      getAuthor(documentId),
      getArticles({ authorDocumentId: documentId, pageSize: 100 }),
    ]);

    if (!author) {
      notFound();
    }

    const articles = articlesResponse.data;
    const avatarUrl = getStrapiMediaUrl(author.avatar);

    return (
      <div className="pb-20">
        <section className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-stone-100 ring-4 ring-stone-100">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={getStrapiMediaAlt(author.avatar)}
                    fill
                    sizes="112px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-stone-900 text-3xl font-semibold text-white">
                    {author.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Author
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                  {author.name}
                </h1>
                <p className="text-lg text-stone-600">{author.email}</p>
                <p className="text-sm text-stone-500">
                  {articles.length}{" "}
                  {articles.length === 1 ? "article" : "articles"} published
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-stone-900">
            Articles by {author.name}
          </h2>

          {articles.length === 0 ? (
            <EmptyState
              title="No articles yet"
              description={`${author.name} has not published any articles yet.`}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.documentId} article={article} />
              ))}
            </div>
          )}
        </section>
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
