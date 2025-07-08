import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000
  },
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "public": path.resolve(__dirname, "public")
    }
  }
})