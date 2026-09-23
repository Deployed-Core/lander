import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.deployed.md"),
  title: {
    default: "Deployed — Applied AI for the enterprise",
    template: "%s — Deployed",
  },
  description:
    "We build custom AI systems around how your organisation already operates — then hand them over.",
  openGraph: {
    title: "Deployed — Applied AI for the enterprise",
    description:
      "We build custom AI systems around how your organisation already operates — then hand them over.",
    images: [{ url: "/assets/dep-preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deployed — Applied AI for the enterprise",
    description:
      "We build custom AI systems around how your organisation already operates — then hand them over.",
    images: ["/assets/dep-preview.png"],
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
