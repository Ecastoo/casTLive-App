import React, { useState } from 'react';
import { User, FlaggedContent, RiskLevel } from '../../types';
import NeonButton from '../NeonButton';

// --- MOCK DATA ---
const users: { [key: string]: User } = {
  griefer: { name: 'Galaxy_Griefer', avatarGradient: 'bg-gradient-radial from-slate-500 via-slate-600', isVip: false, joined: 'Joined 1 day ago', stardustSent: 0, color: 'text-slate-400' },
  crasher: { name: 'Comet_Crasher', avatarGradient: 'bg-gradient-radial from-red-700 via-rose-800', isVip: false, joined: 'Joined 5 days ago', stardustSent: 10, color: 'text-red-400' },
  safety_concern: { name: 'User_481516', avatarGradient: 'bg-gradient-radial from-gray-600 via-gray-700', isVip: false, joined: 'Joined 2 hours ago', stardustSent: 0, color: 'text-gray-400' },
};

const flaggedItems: FlaggedContent[] = [
  { id: 1, user: users.safety_concern, reason: 'Child Safety Concern', content: 'Inappropriate language in a space with younger viewers.', riskLevel: 'high' },
  { id: 2, user: users.crasher, reason: 'Harassment', content: 'Repeatedly targeting another user with insults in chat.', riskLevel: 'medium' },
  { id: 3, user: users.griefer, reason: 'Spam', content: 'Check out my cool new NFT project!!! Link in bio', riskLevel: 'low' },
];

// --- STYLES & HELPERS ---
const riskStyles: { [key in RiskLevel]: { nebula: string; border: string; glow: string; text: string; actionColor: string } } = {
  low: { nebula: 'from-yellow-500/10', border: 'border-yellow-500/50 hover:border-yellow-400/80', glow: 'hover:shadow-[0_0_20px_theme(colors.yellow.400/0.5)]', text: 'text-yellow-400', actionColor: 'rgba(250, 204, 21, 0.4)' },
  medium: { nebula: 'from-orange-500/10', border: 'border-orange-500/50 hover:border-orange-400/80', glow: 'hover:shadow-[0_0_20px_theme(colors.orange.400/0.5)]', text: 'text-orange-400', actionColor: 'rgba(249, 115, 22, 0.4)' },
  high: { nebula: 'from-red-500/10', border: 'border-red-500/50 hover:border-red-400/80', glow: 'hover:shadow-[0_0_20px_theme(colors.red.400/0.5)]', text: 'text-red-400', actionColor: 'rgba(239, 68, 68, 0.4)' },
};

const triggerAuroraEffect = (color: string) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] pointer-events-none';
    overlay.style.background = `radial-gradient(circle, ${color}, transparent 60%)`;
    overlay.style.opacity = '0';
    overlay.style.animation = 'aurora-overlay-effect 1s ease-out';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1000);
};

// --- SUB-COMPONENTS ---
const ViolationCard: React.FC<{ item: FlaggedContent; onClick: () => void; }> = ({ item, onClick }) => {
  const styles = riskStyles[item.riskLevel];
  return (
    <button onClick={onClick} className={`group relative w-full p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl text-left transition-all duration-300 overflow-hidden ${styles.border} ${styles.glow}`}>
      <div className={`absolute inset-0 bg-gradient-radial ${styles.nebula} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-white text-lg">{item.user.name}</p>
            <p className={`text-sm font-semibold ${styles.text}`}>{item.reason}</p>
          </div>
          <div className={`text-xs font-bold uppercase px-3 py-1 rounded-full bg-black/40 ${styles.text}`}>{item.riskLevel} Risk</div>
        </div>
        <p className="mt-4 text-sm text-gray-300 bg-black/30 p-3 rounded-lg italic">"{item.content}"</p>
      </div>
    </button>
  );
};

const ModerationModal: React.FC<{ item: FlaggedContent; onClose: () => void; }> = ({ item, onClose }) => {
    const styles = riskStyles[item.riskLevel];

    const handleAction = (action: string) => {
        console.log(`Action taken on ${item.user.name}: ${action}`);
        triggerAuroraEffect(styles.actionColor);
        onClose();
    };

    return (
         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className={`relative bg-gray-900/80 backdrop-blur-xl border-2 ${styles.border} rounded-2xl w-full max-w-lg m-4 flex flex-col box-glow ${styles.text}/50 animate-fade-in-up`}>
                <header className="p-4 border-b border-gray-700/50">
                    <h3 className={`text-2xl font-bold text-glow ${styles.text}`}>Reviewing: {item.user.name}</h3>
                    <p className="text-sm text-gray-400">Reason: {item.reason}</p>
                </header>
                <main className="p-6">
                    <p className="text-gray-300 italic bg-black/20 p-4 rounded-lg">"{item.content}"</p>
                </main>
                <footer className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3 bg-black/20">
                    <NeonButton color="green" className="py-2 text-sm" onClick={() => handleAction('Approve Content')}>Approve</NeonButton>
                    <NeonButton color="purple" className="py-2 text-sm" onClick={() => handleAction('Hold ʚɞ')}>Hold ʚɞ</NeonButton>
                    <NeonButton color="orange" className="py-2 text-sm" onClick={() => handleAction('Mute User')}>Mute</NeonButton>
                    <NeonButton color="red" className="py-2 text-sm" onClick={() => handleAction('Ban User')}>Ban</NeonButton>
                </footer>
            </div>
         </div>
    );
};

// --- MAIN COMPONENT ---
const ModerationDashboardContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FlaggedContent | null>(null);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 mb-4">
          Moderation Command
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Review and take action on flagged content to maintain a safe cosmic environment.
        </p>
      </div>

      <div className="space-y-6">
        {flaggedItems.map(item => (
          <ViolationCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>
      
      {selectedItem && (
          <ModerationModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default ModerationDashboardContent;