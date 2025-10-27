import React from 'react';
import { motion } from 'framer-motion';

/**
 * Naya Animated Bubbles Background (FotoFix Homepage ke liye)
 * Yeh Framer Motion ka use karta hai smooth animation ke liye.
 */
export default function BubblesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Bubble 1 */}
      <motion.div 
        className="absolute w-96 h-96 bg-purple-700/10 rounded-full filter blur-3xl"
        initial={{ x: '-10rem', y: '-10rem' }} // Start position
        animate={{ 
          x: ['-10rem', '0rem', '-10rem'], // Move horizontally
          y: ['-10rem', '10rem', '-10rem'], // Move vertically
          scale: [1, 1.2, 1], // Change size
        }}
        transition={{
          duration: 15, // Animation duration
          repeat: Infinity, // Loop forever
          ease: 'easeInOut',
        }}
      />
      {/* Bubble 2 */}
      <motion.div 
        className="absolute w-96 h-96 bg-blue-700/10 rounded-full filter blur-3xl"
        initial={{ x: '20rem', y: '20rem' }} // Start position
        animate={{ 
          x: ['20rem', '10rem', '20rem'],
          y: ['20rem', '10rem', '20rem'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 20, // Different duration for variety
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5, // Start at a different time
        }}
      />
       {/* Bubble 3 */}
      <motion.div 
        className="absolute w-80 h-80 bg-indigo-700/5 rounded-full filter blur-3xl"
        initial={{ x: '10rem', y: '5rem' }} // Start position
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
