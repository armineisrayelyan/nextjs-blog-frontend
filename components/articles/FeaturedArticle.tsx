import Link from "next/link";
import Image from "next/image";

import { AuthorLink } from "@/components/authors/AuthorLink";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { formatDate } from "@/lib/format";
import { getStrapiMediaAlt, getStrapiMediaUrl } from "@/lib/media";
import type { Article } from "@/types/strapi";

interface FeaturedArticleProps {
  article: Article;
  featured?: boolean;
}

export function FeaturedArticle({ article, featured = false }: FeaturedArticleProps) {
  const coverUrl = getStrapiMediaUrl(article.cover);

  return (
    <article
      className={
        featured
          ? "group relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-900 text-white shadow-xl"
          : "group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      }
    >
      <div
        className={
          featured
            ? "grid gap-0 lg:grid-cols-2"
            : "flex h-full flex-col"
        }
      >
        <Link
          href={`/blog/${article.slug}`}
          className={
            featured
              ? "relative min-h-72 overflow-hidden lg:min-h-[28rem]"
              : "relative aspect-[16/10] overflow-hidden bg-stone-100"
          }
        >
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={getStrapiMediaAlt(article.cover)}
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              className={
                featured
                  ? "object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  : "object-cover transition-transform duration-500 group-hover:scale-105"
              }
              priority={featured}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-stone-800 text-stone-400">
              No cover image
            </div>
          )}
          {featured && <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent lg:bg-gradient-to-r" />}
        </Link>

        <div
          className={
            featured
              ? "relative flex flex-col justify-center gap-4 p-8 lg:p-12"
              : "flex flex-1 flex-col gap-3 p-5"
          }
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
            {featured && (
              <span className="rounded-full bg-indigo-500 px-2.5 py-1 text-white">
                Featured
              </span>
            )}
            {article.category && (
              <span
                className={
                  featured
                    ? "rounded-full bg-white/10 px-2.5 py-1 text-stone-200"
                    : "rounded-full bg-stone-100 px-2.5 py-1 text-stone-700"
                }
              >
                {article.category.name}
              </span>
            )}
            <time
              dateTime={article.publishedAt ?? undefined}
              className={featured ? "text-stone-300" : "text-stone-500"}
            >
              {formatDate(article.publishedAt)}
            </time>
          </div>

          <div className="space-y-3">
            <Link href={`/blog/${article.slug}`}>
              <h3
                className={
                  featured
                    ? "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                    : "text-xl font-semibold leading-tight text-stone-900 group-hover:text-indigo-700"
                }
              >
                {article.title}
              </h3>
            </Link>
            {article.description && (
              <MarkdownContent
                content={article.description}
                compact
                className={
                  featured
                    ? "max-w-xl text-base leading-7 text-stone-300 sm:text-lg [&_em]:text-stone-200"
                    : "line-clamp-3 text-sm leading-6 text-stone-600"
                }
              />
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            {article.author && (
              <p className={featured ? "text-sm text-stone-300" : "text-sm text-stone-500"}>
                By{" "}
                <AuthorLink
                  author={article.author}
                  className={
                    featured
                      ? "text-stone-200 hover:text-white"
                      : "text-stone-700 hover:text-indigo-700"
                  }
                />
              </p>
            )}
            <Link
              href={`/blog/${article.slug}`}
              className={
                featured
                  ? "inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100"
                  : "text-sm font-medium text-indigo-700 hover:text-indigo-800"
              }
            >
              Read article
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
