import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "gold"
  | "muted"
  | "sale"
  | "rent"
  | "hotel"
  | "house"
  | "apartment";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: "bg-brand-gold text-brand-teal shadow-sm",
  muted: "bg-white/90 text-foreground shadow-sm backdrop-blur-sm",
  // Transaction — high contrast, instantly distinct
  sale: "bg-red-600 text-white shadow-md shadow-black/25",
  rent: "bg-teal-600 text-white shadow-md shadow-black/25",
  // Property type — each category has its own color
  hotel: "bg-violet-700 text-white shadow-md shadow-black/25",
  house: "bg-amber-600 text-white shadow-md shadow-black/25",
  apartment: "bg-sky-700 text-white shadow-md shadow-black/25",
};

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
