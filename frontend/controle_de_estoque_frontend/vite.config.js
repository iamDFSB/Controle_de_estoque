import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  build: {
    outDir: 'dist'
  },
  preview: {
    allowedHosts: ['.onrender.com']
  }
})
