import React, { useState } from 'react';
// Import axios
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
  Loader2 // Added for loading state
} from 'lucide-react';

// === Import Pages ===
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import VerifyCodePage from './pages/VerifyCodePage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'; // <-- NEW PAGE IMPORTED
import PasswordChangedPage from './pages/PasswordChangedPage.jsx';
import HomePage from './pages/HomePage.jsx';

// === Import Components ===
import AuthCard from './components/AuthCard.jsx';


// =======================================================================
//  API Configuration
// =======================================================================
// TODO: Add your API base URL here
const API_BASE_URL = 'http://localhost:3000/api/auth';


// =======================================================================
//  Main App Component (Controls Page Navigation)
// =======================================================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Updated page list to include 'resetPassword'
  const [page, setPage] = useState('login'); // 'login', 'signup', 'forgotPassword', 'verifyCode', 'resetPassword', 'passwordChanged'

  // --- API Handlers (with commented-out axios) ---

  const handleLogin = async (email, password) => {
    console.log("Attempting login with:", { email, password });
    
    // --- AXIOS API CALL ---
    /*
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      console.log("Login success:", response.data);
      // const token = response.data.token; 
      // TODO: Save the token
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert(error.response.data.message || "Login failed");
    }
    */

    // Simulate a successful login
    return new Promise(resolve => setTimeout(() => {
      setIsAuthenticated(true);
      resolve();
    }, 1000));
  };

  const handleSignup = async (email, password) => {
    console.log("Attempting signup with:", { email, password });
    
    // --- AXIOS API CALL ---
    /*
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
      console.log("Signup success:", response.data);
      setPage('login'); // Go to login after successful signup
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
      alert(error.response.data.message || "Signup failed");
    }
    */
   
    // Simulate a successful signup
    return new Promise(resolve => setTimeout(() => {
      setPage('login');
      resolve();
    }, 1000));
  };

  const handleForgotPassword = async (email) => {
    console.log("Sending password reset code to:", email);
    
    // --- AXIOS API CALL ---
    /*
    try {
      await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      setPage('verifyCode'); // Go to verify code page
    } catch (error) {
      console.error("Forgot password error:", error.response ? error.response.data : error.message);
      alert(error.response.data.message || "Failed to send reset code");
    }
    */
    
    // Simulate success
    return new Promise(resolve => setTimeout(() => {
      setPage('verifyCode');
      resolve();
    }, 1000));
  };
  
  const handleVerifyCode = async (code) => {
    console.log("Verifying code:", code);
    
    // --- AXIOS API CALL ---
    /*
    try {
      await axios.post(`${API_BASE_URL}/verify-code`, { code });
      // On success, go to RESET password page
      setPage('resetPassword'); 
    } catch (error) {
      console.error("Code verification error:", error.response ? error.response.data : error.message);
      alert(error.response.data.message || "Invalid code");
    }
    */
    
    // Simulate success - UPDATED to go to 'resetPassword'
    return new Promise(resolve => setTimeout(() => {
      setPage('resetPassword');
      resolve();
    }, 1000));
  };

  // --- NEW HANDLER for ResetPasswordPage ---
  const handleResetPassword = async (newPassword) => {
    // UPDATED to use newPassword variable and fix linting error
    console.log("Attempting to reset password with:", newPassword);

    // --- AXIOS API CALL ---
    /*
    try {
      // You might need to send a token or email that you stored from the verify step
      await axios.post(`${API_BASE_URL}/reset-password`, { 
        password: newPassword 
      });
      // On success, go to password changed success page
      setPage('passwordChanged');
    } catch (error) {
      console.error("Password reset error:", error.response ? error.response.data : error.message);
      alert(error.response.data.message || "Failed to reset password");
    }
    */

    // Simulate success
    return new Promise(resolve => setTimeout(() => {
      setPage('passwordChanged');
      resolve();
    }, 1000));
  };
  
  const handleLogout = () => {
    // TODO: Clear saved token from localStorage/context
    setIsAuthenticated(false);
    setPage('login');
  };

  // --- Render Logic ---

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          // === AUTH FLOW ===
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
                {/* --- NEW PAGE ADDED TO RENDER --- */}
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
          // === HOME PAGE (Authenticated) ===
          <HomePage key="home" onLogout={handleLogout} />
        )}
      </AnimatePresence>
    </div>
  );
}
