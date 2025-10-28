import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  LogOut,
  ArrowLeft,
  Rocket,      
  Wrench,      
  FileText,    
  Settings,   
  LifeBuoy,   
  Star,        
  Home,        
  Download,    
  UserCircle,  
  UploadCloud, 
  Edit,
  PlusCircle,
  BookOpen
} from 'lucide-react';

export default function HomePage({ onLogout }) {

  const [showHelp, setShowHelp] = useState(false);

  return (
    <motion.div 
      className="flex min-h-screen bg-linear-to-b from-[#1c1c3a] to-[#12122c] text-white relative" // Added relative
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      
      <BubblesBackground />
      
     
      <main className="flex-1 p-6 md:p-10 relative z-10 w-full">
        
       
        <HeaderNav onLogout={onLogout} />
        
        
        <div className="mt-10 md:mt-20">
          <AnimatePresence mode="wait">
            {!showHelp ? (
              <MainView key="main" setShowHelp={setShowHelp} />
            ) : (
              <HelpView key="help" setShowHelp={setShowHelp} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}


function HeaderNav({ onLogout }) {
  return (
    <nav className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2 md:gap-10">
        <h1 className="text-2xl font-bold text-white">FotoFix</h1>
        
        <div className="hidden md:flex items-center gap-6">
          <NavItem icon={<Home />} text="Home" active />
          <NavItem icon={<Download />} text="Downloads" />
          <NavItem icon={<UserCircle />} text="Account" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-xs hidden md:block">
          <input 
            type="text" 
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#2a2a4a]/70 backdrop-blur-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <img 
          src="https://placehold.co/40x40/7c3aed/ffffff?text=U" 
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />
        
        <button onClick={onLogout} className="p-2 hover:bg-red-500/50 rounded-full hidden md:block">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}


function MainView({ setShowHelp }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex flex-col lg:flex-row items-center gap-10 md:gap-20"
    >
      {/* Left Column (Text & Buttons) */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-4xl md:text-5xl font-bold">Edit, Enhance and Empower!</h2>
        <p className="text-lg text-gray-400 mt-4 mb-8">
          Experience seamless image processing
        </p>
        
        
        <div className="flex flex-col items-center lg:items-center gap-4">
          {/* First row: Discover & Create */}
          <div className="flex items-center gap-4">
            <GradientButton className='lg:px-20' text="Discover" isBlue />
            <GradientButton className='lg:px-20' text="Create" isOutline />
          </div>
         
          <GradientButton 
            text="GenerateImage"
            className="lg:px-40 px-40 max-w-40 lg:min-w-60 justfy-center items-center text-center flex flex-col" 
          />
        </div>
        
        <div className="mt-12 flex justify-center iten lg:justify-center gap-4 items-center">
          
          <SmallButton className="h-16">
            <span className="font-semibold px-6">About</span>
          </SmallButton>
          
          
          <SmallButton className="w-16 h-16">
            
            <img className='h-12 w-12' src="/chatbot.png" alt="Dobby" 
              onError={(e) => e.target.style.display='none'} // Hide if image breaks
            />
          </SmallButton>

         
          <SmallButton className="h-16" onClick={() => setShowHelp(true)}>
            <span className="font-semibold px-6">Help?</span>
          </SmallButton>
        </div>
      </div> 
      
      {/* Right Column (Image) */}
      <div className="flex-1 w-full max-w-lg lg:max-w-none">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="w-full h-[450px] bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-400/30"
        >
          <img 
            src="/home.png"
            alt="Forest and clouds"
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = 'https://placehold.co/600x400/1f2937/9ca3af?text=Image+Not+Found'}
          />
        </motion.div>
      </div>
    </motion.div> 
  );
}


function HelpView({ setShowHelp }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <button 
        onClick={() => setShowHelp(false)} // <-- Wapas Main View par jaane ke liye
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h2 className="text-3xl md:text-4xl font-bold text-center">Hello, How Can We Help YOU</h2>
      
      {/* --- Large Search Bar --- */}
      <div className="relative w-full max-w-2xl mx-auto my-8">
        <input 
          type="text" 
          placeholder="Search your keyword here..."
          className="w-full pl-12 pr-16 py-4 rounded-full bg-[#2a2a4a]/70 backdrop-blur-sm border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg"
        />
        <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-full">
          <Search size={20} className="text-white" />
        </button>
      </div>

      {/* --- Getting Started Cards --- */}
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HelpCard 
            icon={<Rocket size={32} className="text-blue-400" />}
            title="Getting Started"
            text="Helps you to know how to start your editing journey"
          />
          <HelpCard 
            icon={<Wrench size={32} className="text-purple-400" />}
            title="Dobby"
            text="Helps you to know how to start your editing journey"
          />
          <HelpCard 
            icon={<FileText size={32} className="text-green-400" />}
            title="Key Concepts"
            text="This helps you to enhance your editing skills"
          />
        </div>
      </div>
    </motion.div>
  );
}



function NavItem({ icon, text, active = false }) {
  return (
    <a 
      href="#"
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-white/70 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </a>
  );
}


function BubblesBackground() {
  const bubbles = [
    { id: 1, x: '10%', y: '20%', size: 300, delay: 0, duration: 15 },
    { id: 2, x: '80%', y: '30%', size: 200, delay: 2, duration: 20 },
    { id: 3, x: '60%', y: '70%', size: 250, delay: 4, duration: 18 },
    { id: 4, x: '20%', y: '80%', size: 150, delay: 6, duration: 22 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bg-linear-to-br from-blue-700 to-purple-700 opacity-10 rounded-full filter blur-3xl"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.y,
            left: bubble.x,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: bubble.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
}


function GradientButton({ text, isBlue = false, isOutline = false, className = "" }) { // <-- className prop add kiya
  const blueGradient = "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500";
  const purpleGradient = "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700";
  const outline = "bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-900/50";

  const buttonClasses = isOutline ? outline : (isBlue ? blueGradient : purpleGradient);


  const defaultClasses = "w-full md:w-auto px-8 py-3 rounded-full font-semibold shadow-lg transition-all transform";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
   
      className={`${defaultClasses} ${buttonClasses} ${className}`}
    >
      {text}
    </motion.button>
  );
}



function SmallButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      // Wrapper div jo gradient border banata hai
      className={`p-0.5 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 relative overflow-hidden transition-all ${className}`}
    >
      {/* Inner div jo button ka background color hai */}
      <div className="bg-[#1c1c3a] h-full w-full rounded-[14px] flex items-center justify-center">
        {children}
      </div>
    </motion.button>
  );
}



function HelpCard({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -5, borderColor: 'rgb(59 130 246)' }} // Equivalent to hover:border-blue-500
      className="bg-[#2a2a4a]/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl p-6 transition-all hover:shadow-xl"
    >
      <div className="mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-400">{text}</p>
    </motion.div>
  );
}
