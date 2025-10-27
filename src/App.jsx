import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowRight, 
  Home, 
  Download, 
  UserCircle, 
  Search,
  ArrowLeft,
  Settings,
  HelpCircle,
  LogOut,
  Image as ImageIcon,
  Loader2 
} from 'lucide-react';


import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import VerifyCodePage from './pages/VerifyCodePage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'; 
import PasswordChangedPage from './pages/PasswordChangedPage.jsx';
import HomePage from './pages/HomePage.jsx';


import AuthCard from './components/AuthCard.jsx';

const API_BASE_URL = 'http://localhost:3000/api/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState('login'); 

  const handleLogin = async (email, password) => {
    console.log("Attempting login with:", { email, password });
    
    /* // --- AXIOS API CALL ---
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      console.log("Login success:", response.data);
      // const token = response.data.token; 
      // TODO: Save token
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Login failed");
    }
    */

    return new Promise(resolve => setTimeout(() => {
      setIsAuthenticated(true);
      resolve();
    }, 1000));
  };

  const handleSignup = async (email, password) => {
    console.log("Attempting signup with:", { email, password });
    
    /* // --- AXIOS API CALL ---
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
      console.log("Signup success:", response.data);
      setPage('login'); 
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
    */
   
    return new Promise(resolve => setTimeout(() => {
      setPage('login');
      resolve();
    }, 1000));
  };

  const handleForgotPassword = async (email) => {
    console.log("Sending password reset code to:", email);
    
    /* // --- AXIOS API CALL ---
    try {
      await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      setPage('verifyCode'); 
    } catch (error) {
      console.error("Forgot password error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Failed to send reset code");
    }
    */ 
 
    return new Promise(resolve => setTimeout(() => {
      setPage('verifyCode');
      resolve();
    }, 1000));
  };
  
  const handleVerifyCode = async (code) => {
    console.log("Verifying code:", code);
    
    /* // --- AXIOS API CALL ---
    try {
      await axios.post(`${API_BASE_URL}/verify-code`, { code });
      setPage('resetPassword'); 
    } catch (error) {
      console.error("Code verification error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Invalid code");
    }
    */ 
    
    return new Promise(resolve => setTimeout(() => { 
      setPage('resetPassword');
      resolve();
    }, 1000));
  };

  const handleResetPassword = async (newPassword) => {
    console.log("Attempting to reset password with:", newPassword);

    /* // --- AXIOS API CALL ---
    try {
      await axios.post(`${API_BASE_URL}/reset-password`, { 
        password: newPassword 
      });
      setPage('passwordChanged');
    } catch (error) {
      console.error("Password reset error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Failed to reset password");
    }
    */ 

    return new Promise(resolve => setTimeout(() => {
      setPage('passwordChanged');
      resolve();
    }, 1000));
  };
  
  const handleLogout = () => {
    console.log("Logging out...");
    setIsAuthenticated(false);
    setPage('login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div 
            key="auth-flow" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <AuthCard>
              <AnimatePresence mode="wait">
                {page === 'login' && (
                  <LoginPage key="login" setPage={setPage} onLogin={handleLogin} />
                )}
                {page === 'signup' && (
                  <SignupPage 
                    key="signup" 
                    setPage={setPage} 
                    onSignup={(email, password) => handleSignup(email, password)} 
                  />
                )}
                {page === 'forgotPassword' && (
                  <ForgotPasswordPage key="forgot" setPage={setPage} onForgot={handleForgotPassword} />
                )}
                {page === 'verifyCode' && (
                  <VerifyCodePage key="verify" setPage={setPage} onVerify={handleVerifyCode} />
                )}
                {page === 'resetPassword' && (
                  <ResetPasswordPage 
                    key="reset" 
                    setPage={setPage} 
                    onResetPassword={handleResetPassword} 
                  />
                )}
                {page === 'passwordChanged' && (
                  <PasswordChangedPage key="changed" setPage={setPage} />
                )}
              </AnimatePresence>
            </AuthCard>
          </motion.div>
        ) : (
          <HomePage key="home" onLogout={handleLogout} />
        )}
      </AnimatePresence>
    </div>
  );
}
