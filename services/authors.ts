import { strapiGet } from "@/services/api";
import type {
  Author,
  StrapiCollectionResponse,
  StrapiResponse,
} from "@/types/strapi";

const authorPopulate = {
  avatar: true,
} as const;

export async function getAuthors(): Promise<StrapiCollectionResponse<Author>> {
  return strapiGet<StrapiCollectionResponse<Author>>("/authors", {
    populate: authorPopulate,
    sort: ["name:asc"],
  });
}

export async function getAuthor(
  documentId: string,
): Promise<Author | null> {
  try {
    const response = await strapiGet<StrapiResponse<Author>>(
      `/authors/${documentId}`,
      {
        populate: authorPopulate,
      },
    );

    return response.data;
  } catch {
    return null;
  }
}
