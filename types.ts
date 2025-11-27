// Định nghĩa các loại dữ liệu cho ứng dụng

export enum StepType {
  WELCOME = 'WELCOME',
  SHELL = 'SHELL',       // Vỏ bánh
  POWDER = 'POWDER',     // Bột bên trong
  CORE = 'CORE',         // Nhân
  COATING = 'COATING',   // Lớp phủ
  DECOR = 'DECOR',       // Trang trí
  FINISH = 'FINISH'      // Kết thúc
}

export interface BaseOption {
  id: string;
  name: string;
  description?: string;
  image?: string; // Không bắt buộc nữa vì dùng CSS/SVG
  color?: string; // Mã màu hex
  icon?: any; // Icon component cho phần trang trí
}

// Item trang trí có thêm vị trí tọa độ
export interface PlacedDecoration extends BaseOption {
  uniqueId: string; // ID riêng biệt cho từng cái được thả vào
  x: number;
  y: number;
  scale: number;
}

export interface CakeState {
  userName: string;
  shell: BaseOption | null;
  powder: BaseOption | null;
  core: BaseOption | null;
  coating: BaseOption | null;
  decorations: PlacedDecoration[];
}