import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ build 후 로컬 경로에서 index.html 로드 가능
  build: {
    outDir: "dist",
  },
});