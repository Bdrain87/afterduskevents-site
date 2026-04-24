export type City = {
  slug: string;
  name: string;
  county: string;
  region:
    | "Wayne"
    | "Oakland"
    | "Washtenaw"
    | "Macomb"
    | "Livingston"
    | "Monroe"
    | "Genesee"
    | "St. Clair"
    | "Ingham"
    | "Jackson";
  distanceMiles: number;
  lat: number;
  lng: number;
  featuredVenues?: string[];
};

// Cities across Southeast Michigan. Distances are great-circle approximations
// from Canton, MI (42.3086, -83.4820). Kept sorted by distance ascending
// within each county for easy scanning in the source.
export const cities: City[] = [
  // Home base
  { slug: "canton", name: "Canton", county: "Wayne", region: "Wayne", distanceMiles: 0, lat: 42.3086, lng: -83.4820 },

  // Wayne County
  { slug: "wayne", name: "Wayne", county: "Wayne", region: "Wayne", distanceMiles: 4, lat: 42.2814, lng: -83.3861 },
  { slug: "plymouth", name: "Plymouth", county: "Wayne", region: "Wayne", distanceMiles: 5, lat: 42.3714, lng: -83.4702 },
  { slug: "westland", name: "Westland", county: "Wayne", region: "Wayne", distanceMiles: 7, lat: 42.3242, lng: -83.4002 },
  { slug: "northville", name: "Northville", county: "Wayne", region: "Wayne", distanceMiles: 7, lat: 42.4314, lng: -83.4830 },
  { slug: "livonia", name: "Livonia", county: "Wayne", region: "Wayne", distanceMiles: 7, lat: 42.3684, lng: -83.3527 },
  { slug: "romulus", name: "Romulus", county: "Wayne", region: "Wayne", distanceMiles: 8, lat: 42.2223, lng: -83.3966 },
  { slug: "garden-city", name: "Garden City", county: "Wayne", region: "Wayne", distanceMiles: 8, lat: 42.3256, lng: -83.3314 },
  { slug: "belleville", name: "Belleville", county: "Wayne", region: "Wayne", distanceMiles: 10, lat: 42.2028, lng: -83.4850 },
  { slug: "redford", name: "Redford", county: "Wayne", region: "Wayne", distanceMiles: 13, lat: 42.3830, lng: -83.2966 },
  { slug: "taylor", name: "Taylor", county: "Wayne", region: "Wayne", distanceMiles: 13, lat: 42.2409, lng: -83.2696 },
  { slug: "dearborn-heights", name: "Dearborn Heights", county: "Wayne", region: "Wayne", distanceMiles: 14, lat: 42.3370, lng: -83.2730 },
  { slug: "allen-park", name: "Allen Park", county: "Wayne", region: "Wayne", distanceMiles: 17, lat: 42.2573, lng: -83.2108 },
  { slug: "flat-rock", name: "Flat Rock", county: "Wayne", region: "Wayne", distanceMiles: 18, lat: 42.0978, lng: -83.2935 },
  { slug: "dearborn", name: "Dearborn", county: "Wayne", region: "Wayne", distanceMiles: 18, lat: 42.3223, lng: -83.1763 },
  { slug: "southgate", name: "Southgate", county: "Wayne", region: "Wayne", distanceMiles: 18, lat: 42.2142, lng: -83.1939 },
  { slug: "lincoln-park", name: "Lincoln Park", county: "Wayne", region: "Wayne", distanceMiles: 19, lat: 42.2506, lng: -83.1786 },
  { slug: "woodhaven", name: "Woodhaven", county: "Wayne", region: "Wayne", distanceMiles: 19, lat: 42.1364, lng: -83.2327 },
  { slug: "trenton", name: "Trenton", county: "Wayne", region: "Wayne", distanceMiles: 22, lat: 42.1398, lng: -83.1930 },
  { slug: "grosse-ile", name: "Grosse Ile", county: "Wayne", region: "Wayne", distanceMiles: 22, lat: 42.1265, lng: -83.1505 },
  { slug: "wyandotte", name: "Wyandotte", county: "Wayne", region: "Wayne", distanceMiles: 24, lat: 42.2143, lng: -83.1530 },
  { slug: "detroit", name: "Detroit", county: "Wayne", region: "Wayne", distanceMiles: 26, lat: 42.3314, lng: -83.0458 },
  { slug: "grosse-pointe", name: "Grosse Pointe", county: "Wayne", region: "Wayne", distanceMiles: 35, lat: 42.3861, lng: -82.9116 },

  // Oakland County
  { slug: "novi", name: "Novi", county: "Oakland", region: "Oakland", distanceMiles: 9, lat: 42.4806, lng: -83.4755 },
  { slug: "farmington", name: "Farmington", county: "Oakland", region: "Oakland", distanceMiles: 12, lat: 42.4645, lng: -83.3760 },
  { slug: "south-lyon", name: "South Lyon", county: "Oakland", region: "Oakland", distanceMiles: 14, lat: 42.4614, lng: -83.6516 },
  { slug: "farmington-hills", name: "Farmington Hills", county: "Oakland", region: "Oakland", distanceMiles: 14, lat: 42.4856, lng: -83.3772 },
  { slug: "walled-lake", name: "Walled Lake", county: "Oakland", region: "Oakland", distanceMiles: 15, lat: 42.5378, lng: -83.4799 },
  { slug: "commerce-township", name: "Commerce Township", county: "Oakland", region: "Oakland", distanceMiles: 17, lat: 42.5922, lng: -83.4743 },
  { slug: "southfield", name: "Southfield", county: "Oakland", region: "Oakland", distanceMiles: 18, lat: 42.4734, lng: -83.2219 },
  { slug: "west-bloomfield", name: "West Bloomfield", county: "Oakland", region: "Oakland", distanceMiles: 19, lat: 42.5684, lng: -83.3838 },
  { slug: "milford", name: "Milford", county: "Oakland", region: "Oakland", distanceMiles: 22, lat: 42.5861, lng: -83.5997 },
  { slug: "bloomfield-hills", name: "Bloomfield Hills", county: "Oakland", region: "Oakland", distanceMiles: 22, lat: 42.5836, lng: -83.2455 },
  { slug: "pontiac", name: "Pontiac", county: "Oakland", region: "Oakland", distanceMiles: 26, lat: 42.6389, lng: -83.2910 },
  { slug: "birmingham", name: "Birmingham", county: "Oakland", region: "Oakland", distanceMiles: 26, lat: 42.5467, lng: -83.2113 },
  { slug: "waterford", name: "Waterford", county: "Oakland", region: "Oakland", distanceMiles: 27, lat: 42.6930, lng: -83.4112 },
  { slug: "troy", name: "Troy", county: "Oakland", region: "Oakland", distanceMiles: 27, lat: 42.6064, lng: -83.1498 },
  { slug: "auburn-hills", name: "Auburn Hills", county: "Oakland", region: "Oakland", distanceMiles: 28, lat: 42.6875, lng: -83.2341 },
  { slug: "ferndale", name: "Ferndale", county: "Oakland", region: "Oakland", distanceMiles: 28, lat: 42.4604, lng: -83.1349 },
  { slug: "royal-oak", name: "Royal Oak", county: "Oakland", region: "Oakland", distanceMiles: 30, lat: 42.4895, lng: -83.1446 },
  { slug: "rochester-hills", name: "Rochester Hills", county: "Oakland", region: "Oakland", distanceMiles: 32, lat: 42.6584, lng: -83.1499 },
  { slug: "rochester", name: "Rochester", county: "Oakland", region: "Oakland", distanceMiles: 34, lat: 42.6803, lng: -83.1341 },

  // Washtenaw County
  { slug: "ypsilanti", name: "Ypsilanti", county: "Washtenaw", region: "Washtenaw", distanceMiles: 13, lat: 42.2411, lng: -83.6130 },
  { slug: "saline", name: "Saline", county: "Washtenaw", region: "Washtenaw", distanceMiles: 22, lat: 42.1664, lng: -83.7810 },
  { slug: "ann-arbor", name: "Ann Arbor", county: "Washtenaw", region: "Washtenaw", distanceMiles: 25, lat: 42.2808, lng: -83.7430 },
  { slug: "dexter", name: "Dexter", county: "Washtenaw", region: "Washtenaw", distanceMiles: 26, lat: 42.3381, lng: -83.8899 },
  { slug: "chelsea", name: "Chelsea", county: "Washtenaw", region: "Washtenaw", distanceMiles: 28, lat: 42.3181, lng: -84.0261 },

  // Macomb County
  { slug: "warren", name: "Warren", county: "Macomb", region: "Macomb", distanceMiles: 32, lat: 42.5145, lng: -83.0147 },
  { slug: "sterling-heights", name: "Sterling Heights", county: "Macomb", region: "Macomb", distanceMiles: 33, lat: 42.5803, lng: -83.0302 },
  { slug: "clinton-township", name: "Clinton Township", county: "Macomb", region: "Macomb", distanceMiles: 40, lat: 42.5869, lng: -82.9196 },
  { slug: "st-clair-shores", name: "St. Clair Shores", county: "Macomb", region: "Macomb", distanceMiles: 42, lat: 42.4997, lng: -82.8887 },
  { slug: "mount-clemens", name: "Mount Clemens", county: "Macomb", region: "Macomb", distanceMiles: 44, lat: 42.5975, lng: -82.8780 },

  // Livingston County
  { slug: "brighton", name: "Brighton", county: "Livingston", region: "Livingston", distanceMiles: 27, lat: 42.5295, lng: -83.7802 },
  { slug: "howell", name: "Howell", county: "Livingston", region: "Livingston", distanceMiles: 37, lat: 42.6072, lng: -83.9294 },

  // Monroe County
  { slug: "monroe", name: "Monroe", county: "Monroe", region: "Monroe", distanceMiles: 30, lat: 41.9164, lng: -83.3977 },

  // Travel zone (60-90 mi). Travel line added to the quote for these.
  { slug: "jackson", name: "Jackson", county: "Jackson", region: "Jackson", distanceMiles: 52, lat: 42.2459, lng: -84.4015 },
  { slug: "flint", name: "Flint", county: "Genesee", region: "Genesee", distanceMiles: 55, lat: 43.0125, lng: -83.6875 },
  { slug: "lansing", name: "Lansing", county: "Ingham", region: "Ingham", distanceMiles: 67, lat: 42.7325, lng: -84.5555 },
  { slug: "port-huron", name: "Port Huron", county: "St. Clair", region: "St. Clair", distanceMiles: 75, lat: 42.9709, lng: -82.4249 },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
