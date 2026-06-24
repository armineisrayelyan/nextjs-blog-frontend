import { articleDetailPopulate, articleListPopulate } from "@/lib/query";
import { strapiGet } from "@/services/api";
import type {
  Article,
  GetArticlesOptions,
  StrapiCollectionResponse,
  StrapiResponse,
} from "@/types/strapi";

function buildArticleFilters(options: GetArticlesOptions) {
  const filters: Record<string, unknown> = {};

  if (options.category) {
    filters.category = {
      slug: {
        $eq: options.category,
      },
    };
  }

  if (options.search) {
    filters.title = {
      $containsi: options.search,
    };
  }

  if (options.authorDocumentId) {
    filters.author = {
      documentId: {
        $eq: options.authorDocumentId,
      },
    };
  }

  return Object.keys(filters).length > 0 ? filters : undefined;
}

export async function getArticles(
  options: GetArticlesOptions = {},
): Promise<StrapiCollectionResponse<Article>> {
  return strapiGet<StrapiCollectionResponse<Article>>("/articles", {
    populate: articleListPopulate,
    sort: ["publishedAt:desc"],
    pagination: {
      page: options.page ?? 1,
      pageSize: options.pageSize ?? 9,
    },
    filters: buildArticleFilters(options),
  });
}

export async function getArticle(slug: string): Promise<Article | null> {
  const response = await strapiGet<StrapiCollectionResponse<Article>>(
    "/articles",
    {
      populate: articleDetailPopulate,
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
  );

  return response.data[0] ?? null;
}

export async function getArticleByDocumentId(
  documentId: string,
): Promise<StrapiResponse<Article>> {
  return strapiGet<StrapiResponse<Article>>(`/articles/${documentId}`, {
    populate: articleDetailPopulate,
  });
}

export async function getFeaturedArticles(
  count = 3,
): Promise<Article[]> {
  const response = await getArticles({ page: 1, pageSize: count });
  return response.data;
}
