"use client";

import React from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const NavigationBar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="w-full max-w-md p-4 fixed bottom-5 bg-gray-800 h-16 flex justify-around items-center border-t border-gray-700 rounded-3xl">
      <button
        className="flex flex-col items-center text-white text-xs focus:outline-none"
        onClick={() => onNavigate('explore')}
      >
        <span className="text-2xl">🔍</span>
        <span>Explore</span>
      </button>

      <button
        className="flex flex-col items-center text-white text-xs focus:outline-none"
        onClick={() => onNavigate('saved')}
      >
        <span className="text-2xl">💾</span>
        <span>Saved</span>
      </button>
    </nav>
  );
};

export default NavigationBar;
