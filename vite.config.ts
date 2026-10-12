import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // GitHub Pages 배포 시에만 VITE_BASE=/PetCare_client/ 로 주입됨 (로컬/Vercel은 "/")
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://3.26.101.146:8080",
        changeOrigin: true,
      },
    },
  },
});
