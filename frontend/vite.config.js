import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/people': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false
      },
      '/register': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false
      }
      // Add more endpoints if needed
    }
  }
})