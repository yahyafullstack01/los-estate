import { type Listing } from "@/data/listings";
import { PropertyCard } from "./PropertyCard";

interface PropertyGridProps {
  listings: Listing[];
}

export function PropertyGrid({ listings }: PropertyGridProps) {
  if (listings.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <PropertyCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
