import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';

// Track if i18n has been initialized
let isInitialized = false;

// Function to initialize i18n with configurable path
export const initI18n = (loadPath = "/locales/{{lng}}/{{ns}}.json") => {
  // Only initialize once
  if (isInitialized) {
    console.log('i18next already initialized - skipping duplicate initialization');
    return i18next;
  }

  isInitialized = true;

  i18next
    .use(HttpBackend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init<HttpBackendOptions>({
      fallbackLng: "en", // language to use
      interpolation: {
        escapeValue: false // react already safes from xss
      },
      backend: {
        loadPath // Configurable path to load translations
      },
      debug: false // Set to false in production
    });

  return i18next;
};

// Export i18next instance but don't initialize automatically
export type { TFunction } from "i18next";
export default i18next; // Export the non-initialized instance
