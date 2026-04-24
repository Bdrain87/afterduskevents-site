import { faqs } from "./faqs";
import { allTiers, type AudioTier } from "./packages";
import { cities, type City } from "./cities";

const SITE_URL = "https://afterduskevents.com";
const BUSINESS_NAME = "After Dusk Events LLC";
const BRAND = "After Dusk Events";
const EMAIL = "hello@afterduskevents.com";
const FOUNDER = "Blake";
const CITY = "Canton";
const REGION = "MI";
const POSTAL = "48188";
const COUNTRY = "US";
const LAT = 42.3086;
const LNG = -83.482;
const RADIUS_M = 96560; // 60 miles in meters
const FOUNDED = "2025";
const LOGO_URL = `${SITE_URL}/logo.png`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const ORG_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

export type SchemaObject = Record<string, unknown>;

function url(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganization(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BUSINESS_NAME,
    alternateName: BRAND,
    url: SITE_URL,
    logo: LOGO_URL,
    image: OG_IMAGE,
    email: EMAIL,
    foundingDate: FOUNDED,
    founder: { "@id": FOUNDER_ID },
    sameAs: [
      "https://instagram.com/afterduskevents",
      "https://facebook.com/afterduskevents",
      "https://tiktok.com/@afterduskevents",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: EMAIL,
      areaServed: { "@type": "State", name: "Michigan" },
      availableLanguage: ["English"],
    },
  };
}

export function buildLocalBusiness(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS_NAME,
    alternateName: BRAND,
    description:
      "Outdoor cinema and event rentals for private events in Southeast Michigan. 30-foot inflatable screen, four audio tiers up to four speakers and two subwoofers, water-ballast setup. Veteran-owned, fully insured, serving 60 miles of Canton, MI.",
    url: SITE_URL,
    logo: LOGO_URL,
    image: OG_IMAGE,
    email: EMAIL,
    foundingDate: FOUNDED,
    founder: { "@id": FOUNDER_ID },
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      postalCode: POSTAL,
      addressCountry: COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LAT,
      longitude: LNG,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: LAT,
        longitude: LNG,
      },
      geoRadius: String(RADIUS_M),
    },
    serviceArea: cities.map((c) => ({
      "@type": "City",
      name: c.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: c.name,
        addressRegion: REGION,
        addressCountry: COUNTRY,
      },
    })),
    knowsAbout: [
      "outdoor cinema",
      "30 ft inflatable movie screen rental",
      "backyard movie night",
      "sports watch party outdoor projector",
      "fight night outdoor projection",
      "graduation party outdoor cinema",
      "Detroit area event rentals",
      "BYO Content private screenings",
    ],
    knowsLanguage: "en-US",
    slogan: "Big screen. Bigger nights.",
    sameAs: [
      "https://instagram.com/afterduskevents",
      "https://facebook.com/afterduskevents",
      "https://tiktok.com/@afterduskevents",
    ],
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
  };
}

export function buildPerson(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: FOUNDER,
    jobTitle: "Owner & Operator",
    affiliation: { "@id": BUSINESS_ID },
    worksFor: { "@id": BUSINESS_ID },
    nationality: { "@type": "Country", name: "United States" },
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },
    description:
      "Founder of After Dusk Events. U.S. Air Force veteran applying military-precision operational rigor to outdoor cinema and event production in Southeast Michigan.",
  };
}

export function buildWebSite(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function buildService(tier: AudioTier): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/packages#${tier.slug}`,
    name: tier.name,
    serviceType: "Outdoor Cinema Rental",
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: LAT, longitude: LNG },
      geoRadius: String(RADIUS_M),
    },
    description: tier.includes.join(". "),
    audience: {
      "@type": "Audience",
      audienceType: tier.best,
    },
    offers: {
      "@type": "Offer",
      url: url(`/contact?package=${encodeURIComponent(tier.name)}`),
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: "Custom quote per event. Contact for pricing.",
      },
      eligibleRegion: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: LAT, longitude: LNG },
        geoRadius: String(RADIUS_M),
      },
    },
    isRelatedTo: tier.includes.slice(0, 3),
  };
}

export function buildFAQPage(items: { q: string; a: string }[] = faqs): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export type Crumb = { name: string; href: string };

export function buildBreadcrumbList(crumbs: Crumb[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: url(c.href),
    })),
  };
}

export function buildCityServicePage(city: City): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/serving/${city.slug}#service`,
    name: `Outdoor Cinema Rental in ${city.name}, MI`,
    serviceType: "Outdoor Cinema Rental",
    provider: { "@id": BUSINESS_ID },
    description: city.blurb,
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: REGION,
        addressCountry: COUNTRY,
      },
    },
    offers: {
      "@type": "Offer",
      url: url(`/contact?location=${encodeURIComponent(city.name)}`),
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: "Custom quote per event.",
      },
    },
  };
}

export function buildArticle(opts: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  imageUrl?: string;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${opts.slug}#article`,
    headline: opts.headline,
    description: opts.description,
    image: opts.imageUrl ?? OG_IMAGE,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url(opts.slug) },
    inLanguage: "en-US",
  };
}

export function buildAllServicesGraph(): SchemaObject[] {
  return allTiers.map(buildService);
}
