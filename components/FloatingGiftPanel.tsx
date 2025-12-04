import React from 'react';
import { Gift } from '../types';

// --- NEW GIFT ICONS ---
const StarfallIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88.83 4.25z"/></svg>;
const NebulaHeartIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
const AuroraCrownIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M2 15l2 4h16l2-4-2.6-6.5L12 2 4.6 8.5 2 15zm4.88 2L5.5 15h13l-1.38 2H6.88zM6.21 13l5.79-6.38L17.79 13H6.21z"/></svg>;
const MeteorRingIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9.5l3.5-1 1.5-3.5 1.5 3.5 3.5 1-3.5 1-1.5 3.5-1.5-3.5-3.5-1z"/></svg>;
const PhoenixIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19 10c-1.14 0-2.2.39-3 1.03V8c0-3.31-2.69-6-6-6S4 4.69 4 8v5.17c-.41.22-.78.51-1.1.86C2.32 14.54 2 15.22 2 16c0 1.66 1.34 3 3 3 .55 0 1.07-.15 1.5-.42.93 1.22 2.36 2.01 4 2.32V22h2v-1.11c1.64-.31 3.07-1.1 4-2.32.43.27.95.42 1.5.42 1.66 0 3-1.34 3-3 0-.78-.32-1.46-.89-1.97-.24-.22-.51-.4-.79-.55.08-.2.13-.41.17-.63.09-.43.13-.86.13-1.3C22 11.34 20.66 10 19 10z"/></svg>;
const LeviathanIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.57 14.86c-1.39-1.42-3.5-2.22-5.71-2.22h-1.57c-.88 0-1.71.28-2.42.79-2.03 1.43-3.75 3.19-5.06 5.16l-.3.45c-.3.45-.11 1.08.34 1.37.45.3.99.11 1.28-.34l.3-.45c1.1-1.68 2.5-3.19 4.25-4.45.4-.28.87-.44 1.36-.44h1.57c3.1 0 5.67-1.29 7.03-2.65.17-.17.27-.4.27-.64s-.1-.47-.27-.64zm-8.8-10.43L11.7 5c-1.12.63-2.09 1.49-2.88 2.5.34.09.68.21 1.02.38-1.54 1.14-2.73 2.66-3.51 4.39-.43-1.07-.63-2.19-.63-3.34 0-1.33.32-2.61.92-3.77.72-1.39 1.77-2.58 3.09-3.53z"/></svg>;

// --- NEW GIFT DATA ---
const gifts: Gift[] = [
  { name: 'Starfall', price: 75, icon: <StarfallIcon className="w-8 h-8"/>, animation: '', color: 'yellow' },
  { name: 'Nebula Heart', price: 120, icon: <NebulaHeartIcon className="w-8 h-8"/>, animation: '', color: 'pink' },
  { name: 'Aurora Crown', price: 150, icon: <AuroraCrownIcon className="w-8 h-8"/>, animation: '', color: 'green' },
  { name: 'Meteor Ring', price: 200, icon: <MeteorRingIcon className="w-8 h-8"/>, animation: '', color: 'cyan' },
  { name: 'G. Phoenix', price: 300, icon: <PhoenixIcon className="w-8 h-8"/>, animation: '', color: 'orange' },
  { name: 'C. Leviathan', price: 500, icon: <LeviathanIcon className="w-8 h-8"/>, animation: '', color: 'indigo' },
];

interface FloatingGiftPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const GiftItem: React.FC<{ gift: Gift, onSend: (e: React.MouseEvent<HTMLButtonElement>) => void }> = ({ gift, onSend }) => {
    const colorClasses: {[key: string]: string} = {
        yellow: 'border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/10 hover:shadow-[0_0_20px_theme(colors.yellow.400)]',
        cyan: 'border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_theme(colors.cyan.400)]',
        pink: 'border-pink-400/50 text-pink-300 hover:bg-pink-500/10 hover:shadow-[0_0_20px_theme(colors.pink.400)]',
        green: 'border-green-400/50 text-green-300 hover:bg-green-500/10 hover:shadow-[0_0_20px_theme(colors.green.400)]',
        orange: 'border-orange-400/50 text-orange-300 hover:bg-orange-500/10 hover:shadow-[0_0_20px_theme(colors.orange.400)]',
        indigo: 'border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/10 hover:shadow-[0_0_20px_theme(colors.indigo.400)]',
    };

    return (
        <button 
            onClick={onSend}
            className={`group relative flex flex-col items-center justify-center p-3 bg-gray-900/50 backdrop-blur-sm border rounded-xl transition-all duration-300 transform hover:-translate-y-1 space-y-2 ${colorClasses[gift.color] || ''}`}
        >
             <div className="relative animate-float" style={{animationDuration: `${Math.random() * 2 + 5}s`}}>
                {gift.icon}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="absolute bottom-0 left-1/2 h-1 w-1 rounded-full bg-white opacity-0" style={{
                        animation: `particle-trail 3s ${i * 0.5}s linear infinite`,
                        marginLeft: `${(Math.random() - 0.5) * 10}px`,
                    }}/>
                ))}
            </div>
            <div className="text-xs font-semibold">{gift.name}</div>
            <div className="flex items-center text-xs">
                <span>{gift.price}</span>
                <span className="ml-1 text-base font-serif text-pink-400">ʚɞ</span>
            </div>
        </button>
    );
}

const FloatingGiftPanel: React.FC<FloatingGiftPanelProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSendGift = (giftColor: string) => {
        const ripple = document.createElement('div');
        ripple.className = 'pointer-events-none fixed top-1/2 left-1/2 rounded-full z-[9999]';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.width = '100vmin';
        ripple.style.height = '100vmin';
        ripple.style.borderColor = giftColor;
        ripple.style.boxShadow = `0 0 20px ${giftColor}, inset 0 0 20px ${giftColor}`;
        ripple.style.animation = 'cosmic-ripple-effect 1.2s ease-out forwards';
        
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1200);
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
        >
            <div 
                className="absolute bottom-24 right-4 sm:right-8 md:right-16 w-full max-w-sm p-4 bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl box-glow text-cyan-500/50 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-center font-bold text-lg text-white mb-4">Send a Cosmic Gift</h3>
                <div className="grid grid-cols-3 gap-3">
                    {gifts.map(gift => (
                        <GiftItem 
                            key={gift.name} 
                            gift={gift} 
                            onSend={() => {
                                const colorHex: {[key: string]: string} = {
                                    yellow: '#facc15',
                                    cyan: '#22d3ee',
                                    pink: '#f472b6',
                                    green: '#4ade80',
                                    orange: '#fb923c',
                                    indigo: '#818cf8',
                                };
                                handleSendGift(colorHex[gift.color] || '#ffffff')
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FloatingGiftPanel;