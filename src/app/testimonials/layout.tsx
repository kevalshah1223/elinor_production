import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Testimonials - Elinor Production | Happy Client Reviews',
  description: 'Read what our clients say about Elinor Production. Over 500 happy clients with 5-star reviews for wedding photography, pre-wedding shoots, and event coverage.',
  keywords: 'client testimonials, photography reviews, wedding photographer reviews, Elinor Production reviews, client feedback, 5 star photographer, happy clients',
  openGraph: {
    title: 'Client Testimonials - Elinor Production | Happy Client Reviews',
    description: 'Read what our clients say about Elinor Production. Over 500 happy clients with 5-star reviews for wedding photography and event coverage.',
    url: 'https://elinorproduction.com/testimonials',
    siteName: 'Elinor Production',
    type: 'website',
    images: [
      {
        url: 'https://elinorproduction.com/og-testimonials.jpg',
        width: 1200,
        height: 630,
        alt: 'Elinor Production Client Testimonials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials - Elinor Production | Happy Client Reviews',
    description: 'Read what our clients say about Elinor Production. Over 500 happy clients with 5-star reviews for wedding photography and event coverage.',
    images: ['https://elinorproduction.com/og-testimonials.jpg'],
  },
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
