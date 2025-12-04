import React from 'react';
import { CosmicClub } from '../types';
import NeonButton from './NeonButton';

interface WelcomeClubOverlayProps {
  club: CosmicClub;
  onClose: () => void;
}

const WelcomeClubOverlay: React.FC<WelcomeClubOverlayProps> = ({ club, onClose }) => {
  const colorClass = `text-${club.color}-400`;
  const shadowColor = `shadow-${club.color}-400/50`;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl w-full max-w-md flex flex-col items-center p-8 m-4 animate-fade-in-up overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`absolute -inset-px rounded-2xl ${club.gradient} blur-2xl opacity-40`}></div>
        {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-[aurora-particles-float_15s_infinite]"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 15}s`, animationDuration: `${Math.random() * 10 + 5}s` }}
            ></div>
        ))}

        <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome!</h2>
            <p className="text-gray-300">You've successfully joined the</p>
            <p className={`text-4xl font-bold mt-4 text-glow ${colorClass} ${shadowColor}`}>{club.name}</p>
            <p className="text-gray-300 mt-2">constellation.</p>

            <div className="mt-8">
                <NeonButton color={club.color as 'cyan' | 'pink'} onClick={onClose}>
                    Explore
                </NeonButton>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeClubOverlay;