import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import { analyzer } from 'vite-bundle-analyzer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' && analyzer({
      analyzerMode: 'server',
      openAnalyzer: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching - but everything loads immediately
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-checkbox', '@radix-ui/react-dropdown-menu', '@radix-ui/react-hover-card', '@radix-ui/react-label', '@radix-ui/react-navigation-menu', '@radix-ui/react-popover', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-slot', '@radix-ui/react-switch', '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-toggle', '@radix-ui/react-toggle-group', '@radix-ui/react-tooltip'],
          'animation': ['framer-motion', 'motion'],
          'icons': ['react-icons', 'lucide-react', '@tabler/icons-react'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'particles': ['@tsparticles/engine', '@tsparticles/react', '@tsparticles/slim'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Development server configuration
  server: {
    host: true,
    port: 5173,
    hmr: false, // Disable HMR to avoid WebSocket issues
    headers: {
      'Cache-Control': 'max-age=31536000',
    },
  },
}));
