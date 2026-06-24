import Image from "next/image";

import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { getStrapiMediaAlt, getStrapiMediaUrl } from "@/lib/media";
import type { ArticleBlock } from "@/types/strapi";

interface ArticleBlocksProps {
  blocks: ArticleBlock[];
}

export function ArticleBlocks({ blocks }: ArticleBlocksProps) {
  return (
    <div className="space-y-10">
      {blocks.map((block) => {
        switch (block.__component) {
          case "shared.rich-text":
            return (
              <MarkdownContent
                key={`rich-text-${block.id}`}
                content={block.body}
              />
            );

          case "shared.quote":
            return (
              <blockquote
                key={`quote-${block.id}`}
                className="rounded-2xl border border-stone-200 bg-stone-50 px-6 py-8"
              >
                <p className="text-lg font-medium leading-8 text-stone-800">
                  “{block.body}”
                </p>
                <footer className="mt-4 text-sm font-medium text-stone-500">
                  — {block.title}
                </footer>
              </blockquote>
            );

          case "shared.media": {
            const mediaUrl = getStrapiMediaUrl(block.file);
            if (!mediaUrl) {
              return null;
            }

            return (
              <figure
                key={`media-${block.id}`}
                className="overflow-hidden rounded-2xl border border-stone-200"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={mediaUrl}
                    alt={getStrapiMediaAlt(block.file)}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              </figure>
            );
          }

          case "shared.slider": {
            const files = block.files ?? [];
            if (files.length === 0) {
              return null;
            }

            return (
              <div
                key={`slider-${block.id}`}
                className="grid gap-4 sm:grid-cols-2"
              >
                {files.map((file) => {
                  const mediaUrl = getStrapiMediaUrl(file);
                  if (!mediaUrl) {
                    return null;
                  }

                  return (
                    <figure
                      key={file.documentId}
                      className="overflow-hidden rounded-2xl border border-stone-200"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={mediaUrl}
                          alt={getStrapiMediaAlt(file)}
                          fill
                          sizes="(max-width: 768px) 100vw, 384px"
                          className="object-cover"
                        />
                      </div>
                    </figure>
                  );
                })}
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
