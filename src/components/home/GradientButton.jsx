import React from 'react';
import { motion } from 'framer-motion';

export default function GradientButton({ text, icon, isBlue = false, isOutline = false }) {
  
  const blueClasses = "bg-blue-600 hover:bg-blue-700 text-white";
  const purpleClasses = "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white";
  const outlineClasses = "bg-transparent border-2 border-purple-400  text-purple-300 hover:bg-purple-900/50";
  
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.98 }}  
      className={` px-8 lg: py-3 rounded-lg font-semibold shadow-lg transition-transform transform flex items-center justify-center gap-2 ${
        isOutline ? outlineClasses : (isBlue ? blueClasses : purpleClasses)
      }`}
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  );
}

