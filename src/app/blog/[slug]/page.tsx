import { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/data/posts";
import BlogPostClient from "@/components/BlogPostClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `https://deployed.md/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name }],
    keywords: [post.tag, "AI", "enterprise AI", "deployed", "agentic AI"],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
      tags: [post.tag],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?title=${encodeURIComponent(post.title)}`],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post || post.content.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.isoDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Deployed",
      url: "https://deployed.md",
      logo: {
        "@type": "ImageObject",
        url: "https://deployed.md/assets/logo-horizontal-navy.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://deployed.md/blog/${post.slug}`,
    },
    articleSection: post.tag,
    wordCount: post.content
      .filter((b) => b.type === "paragraph")
      .reduce((n, b) => n + (b as { text: string }).text.split(/\s+/).length, 0),
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient slug={params.slug} />
    </>
  );
}
