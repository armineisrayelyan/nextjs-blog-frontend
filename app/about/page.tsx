import type { Metadata } from "next";

import { ArticleBlocks } from "@/components/articles/ArticleBlocks";
import { ErrorState } from "@/components/ui/ErrorState";
import { getSiteMetadata } from "@/lib/metadata";
import { getAbout } from "@/services/about";

export async function generateMetadata(): Promise<Metadata> {
  const { siteName } = await getSiteMetadata();

  try {
    const { data } = await getAbout();

    return {
      title: data.title,
      description: `Learn more about ${siteName}.`,
      openGraph: {
        title: `${data.title} | ${siteName}`,
        description: `Learn more about ${siteName}.`,
      },
    };
  } catch {
    return {
      title: "About",
      description: `Learn more about ${siteName}.`,
    };
  }
}

export default async function AboutPage() {
  try {
    const { data: about } = await getAbout();

    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            About
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            {about.title}
          </h1>
        </div>

        {about.blocks && about.blocks.length > 0 ? (
          <ArticleBlocks blocks={about.blocks} />
        ) : (
          <p className="text-lg leading-8 text-stone-600">
            This blog is powered by Strapi and Next.js — a modern headless CMS
            stack for publishing beautiful content on the web.
          </p>
        )}
      </div>
    );
  } catch {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <ErrorState />
      </div>
    );
  }
}
