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
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React and core libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          
          // Three.js and 3D libraries
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          
          // Framer Motion
          if (id.includes('framer-motion')) {
            return 'motion-vendor';
          }
          
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          
          // Icons
          if (id.includes('react-icons') || id.includes('lucide-react') || id.includes('@tabler/icons')) {
            return 'icons-vendor';
          }
          
          // Router and navigation
          if (id.includes('react-router') || id.includes('react-helmet')) {
            return 'router-vendor';
          }
          
          // Utility libraries
          if (id.includes('clsx') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
            return 'utils-vendor';
          }
          
          // Large components that can be split
          if (id.includes('components/ui/3d-card') || id.includes('components/ui/canvas-reveal-effect')) {
            return '3d-components';
          }
          
          if (id.includes('components/ui/background-') || id.includes('components/ui/glowing-effect')) {
            return 'background-components';
          }
          
          // Default chunk for everything else
          return 'main';
        },
      },
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
