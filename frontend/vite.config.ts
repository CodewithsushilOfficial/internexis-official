import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increased from default 500
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['framer-motion', 'swiper', 'aos'],
          'threejs-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'lucide-icons': ['lucide-react'],
        },
      },
    },
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {        target: 'https://internexis-official.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    },
  },
  preview: {
    port: 3000,
  },
});
