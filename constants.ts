import { BaseOption, StepType } from './types';
import { Star, Heart, Cloud, Sparkles } from 'lucide-react';

// =====================================================================
// KHU VỰC CẤU HÌNH - TIỆM CHOCOBOMB
// =====================================================================

// THÔNG TIN NGƯỜI NHẬN ĐƠN (Cập nhật email của bạn vào đây)
export const OWNER_CONTACT = {
  email: "tranhuugiahuynb@gmail.com", // Thay bằng email của bạn
  zaloName: "0387073399"
};

// 0. DANH SÁCH NHẠC NỀN
export const MUSIC_PLAYLIST = [
  // Link nhạc mẫu online ổn định (để test)
  // "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  
  // --- NHẠC CỦA BẠN (Bỏ comment khi đã copy file vào thư mục public/music) ---
  // Lưu ý: Đường dẫn không cần dấu ./ hay / ở đầu
  "music/$osaaaaaa.mp3",
  "music/29C219M1.mp3",
  "music/bontaoghetto.mp3",
  "music/hatbuinaohoakiepthantoi.mp3",
  "music/kakaka.mp3",
  "music/ponobrrrbrrr.mp3"
];

// 1. CÁC LOẠI VỎ CHOCOBOMB (SHELLS)
export const SHELLS: BaseOption[] = [
  {
    id: 'white_choco',
    name: 'Socola Trắng',
    description: 'Vỏ socola trắng mịn màng',
    color: '#F9F1F0'
  },
  {
    id: 'dark_choco',
    name: 'Socola Đen',
    description: 'Vỏ nâu bóng bẩy',
    color: '#5D4037'
  },
  {
    id: 'white_cookie',
    name: 'Socola Trắng Cookie',
    description: 'Trắng điểm xuyết vụn bánh quy',
    color: '#F9F1F0'
  }
];

// 2. CÁC LOẠI BỘT BÊN TRONG (POWDERS)
export const POWDERS: BaseOption[] = [
  {
    id: 'milo',
    name: 'Bột Milo',
    description: 'Vị cacao lúa mạch quen thuộc',
    // Lưu ý: Chỉ cần ghi images/tenfile.jpg (không cần ./ hay /)
    image: 'images/milobot.jpg', 
    color: '#8D6E63' 
  },
  {
    id: 'coffee',
    name: 'Bột Cà Phê',
    description: 'Hương vị cà phê sữa',
    image: 'images/cafebot.jpg', 
    color: '#6D4C41'
  }
];

// 3. NHÂN BÊN TRONG (CORES)
export const CORES: BaseOption[] = [
  {
    id: 'milo_ball',
    name: 'Viên Milo Tròn',
    description: 'Giòn tan đậm đà',
    image: 'images/milovien.jpg', 
    color: '#3E2723' 
  },
  {
    id: 'marshmallow',
    name: 'Kẹo Dẻo',
    description: 'Marshmallow trắng mềm mịn',
    image: 'images/marshmallow.jpg', 
    color: '#FFF9C4' 
  }
];

// 4. LỚP PHỦ BÊN TRÊN (COATINGS)
export const COATINGS: BaseOption[] = [
  {
    id: 'dark_drizzle',
    name: 'Sốt Socola Đen',
    description: 'Rưới sốt socola đen ziczac',
    color: '#3E2723'
  },
  {
    id: 'white_drizzle',
    name: 'Sốt Socola Trắng',
    description: 'Rưới sốt socola trắng ziczac',
    color: '#FFFFFF'
  },
  {
    id: 'none',
    name: 'Không phủ',
    description: 'Để trơn đơn giản',
    color: 'transparent'
  }
];

// 5. TRANG TRÍ (DECORATIONS)
export const DECORATIONS: BaseOption[] = [
  {
    id: 'star1',
    name: 'Ngôi Sao Vàng',
    image: 'images/ngoisaovang.png',
    icon: Star,
    color: '#FFD700'
  },
  {
    id: 'pine1',
    name: 'Cây Thông 1',
    image: 'images/caythong1.png',
    icon: Cloud,
    color: '#2E7D32'
  },
  {
    id: 'pine2',
    name: 'Cây Thông 2',
    image: 'images/caythong2.png',
    icon: Cloud,
    color: '#2E7D32'
  },
  {
    id: 'sprinkles1',
    name: 'Cốm Mix 1',
    image: 'images/mix1.png',
    icon: Sparkles,
    color: '#FF4081'
  },
  {
    id: 'sprinkles2',
    name: 'Cốm Mix 2',
    image: 'images/mix2.png',
    icon: Sparkles,
    color: '#F44336'
  },
  {
    id: 'heart',
    name: 'Trái Tim',
    image: 'images/traitim.png',
    icon: Heart,
    color: '#F44336'
  },
  {
    id: 'ball',
    name: 'Quả Cầu 1',
    image: 'images/quacau1.png',
    icon: Heart,
    color: '#F44336'
  },
  {
    id: 'ball2',
    name: 'Quả Cầu 2',
    image: 'images/quacau2.png',
    icon: Heart,
    color: '#F44336'
  },
  {
    id: 'round',
    name: 'Hình Tròn',
    image: 'images/hinhtron.png',
    icon: Heart,
    color: '#F44336'
  }
];

// Cấu hình Flow các bước đi
export const STEPS_FLOW = [
  { id: StepType.SHELL, title: 'Chọn Vỏ Bánh', data: SHELLS, help: 'Vỏ ngoài Chocobomb bạn thích màu gì?' },
  { id: StepType.POWDER, title: 'Chọn Bột', data: POWDERS, help: 'Bột bên trong sẽ tan chảy ra...' },
  { id: StepType.CORE, title: 'Chọn Nhân', data: CORES, help: 'Topping bí mật bên trong.' },
  { id: StepType.COATING, title: 'Lớp Phủ', data: COATINGS, help: 'Rưới thêm ít sốt lên mặt bánh nhé!' },
  { id: StepType.DECOR, title: 'Trang Trí', data: DECORATIONS, help: 'Kéo thả hình để trang trí.' },
];
