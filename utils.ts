
/**
 * Hàm này giúp sửa đường dẫn ảnh
 * Chỉ đơn giản là trả về đường dẫn tương đối (relative path)
 * Ví dụ: "images/abc.jpg" -> trình duyệt sẽ tự tìm file này nằm cùng cấp với file web
 */
export const resolvePath = (path: string | undefined) => {
  if (!path) return '';
  
  // Nếu là link online (http...) thì giữ nguyên
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }

  // Xóa hết dấu ./ hoặc / ở đầu để đưa về dạng chuẩn "folder/file.ext"
  // Ví dụ: ./images/a.jpg -> images/a.jpg
  //       /images/a.jpg -> images/a.jpg
  const cleanPath = path.replace(/^(\.\/|\/)/, '');

  return cleanPath;
};
