import React from 'react';
import { User } from '../types';

interface MiniProfileOverlayProps {
  user: User;
  onClose: () => void;
}

const MiniProfileOverlay: React.FC<MiniProfileOverlayProps> = ({ user, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl w-full max-w-xs flex flex-col items-center p-6 box-glow text-cyan-500/50 m-4 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="relative mb-4">
          <div className={`w-24 h-24 rounded-full ${user.avatarGradient}`} />
          {user.isVip && (
            <div className="absolute -inset-1 rounded-full animate-[vip-halo-pulse_2s_ease-in-out_infinite] pointer-events-none"></div>
          )}
        </div>

        {/* User Info */}
        <h2 className={`text-2xl font-bold ${user.color} text-glow`}>{user.name}</h2>
        <p className="text-sm text-gray-400 mt-1">{user.joined}</p>

        <div className="w-full h-px bg-gray-700/50 my-4"></div>

        <div className="text-center">
            <p className="text-sm text-gray-400">Total Sent</p>
            <p className="text-2xl font-bold text-pink-400 text-glow">
                {user.stardustSent.toLocaleString()} <span className="font-serif">ʚɞ</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default MiniProfileOverlay;