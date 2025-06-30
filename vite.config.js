import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Legacy browser support - with explicit targets
    legacy({
      targets: ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"],
      modernPolyfills: true,
    }), // PWA features - caching and offline support
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
      manifest: {
        name: "Abu Zar Mishwani",
        short_name: "Abu Zar",
        description:
          "Software Engineer and Tech Entrepreneur from Chitral, Pakistan",
        theme_color: "#0a0a0f",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/images/Favicon.webp",
            sizes: "192x192",
            type: "image/webp",
          },
        ],
      },
    }),

    // Gzip compression - instant file size reduction
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024,
      algorithm: "gzip",
      ext: ".gz",
    }),
    // Brotli compression - even better compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024,
      algorithm: "brotliCompress",
      ext: ".br",
    }), // Bundle analyzer - analyze bundle size
    visualizer({
      filename: "build/stats.html",
      open: false, // Don't auto-open during build
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    outDir: "build",
    sourcemap: false,
    minify: "terser",

    // Enhanced terser options for better minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
        reduce_vars: true,
        unsafe: true,
        unsafe_comps: true,
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },

    rollupOptions: {
      output: {
        // Better chunk splitting for optimal loading
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: [
            "./src/components/CustomCursor",
            "./src/components/ThemeTransition",
          ],
        },

        // Asset naming for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    // Optimize chunk size
    chunkSizeWarningLimit: 1000,

    // CSS code splitting
    cssCodeSplit: true,

    // Asset inlining threshold
    assetsInlineLimit: 4096,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom"],
    esbuildOptions: {
      target: "es2020",
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});
