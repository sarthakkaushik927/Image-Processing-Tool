import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

import AuthButton from '../components/AuthButton';
import AuthPageWrapper from '../components/AuthPageWrapper';


export default function PasswordChangedPage({ setPage }) {
  return (
    <AuthPageWrapper>
      <div className="flex flex-col items-center text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { type: 'spring', delay: 0.2 } }}
          className="p-4 bg-green-500 rounded-full"
        >
          <CheckCircle size={60} className="text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mt-6">Password Changed!</h2>
        <p className="text-white/70 mt-2 mb-8">
          Your password has been changed successfully.
        </p>
        
        <AuthButton 
          text="Get Started" 
          onClick={() => setPage('login')}
          iconAfter={<ArrowRight size={18} />}
          isGradient={true}
        />
      </div>
    </AuthPageWrapper>
  );
}


