import type { StrapiQueryParams } from "@/types/strapi";

function appendQueryValue(
  searchParams: URLSearchParams,
  key: string,
  value: unknown,
): void {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendQueryValue(searchParams, `${key}[${index}]`, item);
    });
    return;
  }

  if (typeof value === "object") {
    for (const [nestedKey, nestedValue] of Object.entries(
      value as Record<string, unknown>,
    )) {
      appendQueryValue(searchParams, `${key}[${nestedKey}]`, nestedValue);
    }
    return;
  }

  searchParams.append(key, String(value));
}

export function buildStrapiQuery(params: StrapiQueryParams = {}): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    appendQueryValue(searchParams, key, value);
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export const articleListPopulate = {
  cover: true,
  category: true,
  author: true,
} as const;

export const blocksPopulate = {
  on: {
    "shared.rich-text": true,
    "shared.quote": true,
    "shared.media": {
      populate: ["file"],
    },
    "shared.slider": {
      populate: ["files"],
    },
  },
} as const;

export const articleDetailPopulate = {
  cover: true,
  category: true,
  author: true,
  blocks: blocksPopulate,
} as const;

export const aboutPopulate = {
  blocks: blocksPopulate,
} as const;

export const globalPopulate = {
  favicon: true,
  defaultSeo: true,
} as const;
