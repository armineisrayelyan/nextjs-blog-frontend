import { getApiBaseUrl } from "@/lib/config";
import type { StrapiMedia } from "@/types/strapi";

export function getStrapiMediaUrl(
  media: StrapiMedia | string | null | undefined,
): string | null {
  if (!media) {
    return null;
  }

  const url = typeof media === "string" ? media : media.url;

  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${getApiBaseUrl()}${url}`;
}

export function getStrapiMediaAlt(media: StrapiMedia | null | undefined): string {
  return media?.alternativeText ?? media?.name ?? "Article image";
}
