import React from 'react';
import { motion } from 'framer-motion';


export default function AuthPageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="w-full max-w-lg"
    >
      {children}
    </motion.div>
  );
}

