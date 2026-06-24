/** Shared Strapi v5 REST response shapes and content-type models. */

export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiMediaFormats {
  thumbnail?: StrapiMediaFormat;
  small?: StrapiMediaFormat;
  medium?: StrapiMediaFormat;
  large?: StrapiMediaFormat;
}

export interface StrapiMedia extends StrapiEntity {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: StrapiMediaFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination?: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export type StrapiPopulateMap = {
  [key: string]: StrapiPopulateValue;
};

export type StrapiPopulatePrimitive = "*" | boolean | string | readonly string[];

export type StrapiPopulateValue = StrapiPopulatePrimitive | StrapiPopulateMap;

export interface StrapiQueryParams {
  populate?: StrapiPopulateValue;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
    withCount?: boolean;
  };
  fields?: string[];
  locale?: string;
}

export interface Category extends StrapiEntity {
  name: string;
  slug: string;
  description: string | null;
}

export interface Author extends StrapiEntity {
  name: string;
  slug: string;
  email: string;
  avatar?: StrapiMedia | null;
}

export interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

export interface MediaBlock {
  __component: "shared.media";
  id: number;
  file?: StrapiMedia | null;
}

export interface QuoteBlock {
  __component: "shared.quote";
  id: number;
  title: string;
  body: string;
}

export interface SliderBlock {
  __component: "shared.slider";
  id: number;
  files?: StrapiMedia[];
}

export type ArticleBlock =
  | RichTextBlock
  | MediaBlock
  | QuoteBlock
  | SliderBlock;

export interface Article extends StrapiEntity {
  title: string;
  slug: string;
  description: string | null;
  cover?: StrapiMedia | null;
  category?: Category | null;
  author?: Author | null;
  blocks?: ArticleBlock[];
}

export interface DefaultSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
}

export interface Global extends StrapiEntity {
  siteName: string;
  siteDescription: string;
  favicon?: StrapiMedia | null;
  defaultSeo?: DefaultSeo | null;
}

export interface About extends StrapiEntity {
  title: string;
  blocks?: ArticleBlock[];
}

export interface GetArticlesOptions {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
  authorDocumentId?: string;
}
