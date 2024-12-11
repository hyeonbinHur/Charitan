import { defineConfig } from "vite";
import path from "path"; // Importing path module for alias resolution
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./src", // Set the root directory to 'src' (where your index.html is)
  server: {
    open: true, // Automatically open the browser when the server starts
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set alias for the src directory
    },
  },
});
