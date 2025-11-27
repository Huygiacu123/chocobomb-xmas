import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bomb } from 'lucide-react'; // Changed Cake to Bomb for fun

interface WelcomeProps {
  onStart: (name: string) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      setError('Bạn ơi, cho mình biết tên với nhé!');
      return;
    }
    onStart(name);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8 p-8 bg-brand-100 rounded-full shadow-xl"
      >
        {/* Chocobomb Icon Representation */}
        <div className="relative w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center">
            <div className="absolute top-2 right-4 w-4 h-4 bg-white/30 rounded-full blur-[2px]"></div>
            <Bomb size={40} className="text-brand-100" />
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        Chào mừng đến với <br/>
        <span className="text-brand-600">Tiệm Chocobomb</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 mb-8 max-w-md text-lg"
      >
        Hãy cùng tạo ra quả bom socola ngọt ngào nhất thế giới theo cách của riêng bạn!
      </motion.p>

      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <div className="relative">
          <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-1 ml-1">
            Mình có thể gọi bạn là gì?
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Nhập tên của bạn..."
            className="w-full px-5 py-3 rounded-xl border-2 border-brand-200 focus:border-brand-500 focus:ring focus:ring-brand-200 focus:ring-opacity-50 transition-all outline-none text-lg"
          />
          {error && <p className="text-red-500 text-sm mt-1 text-left ml-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="group w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          Bắt đầu thiết kế <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.form>
    </div>
  );
};