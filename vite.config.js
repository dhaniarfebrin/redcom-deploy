import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      // includeAssets: ['favicon.ico', './src/assets/'],
      manifest: {
        name: 'Tanya Redcom',
        short_name: 'Redcom',
        description: 'RedCom is where hundreds of millions of students and education experts share their knowledge, learning together to solve even the most complex problems.',
        theme_color: '#f8f9fa',
        icons: [
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ]
      },
      workbox: {
        runtimeCaching: [{
          urlPattern: ({ url }) => {
            return url.pathname.startsWith("/api")
          },
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
