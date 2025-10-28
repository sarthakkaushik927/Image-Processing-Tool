import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
import {
  Search, LogOut, ArrowLeft, Rocket, Wrench, FileText, Settings,
  LifeBuoy, Star, Home, Download, UserCircle, UploadCloud, Edit,
  PlusCircle, BookOpen, Menu, X, LogIn, UserPlus, 
  ChevronRight 
} from 'lucide-react';


export default function HomePage({ isAuthenticated, onLogout, setPage, page }) { 
  
  const [showHelp, setShowHelp] = useState(false); 

  const showAccountView = isAuthenticated && page === 'account';
  const showHelpView = showHelp; 
  const showDownloadsView = page === 'downloads';
  const showSearchView = page === 'search';
 
  useEffect(() => {
      
     
      if (page === null || page === 'account' || page === 'downloads' || page === 'search') {
          
          setShowHelp(false);
      }
     
  }, [page]); 


  return (
    <motion.div
      className="flex min-h-screen bg-gradient-to-b from-[#1c1c3a] to-[#121c3a] text-white relative" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BubblesBackground />
      <main className="flex-1 p-6 md:p-10 relative z-10 w-full">
        {/* HeaderNav props */}
        <HeaderNav
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          setPage={setPage} 
          page={page} 
          
        />

        <div className="mt-10 md:mt-20"> 
          <AnimatePresence mode="wait">
           
            {isAuthenticated && page === 'account' ? (
              <AccountView key="account" onLogout={onLogout} setPage={setPage} />
            ) : page === 'downloads' ? (
              <DownloadsView key="downloads" setPage={setPage} />
            ) : page === 'search' ? (
              <SearchView key="search" setPage={setPage} />
            ) : showHelp ? ( 
              <HelpView key="help" setShowHelp={setShowHelp} /> 
            ) : (
              <MainView key="main" setShowHelp={setShowHelp} /> 
            )}
            
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}


function HeaderNav({ isAuthenticated, onLogout, setPage, page }) {
 
  console.log("HeaderNav received props - isAuthenticated:", isAuthenticated, "setPage type:", typeof setPage, "page:", page);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  
  const handleNavClick = (pageNameOrPath) => {
     
    console.log("handleNavClick called with:", pageNameOrPath, "setPage type:", typeof setPage);
    
    if (typeof setPage === 'function') {
        setPage(pageNameOrPath); 
    } else {
        console.error("setPage prop is not a function inside handleNavClick!");
    }
    setIsOpen(false);
  }

  
   const commonNavLinks = (
    <>
      <NavItem icon={<Home />} text="Home" active={page === null} onClick={() => handleNavClick(null)} />
      <NavItem icon={<Download />} text="Downloads" active={page === 'downloads'} onClick={() => handleNavClick('downloads')} />
      <NavItem icon={<UserCircle />} text="Account" active={page === 'account'} onClick={() => handleNavClick('account')} />
      <NavItem icon={<Search />} text="Search" active={page === 'search'} onClick={() => handleNavClick('search')} />
       
    </>
  );

  return (
    <nav className="w-full flex justify-between items-center relative z-20">
      <div className="flex items-center gap-2 md:gap-4">
        <img src="logo.svg" alt="FotoFix Logo" className="h-8 w-auto"  />
       
        <span onClick={() => handleNavClick(null)} className="translate-y-1 text-2xl font-bold text-white cursor-pointer">FotoFix</span>
        <div className="hidden md:flex items-center gap-6 ml-4">
           {commonNavLinks}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <img src="https://placehold.co/40x40/7c3aed/ffffff?text=U" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-blue-500"/>
            <button onClick={onLogout} className="p-2 hover:bg-red-500/50 rounded-full hidden md:block" aria-label="Logout"> <LogOut size={20} /> </button>
            <button onClick={toggleMenu} className="p-2 md:hidden focus:outline-none" aria-label="Toggle menu"> {isOpen ? <X size={24} /> : <Menu size={24} />} </button>
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-4">
                
                <button onClick={() => typeof setPage === 'function' ? setPage('login') : console.error("setPage not available for Login button")} className="px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors"> Login </button>
                <button onClick={() => typeof setPage === 'function' ? setPage('signup') : console.error("setPage not available for Signup button")} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"> Sign Up </button>
            </div>
            <button onClick={toggleMenu} className="p-2 md:hidden focus:outline-none" aria-label="Toggle menu"> {isOpen ? <X size={24} /> : <Menu size={24} />} </button>
          </>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mt-2 md:hidden bg-[#1c1c3a]/95 backdrop-blur-md shadow-lg p-4 z-40 overflow-hidden" >
            <ul className="flex flex-col space-y-3">
              {commonNavLinks} <hr className="border-gray-700 my-2" />
              {isAuthenticated ? (
                <li> <button onClick={() => { onLogout(); setIsOpen(false); }} className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300"> <LogOut size={20} /> <span className="font-medium">Logout</span> </button> </li>
              ) : ( <>
                   
                   <li onClick={() => handleNavClick('login')}> <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-gray-700/50 hover:text-white cursor-pointer"> <LogIn size={20} /> <span className="font-medium">Login</span> </div> </li>
                   <li onClick={() => handleNavClick('signup')}> <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-gray-700/50 hover:text-white cursor-pointer"> <UserPlus size={20} /> <span className="font-medium">Sign Up</span> </div> </li>
                 </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


function MainView({ setShowHelp }) {
  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex flex-col lg:flex-row items-center gap-10 md:gap-20" >
      <div className="flex-1 text-center lg:text-center">
        <h2 className="text-4xl md:text-5xl font-bold">Edit, Enhance and Empower!</h2>
        <p className="text-lg text-gray-400 mt-4 mb-8"> Experience seamless image processing </p>
        <div className="flex flex-col items-center lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <GradientButton className='lg:px-20' text="Discover" isBlue />
            <GradientButton className='lg:px-20' text="Create" isOutline />
          </div>
          <GradientButton text="GenerateImage" className="lg:px-57 px-33 max-w-40 lg:min-w-60 justfy-center items-center text-center flex flex-col"/>
        </div>
        <div className="mt-12 flex justify-center iten lg:justify-center gap-4 items-center">
          <SmallButton className="h-16"> <span className="font-semibold px-6">About</span> </SmallButton>
          <SmallButton className="w-16 h-16"> <img className='h-12 w-12' src="/chatbot.png" alt="Dobby" onError={(e) => e.target.style.display='none'} /> </SmallButton>
          <SmallButton className="h-16" onClick={() => setShowHelp(true)}> <span className="font-semibold px-6">Help?</span> </SmallButton>
        </div>
      </div>
      <div className="flex-1 w-full max-w-lg lg:max-w-none">
        <motion.div whileHover={{ scale: 1.03 }} className="w-full h-[450px] bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-400/30">
          <img src="/home.svg" alt="Forest and clouds" className="w-full h-full object-cover object-" onError={(e) => e.target.src = 'https://placehold.co/600x400/1f2937/9ca3af?text=Image+Not+Found'}/>
        </motion.div>
      </div>
    </motion.div>
  );
}



function HelpView({ setShowHelp }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} >
      <button onClick={() => setShowHelp(false)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"> <ArrowLeft size={18} /> Back </button>
      <h2 className="text-3xl md:text-4xl font-bold text-center">Hello, How Can We Help YOU</h2>
      <div className="relative w-full max-w-2xl mx-auto my-8">
        <input type="text" placeholder="Search your keyword here..." className="w-full pl-12 pr-16 py-4 rounded-full bg-[#2a2a4a]/70 backdrop-blur-sm border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg"/>
        <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"> <Search size={20} className="text-white" /> </button>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HelpCard icon={<Rocket size={32} className="text-blue-400" />} title="Getting Started" text="Helps you to know how to start your editing journey"/>
          <HelpCard icon={<Wrench size={32} className="text-purple-400" />} title="Dobby" text="Helps you to know how to start your editing journey"/>
          <HelpCard icon={<FileText size={32} className="text-green-400" />} title="Key Concepts" text="This helps you to enhance your editing skills"/>
        </div>
      </div>
    </motion.div>
  );
}


function AccountView({ onLogout, setPage }) {
  const userData = {
    name: "Keshav Kumar", phone: "9528316559", email: "Keshav18@gmail.com",
    backupEmail: "krishna18@gmail.com", password: "••••••••", securityKey: "2678 8746 3827",
  };

  return (
    <motion.div key="account-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
      className="p-0 md:p-0 text-white"
    >
      {/* Back button */}
       <button onClick={() => setPage(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
            <ArrowLeft size={18} /> Back to Home
        </button>

      {/* Header */}
      <div className="flex items-center mb-8">
        <ChevronRight size={28} className="text-gray-400 -ml-2" />
        <h1 className="text-3xl font-bold ml-2">Setting</h1>
      </div>
      <h2 className="text-4xl font-bold text-center mb-10">Account Settings</h2>

      {/* Card */}
      <div className="bg-[#1f1f3d]/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <InfoField label="Name" value={userData.name} />
            <InfoField label="Email" value={userData.email} />
            <InfoField label="Password" value={userData.password} isPassword />
          </div>
          <div>
            <InfoField label="Phone Number" value={userData.phone} />
            <InfoField label="Backup Email" value={userData.backupEmail} />
            <InfoField label="Security Key" value={userData.securityKey} />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onLogout}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg" >
            <LogOut size={20} /> Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}


function InfoField({ label, value, isPassword = false }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 p-3 rounded-lg text-white font-medium shadow-inner">
        {isPassword ? '••••••••' : value}
      </div>
    </div>
  );
}



function SearchView({ setPage }) {
  return (
    <motion.div key="search-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
      className="p-0 md:p-0 text-white">
       <button onClick={() => setPage(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"> <ArrowLeft size={18} /> Back to Home </button>
       <h2 className="text-4xl font-bold text-center mb-10">Search Page</h2>
       <p className="text-center text-gray-400">This is the Search page content.</p>
       <p className="text-center text-gray-500 mt-4">(Search functionality will be added here)</p>
    </motion.div>
  );
}


function DownloadsView({ setPage }) {
  return (
    <motion.div key="downloads-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
      className="p-0 md:p-0 text-white">
       <button onClick={() => setPage(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"> <ArrowLeft size={18} /> Back to Home </button>
       <h2 className="text-4xl font-bold text-center mb-10">Downloads Page</h2>
       <p className="text-center text-gray-400">This is where the list of downloads will appear.</p>
    </motion.div>
  );
}



function NavItem({ icon, text, active = false, onClick }) { 
  const content = ( <> {icon} <span className="font-medium">{text}</span> </> );
  const classes = `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${ active ? 'bg-blue-600 text-white shadow-lg' : 'text-white/70 hover:bg-gray-700/50 hover:text-white' }`;
  // Always use div with onClick now
  return ( <div onClick={onClick} className={classes}> {content} </div> );
}

function BubblesBackground() {
  const bubbles = [
    { id: 1, x: '10%', y: '20%', size: 300, delay: 0, duration: 15 }, { id: 2, x: '80%', y: '30%', size: 200, delay: 2, duration: 20 },
    { id: 3, x: '60%', y: '70%', size: 250, delay: 4, duration: 18 }, { id: 4, x: '20%', y: '80%', size: 150, delay: 6, duration: 22 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bg-gradient-to-br from-blue-700 to-purple-700 opacity-40 rounded-full filter blur-3xl" // Was opacity-10
          style={{ width: bubble.size, height: bubble.size, top: bubble.y, left: bubble.x }}
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: bubble.duration, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: bubble.delay }}
        />
      ))}
    </div>
  );
 }
function GradientButton({ text, isBlue = false, isOutline = false, className = "" }) {
  const blueGradient = "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500";
  const purpleGradient = "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700";
  const outline = "bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-900/50";
  const buttonClasses = isOutline ? outline : (isBlue ? blueGradient : purpleGradient);
  const defaultClasses = "w-full md:w-auto px-8 py-3 rounded-full font-semibold shadow-lg transition-all transform";
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`${defaultClasses} ${buttonClasses} ${className}`}> {text} </motion.button>
  );
}

function SmallButton({ children, onClick, className = "" }) {
  return (
    <motion.button whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} onClick={onClick} className={`p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden transition-all ${className}`}>
      <div className="bg-[#1c1c3a] h-full w-full rounded-[14px] flex items-center justify-center"> {children} </div>
    </motion.button>
  );
 }
function HelpCard({ icon, title, text }) {
  return (
    <motion.div whileHover={{ y: -5, borderColor: 'rgb(59 130 246)' }} className="bg-[#2a2a4a]/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl p-6 transition-all hover:shadow-xl">
      <div className="mb-4"> {icon} </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-400">{text}</p>
    </motion.div>
  );
 }

