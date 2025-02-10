import type { Metadata, Viewport } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const description = "Next/Supabase/Mantine starter template";

export const sharedMetadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SupaMan",
  description,
  applicationName: "SupaMan",
  authors: [{ name: "Itai Axelrad" }],
  generator: "Next.js",
  keywords: ["SupaMan", "Next", "Supabase", "Mantine", "template", "starter"],
  referrer: "origin-when-cross-origin",
  colorScheme: null,
  creator: "SupaMan Team",
  publisher: "SupaMan Team",
  robots: "index, follow",
  icons: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "SupaMan",
    siteName: "SupaMan",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SupaMan" }],
    locale: "en_US",
    url: defaultUrl,
  },
  twitter: {
    card: "summary_large_image",
    site: "@SupaMan",
    creator: "@SupaMan",
    title: "SupaMan",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SupaMan" }],
  },
};

export const sharedViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: false,
  themeColor: "#748FFC",
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
