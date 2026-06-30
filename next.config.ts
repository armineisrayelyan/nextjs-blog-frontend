import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

function getStrapiImageConfig() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const origins = new Set([
    baseUrl.replace(/\/$/, ""),
    "http://localhost:1337",
    "http://127.0.0.1:1337",
  ]);

  const remotePatterns: RemotePattern[] = [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
      search: "",
    },
    ...Array.from(origins).map((origin) => {
      const parsed = new URL(origin);

      return {
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        port: parsed.port,
        pathname: "/uploads/**",
        search: "",
      };
    }),
  ];

  const isLocalStrapi = remotePatterns.some((pattern) =>
    ["localhost", "127.0.0.1", "::1"].includes(pattern.hostname),
  );

  return {
    remotePatterns,
    // Next.js 16 blocks optimizing images from local/private IPs by default.
    dangerouslyAllowLocalIP: isLocalStrapi,
  };
}

const nextConfig: NextConfig = {
  images: getStrapiImageConfig(),
};

export default nextConfig;
