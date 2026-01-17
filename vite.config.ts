import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'nlc-xw',
      project: 'biostar-react'
    })
  ],

  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  build: {
    sourcemap: true
  }
});
