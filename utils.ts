
/**
 * Hàm này giúp sửa đường dẫn ảnh để chạy đúng trên cả Local, GitHub Pages và Vercel
 * Khi dùng base: './' trong vite.config.ts, import.meta.env.BASE_URL sẽ là './'
 */
export const resolvePath = (path: string | undefined) => {
  if (!path) return '';
  
  // Nếu là link online (http...) thì giữ nguyên
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }

  // Lấy Base URL từ cấu hình vite.config.ts (sẽ là './')
  let baseUrl = import.meta.env.BASE_URL;
  
  // Đảm bảo baseUrl luôn kết thúc bằng /
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  // Xóa dấu gạch chéo hoặc chấm ở đầu path input nếu có
  // Ví dụ: ./images/a.jpg -> images/a.jpg
  //       /images/a.jpg -> images/a.jpg
  const cleanPath = path.replace(/^(\.\/|\/)/, '');

  // Kết quả sẽ là: ./images/a.jpg
  return `${baseUrl}${cleanPath}`;
};