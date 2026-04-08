import { siteConfig } from "./site-config";

export interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function buildSeo({ title, description, path = "/", image }: SeoProps = {}) {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — Imaging & Diagnostics for Chiropractors`;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}${siteConfig.ogImage}`;
  return {
    title: fullTitle,
    description: description || siteConfig.description,
    url,
    image: ogImage,
  };
}
