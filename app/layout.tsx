import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoryLENS - テキストに宿る物語の魂を映像化しよう",
  description: "小説の予告編・ショート映像をAIクリエイターに依頼できるプラットフォーム",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '512x512' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '192x192' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '32x32' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '180x180' },
    ],
    shortcut: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

