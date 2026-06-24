import { aboutPopulate } from "@/lib/query";
import { strapiGet } from "@/services/api";
import type { About, StrapiResponse } from "@/types/strapi";

export async function getAbout(): Promise<StrapiResponse<About>> {
  return strapiGet<StrapiResponse<About>>("/about", {
    populate: aboutPopulate,
  });
}
