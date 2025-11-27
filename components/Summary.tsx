import React from 'react';
import { CakeState } from '../types';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, Mail, Copy, Check } from 'lucide-react';
import { OWNER_CONTACT } from '../constants';

interface SummaryProps {
  cakeState: CakeState;
  onReset: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ cakeState, onReset }) => {
  const [copied, setCopied] = React.useState(false);

  // Tạo nội dung chữ để gửi
  const generateOrderText = () => {
    return `
=== ĐƠN HÀNG CHOCOBOMB MỚI ===
👤 Khách hàng: ${cakeState.userName}
--------------------------------
1. Vỏ bánh: ${cakeState.shell?.name}
2. Bột: ${cakeState.powder?.name}
3. Nhân: ${cakeState.core?.name}
4. Phủ: ${cakeState.coating?.name || 'Không'}
5. Trang trí: ${cakeState.decorations.map(d => d.name).join(', ') || 'Không'}
--------------------------------
Mong sớm nhận được bánh ngon từ Tiệm!
    `.trim();
  };

  const handleCopy = () => {
    const text = generateOrderText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    alert("Đã sao chép đơn hàng! Bạn có thể gửi qua Zalo hoặc Messenger ngay.");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Đơn Chocobomb từ ${cakeState.userName}`);
    const body = encodeURIComponent(generateOrderText());
    window.location.href = `mailto:${OWNER_CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto min-h-screen">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-brand-400 w-full"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-brand-100 p-4 rounded-full text-brand-500 animate-bounce">
            <Heart size={48} fill="currentColor" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tuyệt vời quá, {cakeState.userName}!</h2>
        <p className="text-gray-600 mb-8">
          Bạn vừa tạo ra một quả bom socola siêu hấp dẫn. Hãy gửi đơn ngay để chúng mình thực hiện nhé!
        </p>

        <div className="bg-brand-50 rounded-2xl p-6 text-left mb-8 border border-brand-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-brand-200 pb-2">Chi tiết "Chocobomb":</h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="text-gray-500">Vỏ bánh:</span>
              <span className="font-semibold text-gray-800">{cakeState.shell?.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Bột bên trong:</span>
              <span className="font-semibold text-gray-800">{cakeState.powder?.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Nhân:</span>
              <span className="font-semibold text-gray-800">{cakeState.core?.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Lớp phủ:</span>
              <span className="font-semibold text-gray-800">{cakeState.coating?.name || 'Không'}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-all active:scale-95"
          >
            {copied ? <Check size={20} className="text-green-600"/> : <Copy size={20} />}
            {copied ? "Đã sao chép!" : "Sao chép đơn (Gửi Zalo/Mess)"}
          </button>
          
          <button 
            onClick={handleEmail}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Mail size={20} /> Gửi Email đặt hàng
          </button>

          <button 
            onClick={onReset}
            className="mt-4 text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 text-sm"
          >
            <RefreshCw size={14} /> Làm cái mới
          </button>
        </div>
      </motion.div>
    </div>
  );
};