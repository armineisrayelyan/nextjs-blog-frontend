import axios, { type AxiosInstance } from "axios";

import { buildStrapiQuery } from "@/lib/query";
import { getStrapiApiUrl } from "@/lib/config";
import type { StrapiQueryParams } from "@/types/strapi";

export class StrapiApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly path: string,
  ) {
    super(message);
    this.name = "StrapiApiError";
  }
}

function createApiClient(): AxiosInstance {
  return axios.create({
    baseURL: getStrapiApiUrl(),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const apiClient = createApiClient();

export async function strapiGet<T>(
  path: string,
  params?: StrapiQueryParams,
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const query = buildStrapiQuery(params);

  try {
    const response = await apiClient.get<T>(`${normalizedPath}${query}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new StrapiApiError(
        error.message,
        error.response?.status ?? 500,
        normalizedPath,
      );
    }

    throw error;
  }
}
