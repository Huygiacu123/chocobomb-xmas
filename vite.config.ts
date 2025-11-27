import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- CẤU HÌNH QUAN TRỌNG ĐỂ UPLOAD LÊN GITHUB ---
  // Thay đổi dòng dưới đây thành tên Repository bạn vừa tạo trên GitHub.
  // Ví dụ: Nếu bạn đặt tên repo là "tiem-chocobomb", hãy sửa thành: base: '/tiem-chocobomb/',
  // Nhớ có dấu gạch chéo / ở đầu và cuối.
  
  base: '/chocobomb-xmas/', 
});