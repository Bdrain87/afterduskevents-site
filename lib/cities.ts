export type City = {
  slug: string;
  name: string;
  county: string;
  region: "Wayne" | "Oakland" | "Washtenaw" | "Macomb" | "Livingston" | "Monroe";
  distanceMiles: number;
  lat: number;
  lng: number;
  blurb: string;
  featuredVenues?: string[];
};

// Cities within ~60-mile service radius of Canton, MI (42.3086, -83.4820).
// Distances are great-circle approximations from Canton.
export const cities: City[] = [
  {
    slug: "canton",
    name: "Canton",
    county: "Wayne",
    region: "Wayne",
    distanceMiles: 0,
    lat: 42.3086,
    lng: -83.482,
    blurb:
      "Home base. Same-day setup for Canton residents on most dates. Heritage Park, Pheasant Run, and most subdivision common areas all work for outdoor cinema setups.",
    featuredVenues: ["Heritage Park", "Pheasant Run Golf Club", "Summit on the Park"],
  },
  {
    slug: "plymouth",
    name: "Plymouth",
    county: "Wayne",
    region: "Wayne",
    distanceMiles: 5,
    lat: 42.3714,
    lng: -83.4702,
    blurb:
      "Plymouth backyards, Old Village events, and Kellogg Park area gatherings. 4K projection scaled for tight residential lots and larger estate properties alike.",
  },
  {
    slug: "northville",
    name: "Northville",
    county: "Wayne",
    region: "Wayne",
    distanceMiles: 7,
    lat: 42.4314,
    lng: -83.483,
    blurb:
      "Northville and Northville Township private events. Mill Race Historical Village adjacent properties, Maybury Park area homes, and HOA neighborhoods.",
  },
  {
    slug: "novi",
    name: "Novi",
    county: "Oakland",
    region: "Oakland",
    distanceMiles: 9,
    lat: 42.4806,
    lng: -83.4755,
    blurb:
      "Novi corporate parks, residential subdivisions, and HOA community events. Setups scaled for everything from 30-guest birthdays to 250-guest neighborhood block parties.",
  },
  {
    slug: "ann-arbor",
    name: "Ann Arbor",
    county: "Washtenaw",
    region: "Washtenaw",
    distanceMiles: 25,
    lat: 42.2808,
    lng: -83.7430,
    blurb:
      "Ann Arbor wedding venues, university-adjacent private events, and Burns Park residential gatherings. Outdoor cinema for film grads who notice the difference between a 4K laser and a consumer projector.",
  },
  {
    slug: "dearborn",
    name: "Dearborn",
    county: "Wayne",
    region: "Wayne",
    distanceMiles: 18,
    lat: 42.3223,
    lng: -83.1763,
    blurb:
      "Dearborn private events from family backyards to corporate gatherings. Coverage extends to Dearborn Heights and the broader West Wayne County area.",
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    county: "Oakland",
    region: "Oakland",
    distanceMiles: 26,
    lat: 42.5467,
    lng: -83.2113,
    blurb:
      "Birmingham estates, Quarton Lake area homes, and downtown Birmingham private events. Premium audio and 4K projection for events where production quality is non-negotiable.",
  },
  {
    slug: "royal-oak",
    name: "Royal Oak",
    county: "Oakland",
    region: "Oakland",
    distanceMiles: 30,
    lat: 42.4895,
    lng: -83.1446,
    blurb:
      "Royal Oak backyards, Vinsetta Park homes, and downtown-adjacent residential events. Setups built for tight urban lots and larger Beverly Hills / Berkley properties.",
  },
  {
    slug: "grosse-pointe",
    name: "Grosse Pointe",
    county: "Wayne",
    region: "Wayne",
    distanceMiles: 35,
    lat: 42.3861,
    lng: -82.9116,
    blurb:
      "Grosse Pointe lakefront and private estate events across all five Pointes. Ceremony-grade audio and screens scaled for waterfront and landscaped backyards.",
  },
  {
    slug: "detroit",
    name: "Detroit",
    county: "Wayne",
    region: "Wayne",
    distanceMiles: 26,
    lat: 42.3314,
    lng: -83.0458,
    blurb:
      "Detroit private events: rooftop gatherings, residential backyards, and corporate setups across the city. Power and audio scaled to handle urban venue acoustics.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
