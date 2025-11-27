
import React, { useMemo } from 'react';
import { CakeState, StepType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { resolvePath } from '../utils';

interface PreviewAreaProps {
  cakeState: CakeState;
  currentStep: StepType;
  onUpdateDecorPosition: (id: string, x: number, y: number) => void;
  onRemoveDecor: (id: string) => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ 
  cakeState, 
  currentStep,
  onUpdateDecorPosition,
  onRemoveDecor
}) => {
  const isDecorMode = currentStep === StepType.DECOR;
  const showLid = currentStep === StepType.COATING || currentStep === StepType.DECOR || currentStep === StepType.FINISH;

  // Tính toán vị trí ngẫu nhiên cho các viên nhân (Core Items)
  const coreItems = useMemo(() => {
    if (!cakeState.core) return [];
    
    // Số lượng viên nhân (8-10 viên)
    const count = 8;
    const items = [];
    const radius = 60; // Bán kính rải nhân (nhỏ lại để nằm gọn trong vỏ)

    for (let i = 0; i < count; i++) {
        const r = Math.sqrt(Math.random()) * radius;
        const theta = Math.random() * 2 * Math.PI;
        
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        
        const rotate = Math.random() * 360;
        const scale = 0.8 + Math.random() * 0.4; // 0.8 -> 1.2
        
        items.push({ x, y, rotate, scale, id: i });
    }
    return items;
  }, [cakeState.core?.id]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Container chính của bánh */}
      <div className="relative w-80 h-80">
        
        {/* Layer 1: Vỏ Bánh (Shell) - Phần đáy */}
        <AnimatePresence mode="wait">
          {cakeState.shell && (
            <motion.div
              key={`shell-${cakeState.shell.id}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 rounded-full shadow-2xl overflow-hidden"
              style={{ 
                backgroundColor: cakeState.shell.color 
              }}
            >
              {/* Hiệu ứng Cookie nếu có */}
              {cakeState.shell.id === 'white_cookie' && (
                <div className="absolute inset-0 opacity-60" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#3E2723 3px, transparent 3px)', 
                    backgroundSize: '12px 12px' 
                  }} 
                />
              )}
              {/* Bóng đổ bên trong tạo độ sâu 3D */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 2: Bột (Powder) */}
        {/* Force CSS rendering for animation consistency */}
        <AnimatePresence mode="wait">
          {cakeState.powder && (
            <motion.div
               key={`powder-${cakeState.powder.id}`}
               initial={{ scale: 0 }}
               animate={{ scale: 0.9 }}
               exit={{ scale: 0 }}
               transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
               className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full z-10"
               style={{ 
                 backgroundColor: cakeState.powder.color 
               }}
            >
                {/* Họa tiết bột lợn cợn */}
                <div className="absolute inset-0 opacity-30 mix-blend-multiply"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)',
                        backgroundSize: '4px 4px'
                    }}
                />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 3: Nhân (Core) */}
        {/* Force CSS rendering but with large items */}
        <AnimatePresence mode="wait">
          {cakeState.core && (
            <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                key={`core-group-${cakeState.core.id}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {coreItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: item.scale, rotate: item.rotate }}
                        className="absolute shadow-sm"
                        style={{
                            x: item.x,
                            y: item.y,
                            // Kích thước GẤP 3 lần so với cũ
                            width: cakeState.core?.id === 'marshmallow' ? '64px' : '80px', 
                            height: cakeState.core?.id === 'marshmallow' ? '96px' : '80px',
                            backgroundColor: cakeState.core?.color,
                            borderRadius: cakeState.core?.id === 'marshmallow' ? '12px' : '50%',
                            // Nếu là milo ball thì dùng gradient cho giống viên tròn
                            backgroundImage: cakeState.core?.id === 'milo_ball' 
                                ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)'
                                : 'none'
                        }}
                    >
                         {/* Nếu là Milo ball thì thêm chi tiết sần sùi nhẹ */}
                         {cakeState.core?.id === 'milo_ball' && (
                             <div className="w-full h-full rounded-full border-2 border-black/10 opacity-50"></div>
                         )}
                    </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 4: Nắp Bánh (Lid) */}
        <AnimatePresence>
          {showLid && cakeState.shell && (
            <motion.div
              initial={{ y: -400, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15, mass: 1.2 }}
              className="absolute inset-0 rounded-full shadow-lg z-30"
              style={{ 
                backgroundColor: cakeState.shell.color 
              }}
            >
               {/* Họa tiết Cookie cho nắp */}
               {cakeState.shell.id === 'white_cookie' && (
                <div className="absolute inset-0 opacity-60" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#3E2723 3px, transparent 3px)', 
                    backgroundSize: '12px 12px' 
                  }} 
                />
              )}
               {/* Bóng đổ nhẹ bên trên */}
               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-black/5 pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 5: Lớp Phủ (Coating) */}
        <AnimatePresence mode="wait">
          {cakeState.coating && cakeState.coating.id !== 'none' && showLid && (
            <motion.div
              key={`coating-${cakeState.coating.id}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
            >
               <svg viewBox="0 0 100 100" className="w-[110%] h-[110%] drop-shadow-md">
                  <path 
                    d="M 10 20 Q 20 10, 30 20 T 50 20 T 70 20 T 90 20
                       M 10 40 Q 20 30, 30 40 T 50 40 T 70 40 T 90 40
                       M 10 60 Q 20 50, 30 60 T 50 60 T 70 60 T 90 60
                       M 10 80 Q 20 70, 30 80 T 50 80 T 70 80 T 90 80"
                    fill="none"
                    stroke={cakeState.coating.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))' }}
                  />
               </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 6: Trang Trí (Decorations) */}
        {showLid && cakeState.decorations.map((decor) => (
          <motion.div
            key={decor.uniqueId}
            drag={isDecorMode}
            dragMomentum={false}
            dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
            whileHover={isDecorMode ? { scale: 1.1, cursor: 'grab' } : {}}
            whileTap={isDecorMode ? { scale: 0.95, cursor: 'grabbing' } : {}}
            initial={{ scale: 0, x: decor.x, y: decor.y }}
            animate={{ scale: 1, x: decor.x, y: decor.y }}
            className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 z-50 flex items-center justify-center"
          >
            {isDecorMode && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDecor(decor.uniqueId);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm opacity-0 hover:opacity-100 transition-opacity z-50"
              >
                <X size={10} />
              </button>
            )}

            {/* Render hình ảnh Decor */}
            {decor.image ? (
               // Wrapper để hiển thị lỗi nếu ảnh chết
               <div className="w-full h-full relative">
                  <img 
                    src={resolvePath(decor.image)} 
                    alt={decor.name} 
                    className="w-full h-full object-contain drop-shadow-md pointer-events-none select-none"
                    onError={(e) => {
                       e.currentTarget.style.display = 'none';
                       // Hiện thông báo lỗi thay thế
                       const err = e.currentTarget.parentElement?.querySelector('.decor-error') as HTMLElement;
                       if (err) err.style.display = 'flex';
                    }}
                  />
                  <div className="decor-error hidden absolute inset-0 bg-red-100 border border-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle size={16} className="text-red-500"/>
                  </div>
               </div>
            ) : (
              decor.icon && React.createElement(decor.icon, { 
                size: 32, 
                color: decor.color, 
                fill: "currentColor",
                className: "drop-shadow-sm" 
              })
            )}
          </motion.div>
        ))}

      </div>
    </div>
  );
};
