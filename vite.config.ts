import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@/shared': resolve('./src/shared'),
      '@/features': resolve('./src/features'),
      '@/app': resolve('./src/app')
    }
  },

  // Build configuration for SSR
  build: {
    rollupOptions: {
      input: {
        client: './src/app/entry-client.tsx',
        server: './src/app/entry-server.tsx'
      }
    }
  },

  // SSR configuration - externalize React dependencies
  ssr: {
    noExternal: ['react', 'react-dom', '@tanstack/react-query', 'react-router-dom']
  },

  // Define global variables for SSR compatibility
  define: {
    global: 'globalThis',
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query']
  }
})
