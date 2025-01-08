import { defineConfig } from "vite";
import path from "path"; // Importing path module for alias resolution
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./src",
  server: {
    open: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
