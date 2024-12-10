import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src', // Set the root directory to 'src' (where your index.html is)
  server: {
    open: true, // Automatically open the browser
  },
});
