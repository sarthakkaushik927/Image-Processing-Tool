import React from 'react';

/**
 * UPDATED: Reusable Auth Input Field
 * Matched styling closer to Figma (darker, subtle border).
 */
export default function AuthInput({ icon, suffix, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50">
          {icon}
        </div>
      )}
      <input
        {...props}
        required
        className={`w-full py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${icon ? 'pl-12' : 'pl-4'} ${suffix ? 'pr-12' : 'pr-4'}`}
      />
      {suffix && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {suffix}
        </div>
      )}
    </div>
  );
}

