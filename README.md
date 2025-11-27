# Hướng Dẫn Cài Đặt và Triển Khai Lên GitHub Pages (Từ A đến Z)

Chào bạn, đây là hướng dẫn chi tiết để đưa trang web này lên internet hoàn toàn miễn phí.

## PHẦN 1: Cài đặt và Chạy thử dưới máy tính (Local)

### 1. Cài đặt môi trường
1. Tải và cài đặt **Node.js** (phiên bản LTS) tại [nodejs.org](https://nodejs.org/).
2. Tải và cài đặt **Git** tại [git-scm.com](https://git-scm.com/).
3. Mở **Terminal** (Mac) hoặc **Command Prompt / PowerShell** (Windows).

### 2. Tạo dự án và thêm thư viện
Chạy lần lượt các lệnh sau:

```bash
# 1. Tạo dự án Vite mới (chọn React + TypeScript)
npm create vite@latest tiem-banh-dream -- --template react-ts

# 2. Đi vào thư mục dự án
cd tiem-banh-dream

# 3. Cài đặt các thư viện cần thiết cho web này
npm install
npm install lucide-react framer-motion clsx tailwind-merge uuid gh-pages
```

*Lưu ý: Lệnh trên có cài thêm `gh-pages` để hỗ trợ đưa lên GitHub.*

### 3. Chép code vào dự án
1. Mở thư mục `tiem-banh-dream` vừa tạo bằng VS Code hoặc File Explorer.
2. **Xóa** hết các file cũ trong thư mục `src` và chép code tôi đưa cho bạn vào đó.
   - `App.tsx`, `constants.ts`, `types.ts`, `index.css`... vào thư mục `src`.
   - Tạo thư mục `src/components` và chép các file component vào.
   - File `vite.config.ts` để ở thư mục gốc (ngang hàng `package.json`).
3. **Thêm Nhạc và Ảnh (Quan trọng):**
   - Tạo thư mục `public/images` và `public/music`.
   - Chép file nhạc/ảnh của bạn vào đó.

### 4. Chạy thử
Gõ lệnh: `npm run dev` -> Mở link hiện ra để xem web chạy ok chưa.

---

## PHẦN 2: Đưa lên GitHub Pages (Deploy)

### Bước 1: Tạo kho chứa trên GitHub
1. Đăng nhập [GitHub](https://github.com).
2. Tạo Repository mới:
   - Tên: Ví dụ `tiem-banh-ngot` (đặt tên không dấu, viết liền).
   - Chọn **Public**.
   - Nhấn **Create repository**.

### Bước 2: Sửa cấu hình (Rất quan trọng)
1. Mở file `vite.config.ts`.
2. Tìm dòng `base: '/ten-repo-cua-ban/'`.
3. Đổi tên đó thành tên repo bạn vừa tạo. Ví dụ: `base: '/tiem-banh-ngot/'`.

### Bước 3: Cấu hình lệnh Deploy
1. Mở file `package.json`.
2. Tìm phần `"scripts"`, thêm 2 dòng này vào:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "predeploy": "npm run build",   // <--- THÊM DÒNG NÀY
  "deploy": "gh-pages -d dist"    // <--- THÊM DÒNG NÀY
},
```

### Bước 4: Đẩy code và Public
Quay lại cửa sổ dòng lệnh (Terminal), gõ lần lượt:

```bash
# 1. Khởi tạo git
git init

# 2. Kết nối với GitHub (Thay link bằng link repo của bạn)
git remote add origin https://github.com/TEN_CUA_BAN/tiem-banh-ngot.git

# 3. Lưu code và nhạc/ảnh
git add .
git commit -m "Web banh kem dau tien"

# 4. Đẩy code lên nhánh chính
git branch -M main
git push -u origin main

# 5. Đưa web lên mạng (Chỉ cần chạy lệnh này mỗi khi sửa code)
npm run deploy
```

### Bước 5: Tận hưởng
Sau khi chạy `npm run deploy` xong và báo "Published", bạn đợi khoảng 2-3 phút.
Truy cập: `https://TEN_CUA_BAN.github.io/tiem-banh-ngot/`

---

## Hướng dẫn thay đổi hình ảnh và thành phần
1. Mở file `constants.ts`.
2. Tôi đã ghi chú rất rõ bằng tiếng Việt chỗ nào cần thay ảnh.
   - Ví dụ: `image: "./images/banh-1.jpg"`
3. Bạn chỉ cần thay đường dẫn trong dấu ngoặc kép thành tên file thật của bạn là xong.
