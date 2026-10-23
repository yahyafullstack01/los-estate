import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/whatsapp";

type Props = {
  label: string;
  prefill: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
};

const sizes = {
  sm: "px-3 py-2 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-8 py-3 text-base gap-2",
};

export function WhatsAppLink({
  label,
  prefill,
  className,
  size = "md",
  showIcon = true,
}: Props) {
  return (
    <a
      href={whatsappHref(prefill)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-[#25D366] font-semibold text-white transition-colors hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes[size],
        className
      )}
    >
      {showIcon ? <MessageCircle className="h-5 w-5 shrink-0" aria-hidden /> : null}
      {label}
    </a>
  );
}
