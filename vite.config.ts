import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: [
      '3bd2043f-18d4-48ca-8b0a-b6fb20285fcf-00-2csokweztmjob.sisko.replit.dev'
    ]
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