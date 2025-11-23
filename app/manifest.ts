import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StoryLENS - 文字列に、世界を与える。',
    short_name: 'StoryLENS',
    description: '小説の予告編・ショート映像をAIクリエイターに依頼できるプラットフォーム',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f9fa',
    theme_color: '#cc0000',
    icons: [
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  }
}

