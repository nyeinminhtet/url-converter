import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://url-tool-extension.vercel.app"),
  title: {
    default: "URL Encoder & Decoder Tool",
    template: "%s | URL Encoder & Decoder Tool",
  },
  description:
    "Free online URL encoder and decoder tool to encode URLs, decode percent-encoded strings, auto-detect encoded text, and copy results instantly.",
  applicationName: "URL Encoder & Decoder Tool",
  keywords: [
    "url encoder",
    "url decoder",
    "encodeURIComponent",
    "decodeURIComponent",
    "percent encoding",
    "query string tool",
    "developer utility",
  ],
  authors: [{ name: "Nyein Min Htet" }],
  creator: "Nyein Min Htet",
  publisher: "Nyein Min Htet",
  category: "developer tools",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "URL Encoder & Decoder Tool",
    description:
      "Encode URLs, decode percent-encoded strings, auto-detect encoded text, and copy results from a clean web interface.",
    url: "https://url-tool-extension.vercel.app",
    siteName: "URL Encoder & Decoder Tool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder & Decoder Tool",
    description:
      "Free online tool for encoding URLs and decoding percent-encoded strings.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
