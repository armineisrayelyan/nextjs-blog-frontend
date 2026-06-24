import type { Metadata } from "next";

import { ArticleCard } from "@/components/articles/ArticleCard";
import { BlogToolbar } from "@/components/blog/BlogToolbar";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Pagination } from "@/components/ui/Pagination";
import { getSiteMetadata } from "@/lib/metadata";
import { getArticles } from "@/services/articles";
import { getCategories } from "@/services/categories";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteName } = await getSiteMetadata();

  return {
    title: "Blog",
    description: `Read the latest articles from ${siteName}.`,
    openGraph: {
      title: `Blog | ${siteName}`,
      description: `Read the latest articles from ${siteName}.`,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, q, category } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  try {
    const [articlesResponse, categoriesResponse] = await Promise.all([
      getArticles({
        page: currentPage,
        pageSize: 9,
        search: q,
        category,
      }),
      getCategories(),
    ]);

    const { data: articles, meta } = articlesResponse;
    const categories = categoriesResponse.data;
    const pageCount = meta.pagination?.pageCount ?? 1;

    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Blog
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            All articles
          </h1>
          <p className="text-lg leading-8 text-stone-600">
            Explore stories, tutorials, and ideas from our writers.
          </p>
        </div>

        <div className="mb-10">
          <BlogToolbar
            categories={categories}
            searchDefaultValue={q}
            basePath="/blog"
          />
        </div>

        {articles.length === 0 ? (
          <EmptyState
            title="No articles found"
            description="Try a different search term or category to find what you're looking for."
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.documentId} article={article} />
              ))}
            </div>

            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                basePath="/blog"
                searchParams={{ q, category }}
              />
            </div>
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
