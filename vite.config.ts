import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/neatmark/",
  build: {
    minify: false,
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Neatmark",
        short_name: "Neatmark",
        description: "A Notion-inspired bookmark manager.",
        display: "standalone",
        theme_color: "#f4f4f5",
        background_color: "#f4f4f5",
        icons: [
          {
            src: "assets/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
          {
            src: "assets/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
          {
            src: "assets/logo192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "assets/logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\/data\/.*/,
            handler: "NetworkFirst",
          },
          {
            urlPattern: /.*\/assets\/.*/,
            handler: "StaleWhileRevalidate",
          },
        ],
      },
    }),
  ],
});
