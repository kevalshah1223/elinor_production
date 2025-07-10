import Script from 'next/script'

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'service'
}

const StructuredData = ({ type = 'organization' }: StructuredDataProps) => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elinor Production",
    "description": "Professional photography and videography services for weddings, pre-weddings, fashion, and events",
    "url": "https://elinorproduction.com",
    "logo": "https://elinorproduction.com/logo.png",
    "image": "https://elinorproduction.com/og-image.jpg",
    "telephone": "+91-96620-98555",
    "email": "elinorproduction@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/elinor.production",
      "https://www.instagram.com/elinor_production",
      "https://youtube.com/@elinorproduction"
    ],
    "founder": {
      "@type": "Person",
      "name": "Chirag Shah"
    },
    "foundingDate": "2019",
    "numberOfEmployees": "1-10",
    "legalName": "Elinor Production",
    "alternateName": "Elinor Production Photography"
  }

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://elinorproduction.com",
    "name": "Elinor Production",
    "description": "Professional photography and videography services for weddings, pre-weddings, fashion, and events",
    "url": "https://elinorproduction.com",
    "telephone": "+91-96620-98555",
    "email": "elinorproduction@gmail.com",
    "image": "https://elinorproduction.com/og-image.jpg",
    "logo": "https://elinorproduction.com/logo.png",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0225",
      "longitude": "72.5714"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/elinor.production",
      "https://www.instagram.com/elinor_production",
      "https://youtube.com/@elinorproduction"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Photography and Videography Services",
    "provider": {
      "@type": "Organization",
      "name": "Elinor Production",
      "url": "https://elinorproduction.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Photography",
            "description": "Complete wedding day coverage from getting ready to the final dance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pre-Wedding Photography",
            "description": "Romantic and intimate pre-wedding shoots in beautiful locations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fashion Photography",
            "description": "Professional fashion shoots for models, brands, and personal portfolios"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Photography",
            "description": "Corporate events, parties, and celebrations coverage"
          }
        }
      ]
    }
  }

  const getStructuredData = () => {
    switch (type) {
      case 'localBusiness':
        return localBusinessData
      case 'service':
        return serviceData
      default:
        return organizationData
    }
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}

export default StructuredData
