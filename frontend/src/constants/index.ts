// Site Configuration
export const SITE_CONFIG = {
  name: "Internexis Technologies",
  description: "Leading EdTech platform providing internships, training, and career opportunities",
  url: "https://internexis-technologies.in",
  ogImage: "https://internexis-technologies.in/og-image.jpg",
  contact: {
    email: "info@internexis-technologies.in",
    phone: "+91 9876543210",
    address: "Internexis Technologies, India"
  }
};

// Navigation Routes
export const ROUTES = {
  home: "/",
  about: "/about",
  contact: "/contact",
  careers: "/careers",
  allPrograms: "/all-programs",
  campusAmbassador: "/campus-ambassador",
  
  // Legal routes
  terms: "/terms",
  privacy: "/privacy-policy",
  refund: "/refund-policy",
  cookies: "/cookie-policy",
  termsAndConditions: "/terms-and-conditions",
  
  // Internship routes
  internships: {
    webDevelopment: {
      frontend: "/internship/web-development/frontend",
      backend: "/internship/web-development/backend",
      fullStack: "/internship/web-development/full-stack",
      mern: "/internship/web-development/mern"
    },
    androidDevelopment: "/internship/android-development",
    aiml: "/internship/ai-ml",
    pythonDjango: "/internship/python-django",
    dataScience: "/internship/data-science",
    cybersecurity: "/internship/cybersecurity",
    dataAnalytics: "/internship/data-analytics",
    uiDesign: "/internship/ui-design",
    programmingLanguages: {
      c: "/internship/programming-languages/c",
      cpp: "/internship/programming-languages/cpp",
      python: "/internship/programming-languages/python",
      java: "/internship/programming-languages/java",
      javascript: "/internship/programming-languages/javascript",
      react: "/internship/programming-languages/react"
    }
  },
  
  // Training courses routes
  trainingCourses: {
    webDevelopment: {
      frontend: "/training/web-development/frontend",
      backend: "/training/web-development/backend",
      mernFullStack: "/training/web-development/mern-full-stack"
    },
    androidDevelopment: {
      javaBased: "/training/android-development/java-based",
      kotlinBased: "/training/android-development/kotlin-based",
      flutterBased: "/training/android-development/flutter-based",
      reactNative: "/training/android-development/react-native"
    },
    pythonDjango: "/training/python-django",
    aiml: "/training/ai-ml",
    dataScienceAnalytics: "/training/data-science-analytics",
    cybersecurityEthicalHacking: "/training/cybersecurity-ethical-hacking",
    dsaCompetitiveProgramming: "/training/dsa-competitive-programming",
    uiDesign: "/training/ui-design"
  },
  
  // Services routes
  services: {
    webServices: "/services/web-services",
    appDevelopment: "/services/app-development",
    aiAutomation: "/services/ai-automation",
    aiAgentic: "/services/ai-agentic",
    aiTools: "/services/ai-tools",
    graphicDesign: "/services/graphic-design",
    ecommerce: "/services/ecommerce"
  },
  
  mentorship: "/mentorship",
  admin: "/admin"
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/internexis",
  twitter: "https://twitter.com/internexis",
  linkedin: "https://linkedin.com/company/internexis",
  instagram: "https://instagram.com/internexis",
  youtube: "https://youtube.com/@internexis",
  github: "https://github.com/internexis"
};

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://internexis-official.onrender.com" 
    : "http://localhost:5000",
  timeout: 30000,
  endpoints: {
    auth: "/auth",
    users: "/users",
    internships: "/internships",
    applications: "/applications",
    mentorship: "/mentorship",
    campusAmbassador: "/campus-ambassador",
    admin: "/admin"
  }
};

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: "light" as const,
  storageKey: "internexis-ui-theme",
  themes: ["light", "dark", "system"] as const
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: 800,
  easing: "ease-out-cubic",
  staggerDelay: 0.1,
  offset: 100
};

// Application Status
export const APPLICATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  INTERVIEW: "interview",
  SELECTED: "selected"
} as const;

// Export types
export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];
export type Theme = typeof THEME_CONFIG.themes[number];
