import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Elinor Production | Get Photography Quote',
  description: 'Contact Elinor Production for professional photography and videography services. Get a quote for weddings, pre-wedding shoots, fashion, and event photography. Call +91 96620 98555.',
  keywords: 'contact photographer, photography quote, wedding photographer contact, Elinor Production contact, book photography session, photography inquiry',
  openGraph: {
    title: 'Contact Us - Elinor Production | Get Photography Quote',
    description: 'Contact Elinor Production for professional photography and videography services. Get a quote for weddings, pre-wedding shoots, fashion, and event photography.',
    url: 'https://elinorproduction.com/contact',
    siteName: 'Elinor Production',
    type: 'website',
    images: [
      {
        url: 'https://elinorproduction.com/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Elinor Production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Elinor Production | Get Photography Quote',
    description: 'Contact Elinor Production for professional photography and videography services. Get a quote for weddings, pre-wedding shoots, fashion, and event photography.',
    images: ['https://elinorproduction.com/og-contact.jpg'],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
