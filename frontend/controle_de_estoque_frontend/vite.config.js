import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  server: {
    host: true,
    port: process.env.PORT || 4173
  },
  preview: {
    host: true,
    port: process.env.PORT || 4173
  }
})
