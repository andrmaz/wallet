/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { join } from 'path';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/libs/common',

  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
      include: ['src/**/*.{ts,tsx}'],
    }),
  ],

  // Configure Vitest
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },

  css: {
    // Enable CSS modules for all CSS files
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },

  // Specify the build configuration
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'common',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    cssCodeSplit: false, // Keep all CSS in one file
    rollupOptions: {
      external: ['react', 'react-dom', 'react-i18next', 'i18next'],
      output: {
        // Preserve CSS files with a consistent name
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'assets/style.css';
          return 'assets/[name]-[hash][extname]';
        },
        // Ensure CSS is extracted properly
        inlineDynamicImports: false,
      },
    },
  },
});
