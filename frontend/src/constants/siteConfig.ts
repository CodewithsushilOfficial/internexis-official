// Site constants and metadata
export const SITE_CONFIG = {
  name: "Internexis Technologies",
  description: "Leading platform for internships, mentorship, and career development",
  url: "https://internexis-technologies.in",
  logo: "/assets/images/internexis-logo.webp",
  favicon: "/favicon.ico",
  ogImage: "/assets/images/og-image.jpg",
  twitter: "@internexis",
  email: "contact@internexis-technologies.in",
  phone: "+91-XXXXXXXXXX",
  address: "Your Address Here"
};

export const NAVIGATION_LINKS = {
  home: "/",
  about: "/about",
  programs: "/programs",
  services: "/services",
  careers: "/careers",
  contact: "/contact",
  campusAmbassador: "/campus-ambassador",
  internships: "/internships",
  login: "/login",
  register: "/register"
};

export const LEGAL_LINKS = {
  terms: "/terms",
  privacy: "/privacy-policy",
  refund: "/refund-policy",
  cookies: "/cookie-policy",
  termsAndConditions: "/terms-and-conditions"
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/internexis",
  twitter: "https://twitter.com/internexis",
  linkedin: "https://linkedin.com/company/internexis",
  instagram: "https://instagram.com/internexis",
  youtube: "https://youtube.com/@internexis"
};

export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_URL || "https://api.internexis-technologies.in",
  auth: "/auth",
  users: "/users",
  internships: "/internships",
  applications: "/applications",
  mentorship: "/mentorship",
  campusAmbassador: "/campus-ambassador"
};

export const THEME_CONFIG = {
  defaultTheme: "light" as const,
  storageKey: "internexis-ui-theme",
  themes: ["light", "dark", "system"] as const
};

export const ANIMATION_CONFIG = {
  duration: 800,
  easing: "ease-out-cubic",
  once: false,
  mirror: true
};
