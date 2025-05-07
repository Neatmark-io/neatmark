import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: false,
      entry: "/src/main.tsx",
      template: "public/index.html",
    }),
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
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: "/data/bookmarks.json",
            handler: "CacheFirst",
          },
        ],
      },
    }),
  ],
});
