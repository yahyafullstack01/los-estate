/** About section imagery — replace with local files in /public/about/ when ready */
export const aboutImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    alt: "Luxury property exterior",
    local: "/about/hero.jpg",
  },
  team: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    alt: "Real estate professionals",
    local: "/about/team.jpg",
  },
  renovation: {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    alt: "Boutique hotel interior",
    local: "/about/renovation.jpg",
  },
  international: {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    alt: "Coastal resort destination",
    local: "/about/international.jpg",
  },
  closing: {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    alt: "Luxury villa by the sea",
    local: "/about/closing.jpg",
  },
} as const;
