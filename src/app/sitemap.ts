import { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const BASE = "https://deployed.md";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/careers",
    "/strategy",
    "/deployment",
    "/the-deployed-fit",
    "/banking",
    "/healthcare",
    "/utilities",
    "/blog",
  ];

  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.isoDate,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pages, ...blogPages];
}
