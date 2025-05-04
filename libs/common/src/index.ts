// Export translations
export * from './hooks/locale';
export * from './libs/i18n';

// Export GraphQL utilities
export * from './libs/client';
export * from './libs/graphql';

// Export environment utilities
export * from './config/env';

// Export CSS files
import './styles/globals.css';
import './styles/theme.css';

// Note: CSS files are now imported and re-exported from this index file
// So they can be imported as: import '@wallet/common'
