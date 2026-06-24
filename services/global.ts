import { globalPopulate } from "@/lib/query";
import { strapiGet } from "@/services/api";
import type { Global, StrapiResponse } from "@/types/strapi";

export async function getGlobal(): Promise<StrapiResponse<Global>> {
  return strapiGet<StrapiResponse<Global>>("/global", {
    populate: globalPopulate,
  });
}
