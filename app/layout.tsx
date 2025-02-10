import { sharedMetadata, sharedViewport } from "@/utils/metadata";
import { theme } from "@/utils/theme";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
// must import after core styles
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
// import '@mantine/tiptap/styles.css';

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { ...sharedMetadata };
export const viewport: Viewport = { ...sharedViewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <ModalsProvider>
            <Notifications />
            {children}
          </ModalsProvider>
        </MantineProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
