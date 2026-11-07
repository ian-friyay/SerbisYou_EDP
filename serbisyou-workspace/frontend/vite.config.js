import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'SerbisYou - Campus Skill Marketplace',
        short_name: 'SerbisYou',
        description: 'Student-to-student creative, event support, and digital service transactions.',
        theme_color: '#0d6efd',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Background sync and offline runtime caching configuration
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.serbisyou\.local\/api\/.*|^\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'serbisyou-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
              // Background sync configuration for offline mutation requests
              backgroundSync: {
                name: 'serbisyou-background-sync-queue',
                options: {
                  maxRetentionTime: 24 * 60, // Retry for up to 24 hours (in minutes)
                },
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
      },
    },
  },
});
