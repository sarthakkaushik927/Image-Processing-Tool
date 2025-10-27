import React, { useState } from 'react';
// Imports mein .jsx extension add kiya hai
import AuthInput from '../components/AuthInput.jsx';
import AuthButton from '../components/AuthButton.jsx';
import AuthPageWrapper from '../components/AuthPageWrapper.jsx';

// =======================================================================
//  2. Signup Page Component
// =======================================================================
export default function SignupPage({ setPage, onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords don't match!");
      return;
    }
    if (!terms) {
      alert("You must agree to the terms and conditions!");
      return;
    }
    setIsLoading(true);
    // Call the API handler from App.jsx
    onSignup(email, password).finally(() => setIsLoading(false));
  };

  return (
    <AuthPageWrapper>
      <h2 className="text-3xl font-bold text-white">Create an account</h2>
      
      <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
        <AuthButton 
          text="Sign in with Google" 
          icon={
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google" 
              className="w-5 h-5" 
            />
          }
          isSecondary={true}
        />

        <div className="flex items-center space-x-2">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <AuthInput 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput 
          type="password" 
          placeholder="Enter Your Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput 
          type="password" 
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="terms" 
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="w-4 h-4 rounded bg-gray-800 border-gray-700 focus:ring-purple-500 text-purple-600"
          />
          <label htmlFor="terms" className="text-sm text-white/70">
            I agree with the <a href="#" className="font-bold text-white hover:underline">Terms & Conditions</a>
          </label>
        </div>
        
        <AuthButton text="Continue" isLoading={isLoading} isGradient={true} />
        
        <p className="text-center text-sm text-white/70">
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={() => setPage('login')}
            className="font-bold text-white hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </form>
    </AuthPageWrapper>
  );
}
