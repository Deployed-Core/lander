import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deployed.md"),
  title: "deployed.md",
  description: "coming soon . . .",
  openGraph: {
    title: "deployed.md",
    description: "coming soon . . .",
    images: [{ url: "/assets/dep-preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "deployed.md",
    description: "coming soon . . .",
    images: ["/assets/dep-preview.png"],
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
