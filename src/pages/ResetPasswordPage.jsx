import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft } from 'lucide-react';
import AuthInput from '../components/AuthInput.jsx';
import AuthButton from '../components/AuthButton.jsx';
import AuthPageWrapper from '../components/AuthPageWrapper.jsx';


export default function ResetPasswordPage({ setPage, onResetPassword }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
   
    onResetPassword(password).finally(() => setIsLoading(false));
  };

  return (
    <AuthPageWrapper>
      <button 
        onClick={() => setPage('login')} // Go back to login
        className="flex items-center gap-2 text-white/70 hover:text-white mb-4 focus:outline-none"
      >
        <ArrowLeft size={18} /> Back to Login
      </button>
      <h2 className="text-3xl font-bold text-white">Set New Password</h2>
      <p className="text-white/70 mt-2 mb-8">
        Please enter your new password below.
      </p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthInput 
          type="password" 
          placeholder="New Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput 
          type="password" 
          placeholder="Confirm New Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <AuthButton text="Reset Password" isLoading={isLoading} isGradient={true} />
      </form>
    </AuthPageWrapper>
  );
}