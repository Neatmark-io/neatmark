import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, false);

  return {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: function (file) {
            return file.names.some((name) => name.includes("css"))
              ? `assets/[name]-[hash].[ext]`
              : `assets/[name].[ext]`;
          },
        },
      },
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Neatmark",
          short_name: "Neatmark",
          description: "A Notion-inspired bookmark manager.",
          display: "standalone",
          theme_color: "#f4f4f5",
          background_color: "#f4f4f5",
          icons: [
            { src: "icon512_maskable.png", purpose: "maskable", sizes: "512x512", type: "image/png" },
            { src: "icon512_rounded.png", purpose: "any", sizes: "512x512", type: "image/png" },
            { src: "assets/favicon.ico", sizes: "48x48", type: "image/x-icon" },
            { src: "assets/favicon.svg", sizes: "any", type: "image/svg+xml" },
          ],
          screenshots: [
            { src: "screenshots/desktop.png", sizes: "1280x659", type: "image/png", form_factor: "wide" },
            { src: "screenshots/mobile.png", sizes: "597x1280", type: "image/png", form_factor: "narrow" },
          ],
          start_url: env["BASE_URL"],
          orientation: "any",
          lang: "en-US",
        },
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ["**/*.{html,css,js,ico,svg,png,jpg}"],
          runtimeCaching: [
            {
              urlPattern: /.*\/assets\/.*/,
              handler: "CacheFirst",
            },
            {
              urlPattern: /.*\/data\/.*/,
              handler: "NetworkFirst",
            },
          ],
        },
      }),
    ],
  };
});
