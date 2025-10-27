import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Download, 
  UserCircle, 
  Search,
  LogOut
} from 'lucide-react';
// Import .jsx ke bina
import NavItem from '../components/NavItem.jsx'; // .jsx extension add kar diya hai

// =======================================================================
//  6. Home Page Component
// =======================================================================
export default function HomePage({ onLogout }) {
  return (
    // Updated background to match Figma
    <motion.div 
      className="flex min-h-screen bg-linear-to-b from-[#2a2a4a] to-[#1a1a3a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* --- Sidebar / Navigation --- */}
      {/* Sidebar color matched to figma */}
      <nav className="w-64 bg-[#1f1f3d] p-6 flex-col hidden md:flex"> {/* Hidden on mobile */}
        <h1 className="text-2xl font-bold mb-10 text-white">Team Task CCC</h1>
        <ul className="space-y-4 flex-1">
          <NavItem icon={<Home />} text="Home" active />
          <NavItem icon={<Download />} text="Downloads" />
          <NavItem icon={<UserCircle />} text="Account" />
        </ul>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-full max-w-xs">
            <input 
              type="text" 
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2a2a4a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <div className="flex items-center gap-4">
            <img 
              src="https://placehold.co/40x40/7c3aed/ffffff?text=U" 
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
          </div>
        </header>

        {/* --- Content Area --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold">Edit, Enhance and Empower!</h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Experience seamless image processing
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg transition-transform transform hover:scale-105">
                Discover
              </button>
              <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold shadow-lg transition-transform transform hover:scale-105">
                Create
              </button>
            </div>
            <div className="mt-12 space-y-4">
              <button className="text-gray-400 hover:text-white font-medium">Dobby</button><br/>
              <button className="text-gray-400 hover:text-white font-medium">About</button><br/>
              <button className="text-gray-400 hover:text-white font-medium">Help</button>
            </div>
          </div>
          
          {/* Right Column (Image) */}
          <div className="flex-1">
            {/* Image matched from figma */}
            <div className="w-full h-96 bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://i.imgur.com/g0t6f8g.jpeg" // Placeholder resembling the stormy village
                alt="Stormy village"
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = 'https://placehold.co/600x400/1f2937/9ca3af?text=Image+Not+Found'}
              />
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
