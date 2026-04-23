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
      "Home base. Same-day setup for Canton residents on most dates. Private backyards and customer-permitted venues within the city.",
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
      "Plymouth backyards and private gatherings. Outdoor cinema scaled for tight residential lots through larger estate properties.",
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
      "Northville and Northville Township private events. Backyards, driveways, and customer-permitted outdoor venues.",
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
      "Novi private backyards and customer-permitted venues. Setups scale from small backyard parties to larger private gatherings.",
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
      "Ann Arbor private backyards and customer-permitted outdoor events. 30 ft screen, three audio tiers, water-ballast setup.",
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
      "Dearborn private events, family backyards, and customer-permitted gatherings. Coverage extends to Dearborn Heights and West Wayne County.",
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
      "Birmingham private estates, residential backyards, and customer-permitted outdoor events. 30 ft screen with full audio-tier options.",
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
      "Royal Oak private backyards and customer-permitted residential events. Setups built for tight urban lots through larger suburban properties.",
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
      "Grosse Pointe private estate and backyard events across all five Pointes. Customer-permitted waterfront and landscaped venues.",
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
      "Detroit private events: residential backyards and customer-permitted outdoor venues. Audio tiers that handle urban venue acoustics.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
