import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleBlocks } from "@/components/articles/ArticleBlocks";
import { AuthorLink } from "@/components/authors/AuthorLink";
import { ErrorState } from "@/components/ui/ErrorState";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { formatDate } from "@/lib/format";
import { createArticleMetadata } from "@/lib/metadata";
import { getStrapiMediaAlt, getStrapiMediaUrl } from "@/lib/media";
import { getArticle, getArticles } from "@/services/articles";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const { data } = await getArticles({ page: 1, pageSize: 100 });
    return data.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticle(slug);
    if (!article) {
      return { title: "Article not found" };
    }

    return createArticleMetadata(article);
  } catch {
    return { title: "Article" };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  try {
    const article = await getArticle(slug);

    if (!article) {
      notFound();
    }

    const coverUrl = getStrapiMediaUrl(article.cover);

    return (
      <article className="pb-20">
        <div className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-stone-500">
              {article.category && (
                <Link
                  href={`/blog?category=${article.category.slug}`}
                  className="rounded-full bg-stone-100 px-3 py-1 font-medium text-stone-700 hover:bg-stone-200"
                >
                  {article.category.name}
                </Link>
              )}
              <time dateTime={article.publishedAt ?? undefined}>
                {formatDate(article.publishedAt)}
              </time>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            {article.description && (
              <MarkdownContent
                content={article.description}
                compact
                className="mt-6 text-xl leading-8 text-stone-600"
              />
            )}

            {article.author && (
              <div className="mt-8 flex items-center gap-3">
                <Link
                  href={`/authors/${article.author.documentId}`}
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-stone-900 text-sm font-semibold text-white transition hover:ring-2 hover:ring-indigo-200"
                >
                  {article.author.name.charAt(0)}
                </Link>
                <div>
                  <p className="font-medium text-stone-900">
                    <AuthorLink author={article.author} />
                  </p>
                  <p className="text-sm text-stone-500">{article.author.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {coverUrl && (
          <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-stone-200 shadow-lg">
              <Image
                src={coverUrl}
                alt={getStrapiMediaAlt(article.cover)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {article.blocks && article.blocks.length > 0 ? (
            <ArticleBlocks blocks={article.blocks} />
          ) : (
            <p className="text-stone-600">This article has no content yet.</p>
          )}
        </div>
      </article>
    );
  } catch {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <ErrorState />
      </div>
    );
  }
}
