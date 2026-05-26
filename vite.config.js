import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/old-site": {
        target: "https://fingramota.kz",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/old-site/, ""),
      },
    },
  },
});