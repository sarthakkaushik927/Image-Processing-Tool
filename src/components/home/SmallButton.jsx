import React from 'react';
import { motion } from 'framer-motion';


export default function SmallButton({ text, icon, onClick }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.05, backgroundColor: "rgba(129, 140, 248, 0.2)" }} 
      whileTap={{ scale: 0.98 }} 
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors transform flex flex-col items-center justify-center gap-2 
                  bg-indigo-900/10 border-2 border-indigo-400/30 text-indigo-200`}
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  );
}

