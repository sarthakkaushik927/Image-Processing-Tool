import React from 'react';


export default function NavItem({ icon, text, active = false }) {
  return (
    <li>
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
    </li>
  );
}

