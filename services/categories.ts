import { strapiGet } from "@/services/api";
import type {
  Category,
  StrapiCollectionResponse,
  StrapiResponse,
} from "@/types/strapi";

export async function getCategories(): Promise<
  StrapiCollectionResponse<Category>
> {
  return strapiGet<StrapiCollectionResponse<Category>>("/categories", {
    sort: ["name:asc"],
  });
}

export async function getCategory(slug: string): Promise<Category | null> {
  const response = await strapiGet<StrapiCollectionResponse<Category>>(
    "/categories",
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
  );

  return response.data[0] ?? null;
}

export async function getCategoryByDocumentId(
  documentId: string,
): Promise<StrapiResponse<Category>> {
  return strapiGet<StrapiResponse<Category>>(`/categories/${documentId}`);
}
