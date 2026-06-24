const DEFAULT_API_URL = "http://localhost:1337";

export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? DEFAULT_API_URL
  );
}

export function getStrapiApiUrl(): string {
  return `${getApiBaseUrl()}/api`;
}
