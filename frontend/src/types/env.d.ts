/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_SUPPORT_EMAIL: string;
  readonly VITE_ENABLE_DARK_MODE: string;
  readonly VITE_ENABLE_ANIMATIONS: string;
  readonly VITE_ENABLE_PWA: string;
  readonly VITE_DEV_MODE: string;
  readonly VITE_ENABLE_CONSOLE_LOGS: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_GOOGLE_ANALYTICS_ID: string;
  readonly VITE_MAPS_API_KEY: string;
}

// Extend global Window interface for custom properties
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
