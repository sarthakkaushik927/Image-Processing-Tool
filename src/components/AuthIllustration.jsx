import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';


export default function AuthIllustration() {
  return (
    <div className="w-1/2 bg-linear-to-br from-blue-700 via-purple-600 to-purple-700 p-12 items-center justify-center relative hidden md:flex">
      
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2, type: 'spring' } }}
        className="w-full h-96 bg-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-8 shadow-xl object-cover "
      >
        <ImageIcon size={80} className="text-white/50" />
        <img  src="/login2.svg" alt="" />
        <h3 className="z-10 translate-y-[-40px] text-2xl font-bold mt-4 text-white">Image Processing Tool</h3>
        
      </motion.div>
    </div>
  );
}
