import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import BaseLayout from './base-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SupaNext',
  description: 'A Next.js + Supabase + Mantine starter kit',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <BaseLayout>{children}</BaseLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
