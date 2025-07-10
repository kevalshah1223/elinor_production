import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Elinor Production | Professional Photography & Videography',
  description: 'Learn about Elinor Production, our story, values, and team. Professional photography and videography services with over 5 years of experience capturing precious moments.',
  keywords: 'about Elinor Production, professional photographer, wedding photographer, photography team, Chirag Shah, photography services, videography services',
  openGraph: {
    title: 'About Us - Elinor Production | Professional Photography & Videography',
    description: 'Learn about Elinor Production, our story, values, and team. Professional photography and videography services with over 5 years of experience.',
    url: 'https://elinorproduction.com/about',
    siteName: 'Elinor Production',
    type: 'website',
    images: [
      {
        url: 'https://elinorproduction.com/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Elinor Production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Elinor Production | Professional Photography & Videography',
    description: 'Learn about Elinor Production, our story, values, and team. Professional photography and videography services with over 5 years of experience.',
    images: ['https://elinorproduction.com/og-about.jpg'],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
