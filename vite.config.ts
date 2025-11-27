import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- CẤU HÌNH QUAN TRỌNG ---
  // Sử dụng './' (đường dẫn tương đối) giúp web chạy được ở mọi nơi:
  // 1. Chạy trên GitHub Pages OK
  // 2. Chạy trên Vercel/Netlify OK
  // 3. Mở file index.html trực tiếp trên máy cũng OK
  base: '/chocobomb-xmas/', 
});