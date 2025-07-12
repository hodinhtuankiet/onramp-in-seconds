import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer', '@lazorkit/wallet', 'axios'],
    exclude: ['lucide-react', 'framer-motion']
  },
  server: {
    port: 5173,
    host: true
  }
})