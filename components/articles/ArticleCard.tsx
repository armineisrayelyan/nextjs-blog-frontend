import Link from "next/link";
import Image from "next/image";

import { AuthorLink } from "@/components/authors/AuthorLink";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { formatDate } from "@/lib/format";
import { getStrapiMediaAlt, getStrapiMediaUrl } from "@/lib/media";
import type { Article } from "@/types/strapi";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const coverUrl = getStrapiMediaUrl(article.cover);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-stone-100">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={getStrapiMediaAlt(article.cover)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-400">
            No cover image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-stone-500">
          {article.category && (
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-stone-700">
              {article.category.name}
            </span>
          )}
          <time dateTime={article.publishedAt ?? undefined}>
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <div className="space-y-2">
          <Link href={`/blog/${article.slug}`}>
            <h3 className="text-xl font-semibold leading-tight text-stone-900 transition-colors group-hover:text-indigo-700">
              {article.title}
            </h3>
          </Link>
          {article.description && (
            <MarkdownContent
              content={article.description}
              compact
              className="line-clamp-3 text-sm leading-6 text-stone-600"
            />
          )}
        </div>

        {article.author && (
          <p className="mt-auto text-sm text-stone-500">
            By <AuthorLink author={article.author} className="text-stone-700 hover:text-indigo-700" />
          </p>
        )}
      </div>
    </article>
  );
}
