import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@logos': path.resolve(__dirname, './src/assets/images/logos'),
      '@icons': path.resolve(__dirname, './src/assets/images/icons'),
      '@fonts': path.resolve(__dirname, './src/assets/fonts'),
    },
  },
});
