import { defineConfig } from "vite";
import path from "path"; // path 모듈 가져오기
import react from "@vitejs/plugin-react";

export default defineConfig({
  css: {
    postcss: "./postcss.config.js", // postcss 설정을 명시적으로 지정
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
