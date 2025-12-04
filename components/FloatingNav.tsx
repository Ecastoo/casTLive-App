
import React from 'react';

const FloatingNav: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-lg border border-gray-700/50 rounded-full shadow-2xl shadow-cyan-500/10 z-40 animate-fade-in-up">
      <div className="flex items-center gap-2 p-2">
        <button className="w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:bg-pink-500/10 hover:text-pink-300 transition-all duration-300 text-2xl font-serif">
            ʚɞ
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
      </div>
    </div>
  );
};

export default FloatingNav;
