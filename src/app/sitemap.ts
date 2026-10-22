import { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { reports } from "@/data/reports";

const BASE = "https://www.deployed.md";

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

  const reportPages: MetadataRoute.Sitemap = reports.map((report) => ({
    url: `${BASE}/report/${report.slug}`,
    lastModified: report.isoDate,
    changeFrequency: "yearly" as const,
    priority: 0.85,
  }));

  return [...pages, ...blogPages, ...reportPages];
}
