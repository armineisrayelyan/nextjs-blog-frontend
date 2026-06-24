import type { Metadata } from "next";

import { getStrapiMediaUrl } from "@/lib/media";
import { getGlobal } from "@/services/global";
import type { Article } from "@/types/strapi";

export async function getSiteMetadata(): Promise<{
  siteName: string;
  siteDescription: string;
}> {
  try {
    const { data } = await getGlobal();
    return {
      siteName: data.siteName,
      siteDescription: data.siteDescription,
    };
  } catch {
    return {
      siteName: "Strapi Blog",
      siteDescription: "Stories, ideas, and insights from our writers.",
    };
  }
}

export async function createRootMetadata(): Promise<Metadata> {
  const { siteName, siteDescription } = await getSiteMetadata();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      title: siteName,
      description: siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
  };
}

export function createArticleMetadata(article: Article): Metadata {
  const coverUrl = getStrapiMediaUrl(article.cover);

  return {
    title: article.title,
    description: article.description ?? undefined,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description ?? undefined,
      publishedTime: article.publishedAt ?? undefined,
      authors: article.author ? [article.author.name] : undefined,
      images: coverUrl ? [{ url: coverUrl, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description ?? undefined,
      images: coverUrl ? [coverUrl] : undefined,
    },
  };
}
