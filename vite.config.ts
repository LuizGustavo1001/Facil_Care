import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],

      manifest: {
        id: "/",

        name: 'FacilCare - Health Management',
        short_name: 'FacilCare',
        description: "Manage patient's health data",

        display: 'standalone',

        theme_color: '#50719a',
        background_color: '#F5F6FA',

        start_url: '/',
        scope: "/",

        orientation: "any",

        categories: [
          'medical',
          'health',
          'productivity'
        ],

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
            sizes: '512x512',
            type: 'image/png',
            purpose: 'monochrome'
          }
        ],

        shortcuts: [
          {
            name: "Add new Medicine",
            short_name: "ADd new Medicine",
            url: "/register/medicines"
          },
          {
            name: "Emergency Data",
            short_name: "Emergency Data",
            url: "/emergencyData",
          },
          {
            name: "Weekly Schedule Medicines",
            short_name: "Weekly Schedule Medicines",
            url: "/weekSchedule"
          }
        ],

        screenshots: [
          {
            src: '/home-page.jpeg',
            sizes: '720x1267',
            type: 'image/jpeg',
            form_factor: 'narrow',
            label: 'FacilCare Home Page'
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