import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';


export default function AuthButton({ text, icon, iconAfter, onClick, isSecondary = false, isLoading = false, isGradient = false }) {
  const baseClasses = "w-full flex items-center justify-center gap-3 py-3 rounded-lg font-bold text-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  
  const primaryClasses = "bg-white text-indigo-700 hover:bg-gray-200 focus:ring-white";
  const secondaryClasses = "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 focus:ring-gray-600";
  const gradientClasses = "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 focus:ring-purple-500";
  
  let appliedClasses = primaryClasses;
  if (isSecondary) appliedClasses = secondaryClasses;
  if (isGradient) appliedClasses = gradientClasses;
  
  return (
    <motion.button
      whileHover={{ scale: isLoading ? 1 : 1.03 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${appliedClasses} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <Loader2 size={22} className="animate-spin" />
      ) : (
        <>
          {icon}
          <span>{text}</span>
          {iconAfter}
        </>
      )}
    </motion.button>
  );
}

