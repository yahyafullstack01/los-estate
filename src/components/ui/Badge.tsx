import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "muted";
  className?: string;
}

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
        variant === "gold" && "bg-brand-gold/20 text-brand-gold",
        variant === "muted" && "bg-surface-muted text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
