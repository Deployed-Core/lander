import { Metadata } from "next";
import { notFound } from "next/navigation";
import { reports, getReportBySlug } from "@/data/reports";
import ReportClient from "@/components/ReportClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const report = getReportBySlug(params.slug);
  if (!report) return {};

  const url = `https://www.deployed.md/report/${report.slug}`;
  const imageUrl =
    report.coverImage ||
    `/api/og?title=${encodeURIComponent(report.title)}`;

  return {
    title: `${report.title} — Report`,
    description: report.description,
    authors: report.authors.map((a) => ({ name: a.name })),
    keywords: [
      ...report.keywords,
      report.tag,
      "report",
      "research",
      "whitepaper",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: report.title,
      description: report.description,
      url,
      siteName: "Deployed",
      locale: "en_US",
      type: "article",
      publishedTime: report.isoDate,
      modifiedTime: report.isoDate,
      authors: report.authors.map((a) => a.name),
      tags: report.keywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: report.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: report.title,
      description: report.description,
      images: [imageUrl],
      creator: "@deployedmd",
      site: "@deployedmd",
    },
    other: {
      "article:author": report.authors.map((a) => a.name).join(", "),
      "article:published_time": report.isoDate,
      "article:section": report.tag,
    },
  };
}

export default function ReportPage({ params }: Props) {
  const report = getReportBySlug(params.slug);
  if (!report) notFound();

  const reportUrl = `https://www.deployed.md/report/${report.slug}`;
  const imageUrl = report.coverImage
    ? `https://www.deployed.md${report.coverImage}`
    : `https://www.deployed.md/api/og?title=${encodeURIComponent(report.title)}`;

  const reportJsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: report.title,
    alternativeHeadline: report.subtitle,
    description: report.description,
    image: imageUrl,
    datePublished: report.isoDate,
    dateModified: report.isoDate,
    author: report.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      jobTitle: a.role,
      affiliation: {
        "@type": "Organization",
        name: a.organization,
      },
      ...(a.linkedIn && { sameAs: [a.linkedIn] }),
      ...(a.avatarImage && {
        image: `https://www.deployed.md${a.avatarImage}`,
      }),
    })),
    publisher: {
      "@type": "Organization",
      name: "Deployed",
      url: "https://www.deployed.md",
      logo: {
        "@type": "ImageObject",
        url: "https://www.deployed.md/assets/logo-horizontal-navy.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": reportUrl,
    },
    url: reportUrl,
    about: report.tag,
    keywords: report.keywords.join(", "),
    timeRequired: `PT${report.readingTime}M`,
    inLanguage: "en",
    isAccessibleForFree: true,
    ...(report.pdfUrl && {
      encoding: {
        "@type": "MediaObject",
        contentUrl: report.pdfUrl,
        encodingFormat: "application/pdf",
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.deployed.md",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reports",
        item: "https://www.deployed.md/report",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: report.title,
        item: reportUrl,
      },
    ],
  };

  const faqJsonLd = report.content.some((b) => b.type === "at-a-glance")
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What are the key findings of ${report.title}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: (
                report.content.find(
                  (b) => b.type === "at-a-glance"
                ) as { items: string[] } | undefined
              )?.items.join(" "),
            },
          },
        ],
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reportJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}
      <ReportClient slug={params.slug} />
    </>
  );
}
