import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
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
            src: "assets/icon512_maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "assets/icon512_rounded.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "screenshots/desktop.png",
            sizes: "1280x659",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshots/mobile.png",
            sizes: "597x1280",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "assets/screenshot.png",
            sizes: "3360x1850",
            type: "image/png",
            form_factor: "wide",
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
