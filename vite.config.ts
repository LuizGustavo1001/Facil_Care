import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

export default defineConfig({
  server: {
    watch: {
      usePolling: true
    }
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'FacilCare',
        short_name: 'FacilCare',
        description: "Manage patient's health data",

        display: 'standalone',

        theme_color: '#4267B2',
        background_color: '#F5F6FA',

        start_url: '/',
        scope: "/",

        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icon-monochrome.png',
            sizes: '432x432',
            type: 'image/png',
            purpose: 'monochrome'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vue-i18n']
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    },
    dedupe: ['vue', 'vue-router']
  }
})