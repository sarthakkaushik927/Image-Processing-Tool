import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
// Imports mein .jsx extension wapas add kar diya hai
import AuthInput from '../components/AuthInput.jsx';
import AuthButton from '../components/AuthButton.jsx';
import AuthPageWrapper from '../components/AuthPageWrapper.jsx';

// =======================================================================
//  4. Verify Code Page
// =======================================================================
export default function VerifyCodePage({ setPage, onVerify }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onVerify(code).finally(() => setIsLoading(false));
  };

  return (
    <AuthPageWrapper>
      <button 
        onClick={() => setPage('forgotPassword')} 
        className="flex items-center gap-2 text-white/70 hover:text-white mb-4 focus:outline-none"
      >
        <ArrowLeft size={18} /> Back
      </button>
      <h2 className="text-3xl font-bold text-white">Verify Code</h2>
      <p className="text-white/70 mt-2 mb-8">
        Please enter the verification code sent to your email.
      </p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthInput 
          type="text" 
          placeholder="Enter Code" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <AuthButton text="Verify Code" isLoading={isLoading} isGradient={true} />
        <p className="text-center text-sm text-white/70">
          Don't received code?{' '}
          <button 
            type="button" 
            className="font-bold text-white hover:underline focus:outline-none"
          >
            Resend
          </button>
        </p>
      </form>
    </AuthPageWrapper>
  );
}
