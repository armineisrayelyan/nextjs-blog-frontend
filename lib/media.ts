import { getApiBaseUrl } from "@/lib/config";
import type { StrapiMedia } from "@/types/strapi";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

function rewriteLocalMediaUrl(url: string): string {
  try {
    const parsed = new URL(url);

    if (
      LOCAL_HOSTNAMES.has(parsed.hostname) &&
      parsed.pathname.startsWith("/uploads")
    ) {
      return `${getApiBaseUrl()}${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return url;
  }

  return url;
}

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
    return rewriteLocalMediaUrl(url);
  }

  return `${getApiBaseUrl()}${url}`;
}

export function getStrapiMediaAlt(media: StrapiMedia | null | undefined): string {
  return media?.alternativeText ?? media?.name ?? "Article image";
}
