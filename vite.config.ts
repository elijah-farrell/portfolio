import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Makes main stylesheet non-render-blocking: load as print then switch to all when ready. */
function nonBlockingCss() {
  let outDir = "dist";
  return {
    name: "non-blocking-css",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const htmlPath = path.join(outDir, "index.html");
      if (!fs.existsSync(htmlPath)) return;
      let html = fs.readFileSync(htmlPath, "utf-8");
      html = html.replace(
        /<link(\s[^>]*?)rel=["']stylesheet["']([^>]*?)>/gi,
        (match) => {
          if (/media=["']print["']/i.test(match)) return match;
          return match.replace(
            /\s*\/?>$/,
            ' media="print" onload="this.media=\'all\';this.onload=null;">'
          );
        }
      );
      fs.writeFileSync(htmlPath, html);
    },
  };
}

export default defineConfig({
  plugins: [react(), nonBlockingCss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
    strictPort: false,
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'three-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
