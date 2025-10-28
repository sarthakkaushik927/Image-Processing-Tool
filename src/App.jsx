import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, User, Eye, EyeOff, CheckCircle, ArrowRight, Home,
  Download, UserCircle, Search, ArrowLeft, Settings, HelpCircle, LogOut,
  Image as ImageIcon, Loader2
} from 'lucide-react';


import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import VerifyCodePage from './pages/VerifyCodePage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import PasswordChangedPage from './pages/PasswordChangedPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AccountPage from './pages/AccountPage.jsx';

import AuthCard from './components/AuthCard.jsx';


const API_BASE_URL = 'https://user-registeration-and-user-login-1-vpa5.onrender.com';



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState('login'); // 'login', 'signup', 'forgotPassword', 'verifyCode', 'resetPassword', 'passwordChanged'



  const handleLogin = async (email, password) => {
    console.log("Attempting login with:", { email, password });
    /* 
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      console.log("Login success:", response.data);
      // TODO: Save token securely
      setIsAuthenticated(true); // Login successful, show HomePage
      setPage(null); 
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Login failed.");
      throw error; // Let component know about failure
    }
    */

    return new Promise(resolve => setTimeout(() => {
        setIsAuthenticated(true);
        setPage(null); 
        resolve();
     }, 500));
  };

  const handleSignup = async (username, email, password) => {
    console.log("Attempting signup with:", { username, email, password });
    /* 
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { username, email, password });
      console.log("Signup success:", response.data);
      alert("Signup successful! Please log in.");
      setPage('login'); // Signup ke baad login page par bhejein
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Signup failed.");
      throw error; // Let component know about failure
    }
    */

     return new Promise(resolve => setTimeout(() => {
        setPage('login');
        resolve();
     }, 500));
  };

  const handleForgotPassword = async (email) => {
    console.log("Sending password reset code to:", email);
    /* 
    try {
      await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      setPage('verifyCode');
    } catch (error) { console.error("Forgot password error:", error.response ? error.response.data : error.message); alert(error.response?.data?.message || "Failed"); throw error; }
    */
    
    return new Promise(resolve => setTimeout(() => { setPage('verifyCode'); resolve(); }, 500));
  };

  const handleVerifyCode = async (code) => {
    console.log("Verifying code:", code);
    /* 
    try {
      await axios.post(`${API_BASE_URL}/api/auth/verify-code`, { code });
      setPage('resetPassword');
    } catch (error) { console.error("Code verification error:", error.response ? error.response.data : error.message); alert(error.response?.data?.message || "Invalid code"); throw error; }
    */
    
    return new Promise(resolve => setTimeout(() => { setPage('resetPassword'); resolve(); }, 500));
  };

  const handleResetPassword = async (newPassword) => {
    console.log("Attempting to reset password with:", newPassword);
    /* 
    try {
      await axios.post(`${API_BASE_URL}/api/auth/reset-password`, { password: newPassword });
      setPage('passwordChanged');
    } catch (error) { console.error("Password reset error:", error.response ? error.response.data : error.message); alert(error.response?.data?.message || "Failed"); throw error; }
    */
    
    return new Promise(resolve => setTimeout(() => { setPage('passwordChanged'); resolve(); }, 500));
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
            className="min-h-screen flex items-center justify-center bg-black" 
          >
            <AuthCard>
              <AnimatePresence mode="wait">
                {page === 'login' && (
                  <LoginPage
                    key="login"
                    setPage={setPage}
                    onLogin={handleLogin}
                  />
                )}
                {page === 'signup' && (
                  <SignupPage
                    key="signup"
                    setPage={setPage}
                    onSignup={handleSignup} 
                  />
                )}
                {page === 'forgotPassword' && (
                  <ForgotPasswordPage
                    key="forgot"
                    setPage={setPage}
                    onForgot={handleForgotPassword}
                  />
                )}
                {page === 'verifyCode' && (
                  <VerifyCodePage
                    key="verify"
                    setPage={setPage}
                    onVerify={handleVerifyCode}
                  />
                )}
                {page === 'resetPassword' && (
                  <ResetPasswordPage
                    key="reset"
                    setPage={setPage}
                    onResetPassword={handleResetPassword}
                  />
                )}
                {page === 'passwordChanged' && (
                  <PasswordChangedPage
                    key="changed"
                    setPage={setPage}
                  />
                )}
              </AnimatePresence>
            </AuthCard>
          </motion.div>
        ) : (
          
          <HomePage
            key="home"
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            setPage={setPage} 
            page={page}      
          />
        )}
      </AnimatePresence>
    </div>
  );
}

