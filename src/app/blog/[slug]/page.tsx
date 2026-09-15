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
  const imageUrl =
    post.coverImage ||
    `/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name, url: post.author.url }],
    keywords: [...post.keywords, post.tag],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Deployed",
      locale: "en_US",
      type: "article",
      publishedTime: post.isoDate,
      modifiedTime: post.isoDate,
      authors: [post.author.name],
      tags: post.keywords,
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
      creator: "@deployedmd",
      site: "@deployedmd",
    },
    other: {
      "article:author": post.author.name,
      "article:published_time": post.isoDate,
      "article:section": post.tag,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post || post.content.length === 0) notFound();

  const postUrl = `https://deployed.md/blog/${post.slug}`;
  const imageUrl = post.coverImage
    ? `https://deployed.md${post.coverImage}`
    : `https://deployed.md/api/og?title=${encodeURIComponent(post.title)}`;

  const authorSameAs = [
    post.author.url,
    post.author.linkedIn,
  ].filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      ...(post.author.url && { url: post.author.url }),
      ...(authorSameAs.length > 0 && { sameAs: authorSameAs }),
      ...(post.author.avatarImage && {
        image: `https://deployed.md${post.author.avatarImage}`,
      }),
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
      "@id": postUrl,
    },
    url: postUrl,
    articleSection: post.tag,
    keywords: post.keywords.join(", "),
    wordCount: post.content
      .filter((b) => b.type === "paragraph")
      .reduce(
        (n, b) => n + (b as { text: string }).text.split(/\s+/).length,
        0
      ),
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: "en",
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h2", "article p:first-of-type", "blockquote"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://deployed.md/blog",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.tag,
        item: `https://deployed.md/blog?tag=${post.tag}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: post.author.name,
    jobTitle: post.author.role,
    worksFor: {
      "@type": "Organization",
      name: "Deployed",
      url: "https://deployed.md",
    },
    ...(post.author.url && { url: post.author.url }),
    ...(authorSameAs.length > 0 && { sameAs: authorSameAs }),
    ...(post.author.avatarImage && {
      image: `https://deployed.md${post.author.avatarImage}`,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd),
        }}
      />
      <BlogPostClient slug={params.slug} />
    </>
  );
}
