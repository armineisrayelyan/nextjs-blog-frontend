import type { NextConfig } from "next";

function getStrapiImageConfig() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const origins = new Set([
    baseUrl.replace(/\/$/, ""),
    "http://localhost:1337",
    "http://127.0.0.1:1337",
  ]);

  const remotePatterns = Array.from(origins).map((origin) => {
    const parsed = new URL(origin);

    return {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port || "1337",
      pathname: "/uploads/**",
      search: "",
    };
  });

  const isLocalStrapi = remotePatterns.some(
    (pattern) =>
      pattern.hostname === "localhost" ||
      pattern.hostname === "127.0.0.1" ||
      pattern.hostname === "::1",
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
