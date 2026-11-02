import { NavigationItem } from "../types/news";

export const headerNavigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "U.S.", href: "/category/us" },
  { name: "World", href: "/category/world" },
  { name: "Politics", href: "/category/politics" },
  { name: "Business", href: "/category/business" },
  { name: "Tech", href: "/category/technology" },
  { name: "Culture", href: "/category/culture" },
  { name: "Science", href: "/category/science" },
  { name: "Sports", href: "/category/sports" },
  { name: "Health", href: "/category/health" },
];

export const footerNavigation = {
  about: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Advertise", href: "/advertise" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
  ],
  categories: [
    { name: "All Topics", href: "/category" },
    { name: "U.S. News", href: "/category/us" },
    { name: "World", href: "/category/world" },
    { name: "Politics", href: "/category/politics" },
    { name: "Business", href: "/category/business" },
    { name: "Technology", href: "/category/technology" },
    { name: "Culture", href: "/category/culture" },
    { name: "Science", href: "/category/science" },
    { name: "Sports", href: "/category/sports" },
    { name: "Health", href: "/category/health" },
  ],
  social: [
    { name: "X (Twitter)", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ]
};
