export const siteConfig = {
  name: "Voice for Mother Earth Humanitarian Foundation",
  shortName: "V4ME",
  tagline: "Giving a Voice to Earth and Her Children",
  description:
    "V4ME is an NGO dedicated to protecting our planet and uplifting her people through environmental and humanitarian initiatives.",
  url: "https://v4me.org",
  email: "info@v4me.org",
  phone: "+234 800 000 0000",
  address: "12 Greenfield Avenue, Abuja, Nigeria",
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/programs" },
  { label: "SDGs", href: "/sdgs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/v4me" },
  { label: "Instagram", href: "https://instagram.com/v4me" },
  { label: "X (Twitter)", href: "https://x.com/v4me" },
  { label: "LinkedIn", href: "https://linkedin.com/company/v4me" },
  { label: "YouTube", href: "https://youtube.com/@v4me" },
  { label: "WhatsApp", href: "https://wa.me/2348000000000" },
];
