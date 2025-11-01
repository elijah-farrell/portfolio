import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Bundle analyzer (only in analyze mode)
    mode === 'analyze' && analyzer({
      summaryMode: true,
      open: true,
    }),
    // Gzip compression for production
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1KB
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg)$/i, // Fix path issue by filtering properly
    }),
    // Brotli compression (better than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg)$/i,
    }),
  ].filter(Boolean),
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
    // Exclude Three.js from pre-bundling - we want it lazy loaded
    exclude: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true, // Split CSS per page/component
    commonjsOptions: {
      include: [/tslib/, /node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // IMPORTANT: Three.js must be FIRST to ensure it's always separate
          if (id.includes('node_modules')) {
            // Three.js ecosystem - MUST be separate chunk (707KB)
            if (id.includes('three') || id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
              return 'three-vendor';
            }
            // Framer Motion - separate large animation library
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
            // React core (react, react-dom)
            if (id.includes('react') && !id.includes('react-icons') && !id.includes('react-router')) {
              return 'react-vendor';
            }
            // UI libraries (Radix, Emotion)
            if (id.includes('@radix-ui') || id.includes('@emotion')) {
              return 'ui-vendor';
            }
            // Icons and utilities
            if (id.includes('react-icons') || id.includes('lucide-react') || id.includes('tabler-icons')) {
              return 'icons-vendor';
            }
            // Everything else from node_modules
            return 'vendor';
          }
          
          // Split Three.js-related components into separate chunk
          // This ensures Three.js doesn't get bundled with Skills component
          if (id.includes('/components/ui/aceternity/canvas-reveal-effect')) {
            return 'three-components'; // Separate chunk for Three.js components
          }
          
          // Split large component files
          if (id.includes('/components/ui/aceternity/')) {
            if (id.includes('tracing-beam')) {
              return 'tracing-beam';
            }
          }
          
          // Don't bundle Skills component with Three.js
          // Skills is lazy loaded, so it should be separate
          if (id.includes('/components/home/Skills')) {
            return 'skills';
          }
        },
        // Optimize chunk file names - preserve manual chunk names
        chunkFileNames: (chunkInfo) => {
          // Preserve manual chunk names (like 'three-vendor', 'motion-vendor')
          if (chunkInfo.name) {
            return `assets/${chunkInfo.name}-[hash].js`;
          }
          // Fallback for auto-generated chunks
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.[^.]*$/, '')
            : 'chunk';
          return `assets/${facadeModuleId || 'chunk'}-[hash].js`;
        },
      },
    },
    chunkSizeWarningLimit: 500, // Lower limit to catch large chunks
    target: 'esnext',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // Optimize assets
    assetsInlineLimit: 4096, // Inline small assets (< 4KB) as base64
  },
}));
