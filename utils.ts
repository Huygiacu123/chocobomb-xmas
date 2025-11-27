
/**
 * Hàm này giúp sửa đường dẫn ảnh để chạy đúng trên cả Local và GitHub Pages
 * Nó sẽ tự động thêm Base URL (ví dụ: /chocobomb-max/) vào trước tên file
 */
export const resolvePath = (path: string | undefined) => {
  if (!path) return '';
  
  // Nếu là link online (http...) thì giữ nguyên
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }

  // Lấy Base URL từ cấu hình vite.config.ts
  const baseUrl = import.meta.env.BASE_URL;

  // Xóa dấu gạch chéo hoặc chấm ở đầu path nếu có (để tránh bị double slash //)
  // Ví dụ: ./images/a.jpg -> images/a.jpg
  //       /images/a.jpg -> images/a.jpg
  const cleanPath = path.replace(/^(\.\/|\/)/, '');

  // Nối chuỗi: /chocobomb-max/ + images/a.jpg
  return `${baseUrl}${cleanPath}`;
};
