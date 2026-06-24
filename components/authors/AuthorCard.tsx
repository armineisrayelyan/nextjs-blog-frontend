import Link from "next/link";
import Image from "next/image";

import { getStrapiMediaAlt, getStrapiMediaUrl } from "@/lib/media";
import type { Author } from "@/types/strapi";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const avatarUrl = getStrapiMediaUrl(author.avatar);

  return (
    <Link
      href={`/authors/${author.documentId}`}
      className="group flex flex-col items-center rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-stone-100 ring-2 ring-stone-100 transition group-hover:ring-indigo-100">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={getStrapiMediaAlt(author.avatar)}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-900 text-2xl font-semibold text-white">
            {author.name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-stone-900 transition-colors group-hover:text-indigo-700">
        {author.name}
      </h3>
      <p className="mt-1 text-sm text-stone-500">{author.email}</p>
    </Link>
  );
}
