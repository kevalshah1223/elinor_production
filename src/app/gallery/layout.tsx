import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery - Elinor Production | Professional Photography Portfolio',
  description: 'Explore our stunning photography gallery featuring weddings, pre-wedding shoots, fashion photography, and event coverage. View our professional portfolio of captured moments.',
  keywords: 'photography gallery, wedding photos, pre-wedding photography, fashion photography, event photography, professional photographer portfolio, Elinor Production gallery',
  openGraph: {
    title: 'Gallery - Elinor Production | Professional Photography Portfolio',
    description: 'Explore our stunning photography gallery featuring weddings, pre-wedding shoots, fashion photography, and event coverage.',
    url: 'https://elinorproduction.com/gallery',
    siteName: 'Elinor Production',
    type: 'website',
    images: [
      {
        url: 'https://elinorproduction.com/og-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Elinor Production Photography Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery - Elinor Production | Professional Photography Portfolio',
    description: 'Explore our stunning photography gallery featuring weddings, pre-wedding shoots, fashion photography, and event coverage.',
    images: ['https://elinorproduction.com/og-gallery.jpg'],
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
