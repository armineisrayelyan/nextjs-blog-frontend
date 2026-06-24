import Link from "next/link";

interface FooterProps {
  siteName: string;
  siteDescription: string;
}

export function Footer({ siteName, siteDescription }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="text-lg font-semibold text-stone-900">{siteName}</p>
          <p className="text-sm leading-6 text-stone-600">{siteDescription}</p>
        </div>

        <div className="flex gap-8 text-sm text-stone-600">
          <div className="space-y-2">
            <p className="font-medium text-stone-900">Explore</p>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:text-stone-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-stone-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-stone-900">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-stone-900">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200 py-6 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} {siteName}. Built with Next.js and Strapi.
      </div>
    </footer>
  );
}
