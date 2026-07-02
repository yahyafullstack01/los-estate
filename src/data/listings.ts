export type PropertyType = "apartment" | "hotel" | "house";
export type TransactionType = "sale" | "rent";

export interface Listing {
  id: string;
  slug: string;
  type: PropertyType;
  transaction: TransactionType;
  price: number;
  priceMax?: number;
  currency: string;
  location: string;
  beds: number;
  baths: number;
  areaSqm: number;
  units?: number;
  /** Public folder path for property photos, e.g. /listings/develi-hotel-alanya */
  imageDir?: string;
  images: string[];
  featured: boolean;
  features: string[];
}

export const listings: Listing[] = [
  {
    id: "1",
    slug: "develi-hotel-alanya",
    type: "hotel",
    transaction: "sale",
    price: 4500000,
    currency: "EUR",
    location: "Alanya, Antalya, Turkey",
    units: 24,
    beds: 24,
    baths: 24,
    areaSqm: 95,
    imageDir: "/listings/develi-hotel-alanya",
    images: [
      "/listings/develi-hotel-alanya/01-exterior.png",
      "/listings/develi-hotel-alanya/02-pool.png",
      "/listings/develi-hotel-alanya/03-room.png",
      "/listings/develi-hotel-alanya/04-studio.png",
      "/listings/develi-hotel-alanya/05-bathroom.png",
      "/listings/develi-hotel-alanya/06-muhabbet-street.png",
      "/listings/develi-hotel-alanya/07-location-map.png",
      "/listings/develi-hotel-alanya/08-floor-plan.png",
    ],
    featured: true,
    features: [
      "Outdoor pool",
      "Sauna",
      "Turkish bath",
      "Steam room",
      "Reception",
      "Lobby",
    ],
  },
  {
    id: "2",
    slug: "besthome-52-cleopatra-costana",
    type: "apartment",
    transaction: "sale",
    price: 235000,
    priceMax: 420000,
    currency: "EUR",
    location: "Alanya, Cleopatra, Turkey",
    units: 14,
    beds: 3,
    baths: 2,
    areaSqm: 56,
    imageDir: "/listings/besthome-52-cleopatra-costana",
    images: [
      "/listings/besthome-52-cleopatra-costana/01-exterior.png",
      "/listings/besthome-52-cleopatra-costana/02-exterior-angle.png",
      "/listings/besthome-52-cleopatra-costana/03-pool-aerial.png",
      "/listings/besthome-52-cleopatra-costana/04-living-room.png",
      "/listings/besthome-52-cleopatra-costana/05-kitchen.png",
      "/listings/besthome-52-cleopatra-costana/06-spa.png",
      "/listings/besthome-52-cleopatra-costana/07-location-map.png",
      "/listings/besthome-52-cleopatra-costana/08-site-plan.png",
    ],
    featured: true,
    features: [
      "50 m to beach",
      "Heated pool",
      "Sauna & gym",
      "Residence permit eligible (3+1)",
    ],
  },
  {
    id: "3",
    slug: "besthome-44-gardenia",
    type: "apartment",
    transaction: "sale",
    price: 80000,
    priceMax: 150000,
    currency: "EUR",
    location: "Alanya, Demirtaş, Turkey",
    units: 108,
    beds: 2,
    baths: 2,
    areaSqm: 52,
    imageDir: "/listings/besthome-44-gardenia",
    images: [
      "/listings/besthome-44-gardenia/01-exterior.png",
      "/listings/besthome-44-gardenia/02-aerial.png",
      "/listings/besthome-44-gardenia/03-pool.png",
      "/listings/besthome-44-gardenia/04-pool-cabanas.png",
      "/listings/besthome-44-gardenia/05-lounge-patio.png",
      "/listings/besthome-44-gardenia/06-lobby-billiards.png",
      "/listings/besthome-44-gardenia/07-location-map.png",
      "/listings/besthome-44-gardenia/08-floor-plan.png",
    ],
    featured: true,
    features: [
      "1.2 km to beach",
      "400 m² outdoor pool",
      "Spa & gym",
      "24/7 security",
    ],
  },
  {
    id: "4",
    slug: "modern-apartment-rent-kyiv",
    type: "apartment",
    transaction: "rent",
    price: 3200,
    currency: "USD",
    location: "Kyiv, Ukraine",
    beds: 2,
    baths: 2,
    areaSqm: 95,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    ],
    featured: true,
    features: ["Furnished", "Concierge", "Parking", "Gym"],
  },
  {
    id: "5",
    slug: "family-house-rent-lviv",
    type: "house",
    transaction: "rent",
    price: 4500,
    currency: "USD",
    location: "Lviv, Ukraine",
    beds: 4,
    baths: 3,
    areaSqm: 240,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    featured: false,
    features: ["Garden", "Home office", "Garage", "Quiet area"],
  },
  {
    id: "6",
    slug: "hotel-suite-rent-odesa",
    type: "hotel",
    transaction: "rent",
    price: 5800,
    currency: "USD",
    location: "Odesa, Ukraine",
    beds: 1,
    baths: 1,
    areaSqm: 65,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
    ],
    featured: false,
    features: ["Housekeeping", "Spa", "Marina view", "Room service"],
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getListingSlugs(): string[] {
  return listings.map((l) => l.slug);
}
