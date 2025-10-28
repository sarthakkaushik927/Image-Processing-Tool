import React from 'react';
import { motion } from 'framer-motion';



export default function BubblesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Bubble 1 */}
      <motion.div 
        className="absolute w-96 h-96 bg-purple-800 rounded-full filter blur-3xl"
        initial={{ x: '-10rem', y: '-10rem' }}
        animate={{ 
          x: ['-10rem', '0rem', '-10rem'], 
          y: ['-10rem', '10rem', '-10rem'], 
          scale: [1, 1.2, 1], 
        }}
        transition={{
          duration: 15, 
          repeat: Infinity, 
          ease: 'easeInOut',
        }}
      />
      {/* Bubble 2 */}
      <motion.div 
        className="absolute w-96 h-96 bg-blue-800 rounded-full filter blur-3xl"
        initial={{ x: '20rem', y: '20rem' }} 
        animate={{ 
          x: ['20rem', '10rem', '20rem'],
          y: ['20rem', '10rem', '20rem'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 20, 
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5, 
        }}
      />
       {/* Bubble 3 */}
      <motion.div 
        className="absolute w-80 h-80 bg-indigo-800 rounded-full filter blur-3xl"
        initial={{ x: '10rem', y: '5rem' }} 
        animate={{ 
          x: ['10rem', '15rem', '10rem'],
          y: ['5rem', '10rem', '5rem'],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />
    </div>
  );
}
