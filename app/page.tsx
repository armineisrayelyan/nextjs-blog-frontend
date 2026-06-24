import Link from "next/link";

import { ArticleCard } from "@/components/articles/ArticleCard";
import { FeaturedArticle } from "@/components/articles/FeaturedArticle";
import { BlogToolbar } from "@/components/blog/BlogToolbar";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { getArticles } from "@/services/articles";
import { getCategories } from "@/services/categories";
import { getSiteMetadata } from "@/lib/metadata";

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, category } = await searchParams;
  const { siteName, siteDescription } = await getSiteMetadata();

  try {
    const [articlesResponse, categoriesResponse] = await Promise.all([
      getArticles({ page: 1, pageSize: 7, search: q, category }),
      getCategories(),
    ]);

    const articles = articlesResponse.data;
    const categories = categoriesResponse.data;
    const [featured, ...rest] = articles;
    const secondaryFeatured = rest.slice(0, 2);
    const latestArticles = rest.slice(2);

    return (
      <div>
        <section className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Welcome
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                {siteName}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
                {siteDescription}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
                >
                  Browse all articles
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                >
                  About us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <BlogToolbar
            categories={categories}
            searchDefaultValue={q}
            basePath="/"
          />
        </section>

        {articles.length === 0 ? (
          <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
            <EmptyState
              title="No articles found"
              description="Try adjusting your search or category filter to discover more stories."
            />
          </section>
        ) : (
          <>
            {featured && !q && !category && (
              <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                      Featured
                    </p>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900">
                      Editor&apos;s pick
                    </h2>
                  </div>
                </div>
                <FeaturedArticle article={featured} featured />
              </section>
            )}

            {secondaryFeatured.length > 0 && !q && !category && (
              <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  {secondaryFeatured.map((article) => (
                    <FeaturedArticle key={article.documentId} article={article} />
                  ))}
                </div>
              </section>
            )}

            <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                    Latest
                  </p>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-stone-900">
                    {q || category ? "Results" : "Recent stories"}
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-indigo-700 hover:text-indigo-800"
                >
                  View all
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(q || category ? articles : latestArticles).map((article) => (
                  <ArticleCard key={article.documentId} article={article} />
                ))}
              </div>
            </section>
          </>
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
