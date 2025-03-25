// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 如果你用的是 React

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://rental-management-backend.vercel.app',
        changeOrigin: true,
        secure: true, // 因为是 https 请求
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
  }
});
