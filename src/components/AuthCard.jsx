import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthIllustration from './AuthIllustration.jsx'; // Corrected import

/**
 * UPDATED: AuthCard
 * This component provides the two-column layout (form + illustration)
 * and the purple gradient background for all auth screens.
 */
export default function AuthCard({ children }) {
  return (
    <motion.div
      key="auth-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="w-full min-h-screen bg-black flex flex-col md:flex-row"
    >
      {/* Left Side (Form Content) */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-black flex flex-col justify-center items-center min-h-screen">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </div>
      
      {/* Right Side (Illustration) */}
      <AuthIllustration />
    </motion.div>
  );
}


