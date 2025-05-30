import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // Proxy /api requests to backend server
      '/api': {
        target: 'http://localhost:5000', // change this to your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
