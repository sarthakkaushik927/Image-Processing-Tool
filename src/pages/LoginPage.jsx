import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import AuthPageWrapper from '../components/AuthPageWrapper';


export default function LoginPage({ setPage, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
   
    onLogin(email, password).finally(() => setIsLoading(false));
  };

  return (
    <AuthPageWrapper>
      <h2 className="text-3xl font-bold text-white mb-2">Hello Welcome</h2>
      <p className="text-white/70 mb-8">Login</p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthInput 
          type="email" 
          placeholder="Email or Phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput 
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          suffix={
            <button type="button" onClick={() => setShowPass(!showPass)} className="focus:outline-none text-white/50">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />
        
        <div className="text-right">
          <button 
            type="button" 
            onClick={() => setPage('forgotPassword')}
            className="text-sm text-white/80 hover:text-white focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>
        
        <AuthButton text="Sign In" isLoading={isLoading} isGradient={true} />
        
        <p className="text-center text-sm text-white/70">
          Don't have an account?{' '}
          <button 
            disabled={isLoading}
            type="button" 
            onClick={() => setPage('signup')}
            className="font-bold text-white hover:underline focus:outline-none"
          >
            Sign up
          </button>
        </p>
      </form>
    </AuthPageWrapper>
  );
}