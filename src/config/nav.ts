export const navLinks = [
  { href: "/", key: "home" },
  { href: "/#about", key: "about" },
  { href: "/listings", key: "listings" },
  { href: "/for-owners", key: "forOwners" },
  { href: "/partners", key: "partners" },
  { href: "/contact", key: "contact" },
] as const;

export type NavKey = (typeof navLinks)[number]["key"];
