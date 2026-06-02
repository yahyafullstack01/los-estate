import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LOGO_LIGHT = "/logo-light.png";
const LOGO_DARK = "/logo-dark.png";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const logoSrc =
    mounted && resolvedTheme === "light" ? LOGO_LIGHT : LOGO_DARK;

  return (
    <Image
      src={logoSrc}
      alt="LOS ESTATE"
      width={140}
      height={48}
      priority
      className={cn("h-10 w-auto object-contain sm:h-12", className)}
    />
  );
}
