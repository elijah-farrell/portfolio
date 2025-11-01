import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ['tslib', 'react-remove-scroll', '@emotion/react', '@emotion/styled', '@emotion/cache'],
  },
  build: {
    minify: 'terser',
    commonjsOptions: {
      include: [/tslib/, /node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Keep node_modules together by package to avoid initialization issues
          if (id.includes('node_modules')) {
            // Three.js is large, keep it separate
            if (id.includes('three')) {
              return 'three-vendor';
            }
            // Framer Motion is large, keep it separate
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
            // Everything else from node_modules goes into vendor
            // This includes React, Emotion, Radix UI, etc. to prevent init issues
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
