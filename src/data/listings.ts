export type PropertyType = "apartment" | "hotel" | "house";
export type TransactionType = "sale" | "rent";

export interface Listing {
  id: string;
  slug: string;
  type: PropertyType;
  transaction: TransactionType;
  price: number;
  currency: string;
  location: string;
  beds: number;
  baths: number;
  areaSqm: number;
  units?: number;
  /** Public folder path for property photos, e.g. /listings/alanya-guzelyali-suites */
  imageDir?: string;
  images: string[];
  featured: boolean;
  features: string[];
}

export const listings: Listing[] = [
  {
    id: "1",
    slug: "alanya-guzelyali-suites",
    type: "apartment",
    transaction: "sale",
    price: 1250000,
    currency: "USD",
    location: "Alanya, Antalya, Turkey",
    units: 24,
    beds: 24,
    baths: 24,
    areaSqm: 95,
    imageDir: "/listings/alanya-guzelyali-suites",
    images: [],
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
    slug: "alanya-muhabbet-suites",
    type: "hotel",
    transaction: "sale",
    price: 2100000,
    currency: "USD",
    location: "Alanya, Antalya, Turkey",
    units: 24,
    beds: 24,
    baths: 24,
    areaSqm: 95,
    imageDir: "/listings/alanya-muhabbet-suites",
    images: [],
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
    id: "3",
    slug: "boutique-hotel-lviv",
    type: "hotel",
    transaction: "sale",
    price: 4800000,
    currency: "USD",
    location: "Lviv, Ukraine",
    beds: 24,
    baths: 24,
    areaSqm: 1850,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    ],
    featured: true,
    features: ["Restaurant", "24 suites", "Historic district", "High yield"],
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
