import React from 'react';
import { BaseOption } from '../types';
import { motion } from 'framer-motion';
import { Check, Plus, ImageOff } from 'lucide-react';
import clsx from 'clsx';
import { resolvePath } from '../utils';

interface OptionListProps {
  title: string;
  options: BaseOption[];
  selectedId?: string;
  onSelect: (option: BaseOption) => void;
  isDecorMode?: boolean;
}

export const OptionList: React.FC<OptionListProps> = ({ 
  title, 
  options, 
  selectedId, 
  onSelect,
  isDecorMode = false
}) => {
  
  // Render thumbnail tùy loại (ảnh, màu sắc, icon, pattern)
  const renderThumbnail = (option: BaseOption) => {
    // 1. Nếu có Ảnh (Dùng cho Bột & Trang trí), ưu tiên render Ảnh
    if (option.image) {
      return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden">
          <img 
            src={resolvePath(option.image)} 
            alt={option.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Xử lý khi ảnh lỗi (chưa chép file vào)
              e.currentTarget.style.display = 'none';
              // Hiển thị icon lỗi tạm thời
            }}
          />
          {/* Fallback hiển thị dưới ảnh nếu ảnh lỗi (do ảnh che mất nếu load đc) */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
             <ImageOff size={16} />
          </div>
        </div>
      );
    }

    // 2. Nếu có Icon (Decor fallback), render Icon
    if (option.icon) {
      const IconCmp = option.icon;
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-600" style={{ color: option.color }}>
          <IconCmp size={32} fill="currentColor" />
        </div>
      );
    }

    // 3. Xử lý riêng hình minh họa cho Cookie (Step 1)
    if (option.id === 'white_cookie') {
      return (
        <div className="w-full h-full relative" style={{ backgroundColor: option.color }}>
          <div className="absolute inset-0 opacity-50" 
             style={{ backgroundImage: 'radial-gradient(#3E2723 2px, transparent 2px)', backgroundSize: '8px 8px' }} />
        </div>
      );
    }
    
    // 4. Xử lý riêng cho Ziczac Coating (Step 4)
    if (option.id.includes('drizzle')) {
       return (
         <div className="w-full h-full relative bg-gray-100 flex items-center justify-center">
             <svg viewBox="0 0 40 20" width="80%" height="80%">
                <path d="M0 10 Q 5 0 10 10 T 20 10 T 30 10 T 40 10" stroke={option.color} strokeWidth="3" fill="none" />
             </svg>
         </div>
       );
    }

    // 5. Default: Hiển thị khối màu (Step 1, 3)
    if (option.color && option.color !== 'transparent') {
      return (
        <div className="w-full h-full" style={{ backgroundColor: option.color }}>
          {/* Bóng đổ nhẹ tạo khối */}
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-black/10"></div>
        </div>
      );
    }

    // Trường hợp 'None'
    return (
       <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
          Trống
       </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 px-1">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 overflow-y-auto pb-4 pr-2 custom-scrollbar">
        {options.map((option, index) => {
          const isSelected = selectedId === option.id;
          
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(option)}
              className={clsx(
                "relative flex items-center p-3 rounded-xl border-2 transition-all duration-200 text-left group",
                isSelected && !isDecorMode
                  ? "border-brand-500 bg-brand-50 shadow-md ring-2 ring-brand-200"
                  : "border-gray-100 bg-white hover:border-brand-200 hover:shadow-sm"
              )}
            >
              {/* Thumbnail Area */}
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 shadow-inner relative">
                {renderThumbnail(option)}
              </div>
              
              <div className="ml-4 flex-1">
                <p className={clsx("font-bold", isSelected && !isDecorMode ? "text-brand-700" : "text-gray-700")}>
                  {option.name}
                </p>
                {option.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{option.description}</p>
                )}
              </div>

              {/* Status Indicator */}
              {isDecorMode ? (
                 <div className="bg-brand-100 text-brand-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <Plus size={16} />
                 </div>
              ) : (
                isSelected && (
                  <div className="absolute top-3 right-3 bg-brand-500 text-white p-1 rounded-full shadow-sm">
                    <Check size={12} />
                  </div>
                )
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
