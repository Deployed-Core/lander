import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/bip",
      },
    ],
    sitemap: "https://deployed.md/sitemap.xml",
  };
}
