import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
// Imports se .jsx extension hata diya hai
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import AuthPageWrapper from '../components/AuthPageWrapper';

// =======================================================================
//  3. Forgot Password Page
// =======================================================================
export default function ForgotPasswordPage({ setPage, onForgot }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onForgot(email).finally(() => setIsLoading(false));
  };
  
  return (
    <AuthPageWrapper>
      <button 
        onClick={() => setPage('login')} 
        className="flex items-center gap-2 text-white/70 hover:text-white mb-4 focus:outline-none"
      >
        <ArrowLeft size={18} /> Back to Login
      </button>
      <h2 className="text-3xl font-bold text-white">Forgot Password?</h2>
      <p className="text-white/70 mt-2 mb-8">
        No worries, it happens! Just enter the email address associated with your account.
      </p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthInput 
          type="email" 
          placeholder="Enter your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthButton text="Send Code" isLoading={isLoading} isGradient={true} />
      </form>
    </AuthPageWrapper>
  );
}

