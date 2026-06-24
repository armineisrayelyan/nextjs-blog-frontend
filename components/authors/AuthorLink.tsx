import Link from "next/link";

import type { Author } from "@/types/strapi";

interface AuthorLinkProps {
  author: Author;
  className?: string;
}

export function AuthorLink({ author, className }: AuthorLinkProps) {
  return (
    <Link
      href={`/authors/${author.documentId}`}
      className={className ?? "font-medium text-stone-900 hover:text-indigo-700"}
    >
      {author.name}
    </Link>
  );
}
