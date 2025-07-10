import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reels & Videos - Elinor Production | Cinematic Wedding Films',
  description: 'Watch our latest reels, wedding films, and behind-the-scenes videos. Experience our storytelling through motion with professional videography and cinematic content.',
  keywords: 'wedding reels, wedding films, videography, cinematic videos, wedding videographer, pre-wedding videos, fashion reels, event videos, Elinor Production videos',
  openGraph: {
    title: 'Reels & Videos - Elinor Production | Cinematic Wedding Films',
    description: 'Watch our latest reels, wedding films, and behind-the-scenes videos. Experience our storytelling through motion.',
    url: 'https://elinorproduction.com/reels',
    siteName: 'Elinor Production',
    type: 'website',
    images: [
      {
        url: 'https://elinorproduction.com/og-reels.jpg',
        width: 1200,
        height: 630,
        alt: 'Elinor Production Video Reels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reels & Videos - Elinor Production | Cinematic Wedding Films',
    description: 'Watch our latest reels, wedding films, and behind-the-scenes videos. Experience our storytelling through motion.',
    images: ['https://elinorproduction.com/og-reels.jpg'],
  },
}

export default function ReelsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
