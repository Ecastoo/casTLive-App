import React from 'react';
import { HighlightedUser } from '../types';

interface VipMiniOverlayProps {
  user: HighlightedUser;
  onClose: () => void;
}

const VipMiniOverlay: React.FC<VipMiniOverlayProps> = ({ user, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative bg-gray-900/80 backdrop-blur-xl border border-${user.color}-500/30 rounded-2xl w-full max-w-xs flex flex-col items-center p-6 box-glow text-${user.color}-500/50 m-4 animate-fade-in-up`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br from-${user.color}-900 via-gray-900 to-black opacity-40 -z-10`}></div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Header */}
        <div className={`w-20 h-20 rounded-full ${user.avatarGradient} mb-3`}></div>
        <h2 className={`text-2xl font-bold text-${user.color}-400 text-glow`}>{user.name}</h2>
        <p className={`text-sm font-semibold uppercase tracking-wider text-${user.color}-400/80`}>{user.status}</p>

        <div className="w-full h-px bg-gray-700/50 my-4"></div>

        {/* Stats */}
        <div className="w-full flex justify-around text-center">
            <div>
                <p className="text-sm text-gray-400">Streak</p>
                <p className="text-2xl font-bold text-white text-glow">{user.streak} <span className="text-base">days</span></p>
            </div>
        </div>

        {/* Recent Gifts */}
        <div className="w-full mt-4">
            <h4 className="text-sm font-semibold text-gray-400 text-center mb-2">Recent Gifts</h4>
            <div className="flex justify-center items-center gap-3">
                {user.recentGifts.map((gift, index) => (
                    <div key={index} className="flex flex-col items-center text-center text-xs text-gray-300 p-2 rounded-lg bg-black/30">
                        {gift.icon}
                        <span>{gift.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Perks */}
        {user.status === 'VIP' && user.perks.length > 0 && (
             <div className="w-full mt-4">
                <h4 className="text-sm font-semibold text-gray-400 text-center mb-2">VIP Perks</h4>
                <div className="text-center text-xs text-cyan-300 space-y-1">
                    <p>Custom Chat Badge</p>
                    <p>Exclusive Emotes</p>
                    <p>Profile Glow Effect</p>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default VipMiniOverlay;
