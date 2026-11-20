import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning limit so large-but-valid bundles don't fail the build
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Split major vendors into separate chunks for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['react-bootstrap', 'bootstrap'],
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})
