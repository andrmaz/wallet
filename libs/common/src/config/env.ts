// Utility to get environment variables with graceful fallbacks
// Compatible with both Vite and Node.js environments

/**
 * Gets host from environment with fallback
 * @returns host string
 */
export const getHost = (): string => {
  // For Vite apps
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_HOST || 'localhost';
  }
  // For Node.js
  return process.env.HOST || 'localhost';
};

/**
 * Gets port from environment with fallback
 * @returns port number
 */
export const getPort = (): number => {
  // For Vite apps
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_PORT ? Number(import.meta.env.VITE_PORT) : 3333;
  }
  // For Node.js
  return process.env.PORT ? Number(process.env.PORT) : 3333;
};

/**
 * Gets API URL with configured host and port
 * @returns API base URL
 */
export const getApiUrl = (): string => {
  const host = getHost();
  const port = getPort();
  return `http://${host}:${port}`;
};
