import React, { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { ChevronRight, LogOut } from 'lucide-react'; 


function LogoutConfirmationModal({ onLogout, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-[#1f1f3d]/80 border border-gray-700 rounded-2xl p-8 shadow-xl w-full max-w-xs"
      >
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg"
          >
            Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}


export default function AccountPage({ onLogout }) {
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const userData = {
    name: "Keshav Kumar",
    phone: "9528316559",
    email: "Keshav18@gmail.com",
    backupEmail: "krishna18@gmail.com",
  
    password: "••••••••",
    securityKey: "2678 8746 3827",
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); 
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout(); 
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); 
  };

  return (
    <>
      <motion.div
        key="account-page" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6 md:p-10 text-white min-h-screen pt-24" // Added padding top
      >
        {/* Header section like in screenshot */}
        <div className="flex items-center mb-8">
          <ChevronRight size={28} className="text-gray-400 -ml-2" /> {/* Or a back button */}
          <h1 className="text-3xl font-bold ml-2">Setting</h1>
        </div>

        <h2 className="text-4xl font-bold text-center mb-10">Account Settings</h2>

        {/* Main content card */}
        <div className="bg-[#1f1f3d]/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Left Column */}
            <div>
              <InfoField label="Name" value={userData.name} />
              <InfoField label="Email" value={userData.email} />
              <InfoField label="Password" value={userData.password} isPassword />
            </div>
            {/* Right Column */}
            <div>
              <InfoField label="Phone Number" value={userData.phone} />
              <InfoField label="Backup Email" value={userData.email} />
              <InfoField label="Security Key" value={userData.securityKey} />
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoutClick} 
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg"
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Render Logout Confirmation Modal conditionally */}
      <AnimatePresence>
        {showLogoutModal && (
          <LogoutConfirmationModal
            onLogout={confirmLogout}
            onCancel={cancelLogout}
          />
        )}
      </AnimatePresence>
    </>
  );
}


function InfoField({ label, value, isPassword = false }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 p-3 rounded-lg text-white font-medium shadow-inner">
        {/* If password, show dots, else show value */}
        {isPassword ? '••••••••' : value}
      </div>
    </div>
  );
}

