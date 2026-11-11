import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'restaurant' | 'article';
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Dynamic Head & LocalBusiness / BarOrPub / Restaurant JSON-LD Structured Data Manager.
 * Uses only verified business information—no fabricated ratings, reviews, or unverified claims.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogType = 'restaurant',
  ogImage = SITE_CONFIG.images.heroBarInterior,
  noIndex = false,
}) => {
  const baseUrl =
    (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
    'https://kirkwood-ice-and-fuel.pages.dev';
  const canonicalUrl = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name} — Kirkwood, MO`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow'
    );
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonicalEl = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);
  }, [fullTitle, description, canonicalUrl, ogType, ogImage, noIndex]);

  // Verified Restaurant & BarOrPub JSON-LD Schema
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['BarOrPub', 'Restaurant'],
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.legalName,
    description:
      'Casual neighborhood dive bar and restaurant in Downtown Kirkwood, Missouri serving charbroiled burgers, 1-lb hot wings, signature sourdough melts, soups, salads, and cold drinks.',
    slogan: SITE_CONFIG.brandStatement,
    url: baseUrl,
    telephone: '+1-314-822-0494',
    priceRange: '$$',
    servesCuisine: ['American', 'Bar & Grill', 'Burgers', 'Wings', 'Sandwiches'],
    paymentAccepted: 'Cash, Credit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.5834,
      longitude: -90.4068,
    },
    areaServed: [
      { '@type': 'City', name: 'Kirkwood, Missouri' },
      { '@type': 'AdministrativeArea', name: 'St. Louis County, Missouri' },
      { '@type': 'Place', name: 'Western St. Louis Suburbs' },
    ],
    hasMap: SITE_CONFIG.links.googleMaps,
    sameAs: [SITE_CONFIG.links.facebook],
    menu: `${baseUrl}/menu`,
    acceptsReservations: 'False',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:00',
        closes: '01:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '12:00',
        closes: '00:00',
      },
    ],
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: SITE_CONFIG.links.orderOnline,
        inLanguage: 'en-US',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      deliveryMethod: [
        'http://purl.org/goodrelations/v1#DeliveryModePickUp',
        'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet',
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
