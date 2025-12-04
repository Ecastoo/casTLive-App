import React, { useState } from 'react';
import NeonButton from '../NeonButton';

type FlairType = 'none' | 'sparkles' | 'comet_trails' | 'aurora_waves';

const FlairSelectorCard: React.FC<{ title: string; description: string; isActive: boolean; onClick: () => void; color: string; }> = ({ title, description, isActive, onClick, color }) => {
  const activeClasses = `border-${color}-500/80 shadow-[0_0_20px_theme(colors.${color}.500)]`;
  const inactiveClasses = 'border-gray-800/50 hover:border-white/30';

  return (
    <button onClick={onClick} className={`relative p-4 bg-black/30 rounded-lg border-2 text-left w-full transition-all duration-300 ${isActive ? activeClasses : inactiveClasses}`}>
      <h4 className={`font-bold ${isActive ? `text-${color}-400` : 'text-white'}`}>{title}</h4>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
      {isActive && <div className={`absolute -inset-1 rounded-lg bg-${color}-500/20 blur-lg -z-10`}></div>}
    </button>
  );
};

const CosmicToggle: React.FC<{ label: string; enabled: boolean; onToggle: () => void; }> = ({ label, enabled, onToggle }) => (
    <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border-2 border-yellow-500/30">
        <h4 className="font-semibold text-yellow-300">{label}</h4>
        <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={enabled} onChange={onToggle} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-yellow-600/50 transition-colors"></div>
        <div className={`dot absolute top-0.5 left-[2px] bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:shadow-[0_0_10px_theme(colors.yellow.300)]`}></div>
        </label>
    </div>
);


// Web Audio API helper for sound effects
const playRippleSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
};


const FlairContent: React.FC = () => {
    const [activeFlair, setActiveFlair] = useState<FlairType>('sparkles');
    const [isVipHaloActive, setIsVipHaloActive] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        playRippleSound();
        const avatar = e.currentTarget;
        const ripple = document.createElement('div');
        ripple.className = 'absolute inset-0 rounded-full border-2 border-cyan-300';
        ripple.style.animation = `flair-ripple 0.6s ease-out forwards`;
        ripple.style.color = 'hsl(180, 80%, 70%)';
        
        // Remove old ripple if exists
        const oldRipple = avatar.querySelector('.ripple-effect');
        if (oldRipple) oldRipple.remove();

        ripple.classList.add('ripple-effect');
        avatar.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };
    
    const simulateMultiReaction = () => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 z-[9999] pointer-events-none animate-aurora-flow opacity-0';
        overlay.style.animationDuration = '5s';
        overlay.style.animationTimingFunction = 'ease-in-out';
        overlay.style.animationIterationCount = '1';
        overlay.style.animationFillMode = 'forwards';
        
        document.body.appendChild(overlay);
        setTimeout(() => overlay.style.opacity = '0.4', 50); // fade in
        setTimeout(() => {
            overlay.style.opacity = '0'; // fade out
            setTimeout(() => overlay.remove(), 1000);
        }, 4000);
    }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
          Profile Flair
        </h2>
        <p className="text-lg text-gray-300">Customize your avatar's ambient effects and interactive presence.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Preview */}
        <div className="relative aspect-square flex items-center justify-center">
          <div 
            className="relative w-48 h-48 md:w-64 md:h-64 cursor-pointer"
            onClick={handleAvatarClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-purple-500 via-pink-500 border-4 border-gray-800/50"></div>
            
            {/* VIP Halo */}
            {isVipHaloActive && (
                <div 
                    className="absolute -inset-2 rounded-full border-2 border-yellow-400"
                    style={{
                        animation: `vip-halo-breathing 4s ease-in-out infinite`,
                        color: 'hsl(50, 100%, 70%)',
                        transition: 'transform 0.3s ease',
                        transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                    }}
                ></div>
            )}

            {/* Particle Flairs */}
            <div className="absolute inset-0">
                {activeFlair === 'sparkles' && [...Array(15)].map((_, i) => (
                    <div key={i} className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full" style={{
                        top: '50%', left: '50%',
                        transform: `rotate(${Math.random() * 360}deg) translateX(${60 + Math.random() * 80}px)`,
                        animation: `floating-sparkles ${2 + Math.random() * 3}s ease-in-out infinite ${i * 0.2}s`,
                    }}></div>
                ))}
                {activeFlair === 'comet_trails' && [...Array(3)].map((_, i) => (
                    <div key={i} className="absolute top-1/2 left-1/2 w-8 h-1" style={{
                         animation: `orbital-path ${5 + i*2}s linear infinite ${i * 1}s ${isHovering ? 'running' : 'paused'}`,
                    }}>
                        <div className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_10px_2px_theme(colors.pink.400)]"></div>
                    </div>
                ))}
                {activeFlair === 'aurora_waves' && [...Array(5)].map((_, i) => (
                     <div key={i} className="absolute w-24 h-40 bg-gradient-to-b from-green-400/50 to-transparent rounded-full" style={{
                        top: '50%', left: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-80px)`,
                        animation: `aurora-wave ${3 + Math.random() * 2}s ease-in-out infinite alternate ${i * 0.3}s`,
                        transition: 'transform 0.5s ease',
                        transformOrigin: 'center center',
                        filter: 'blur(10px)',
                     }}></div>
                ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-white mb-3">Particle Emotes</h3>
                <div className="space-y-3">
                    <FlairSelectorCard title="Cosmic Sparkles" description="A gentle, glittering aura of stardust." isActive={activeFlair === 'sparkles'} onClick={() => setActiveFlair('sparkles')} color="cyan" />
                    <FlairSelectorCard title="Comet Trails" description="Miniature comets orbit your avatar." isActive={activeFlair === 'comet_trails'} onClick={() => setActiveFlair('comet_trails')} color="pink" />
                    <FlairSelectorCard title="Aurora Waves" description="Ethereal waves of light ebb and flow." isActive={activeFlair === 'aurora_waves'} onClick={() => setActiveFlair('aurora_waves')} color="green" />
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-white mb-3">VIP Perks</h3>
                <CosmicToggle label="Activate VIP Halo" enabled={isVipHaloActive} onToggle={() => setIsVipHaloActive(!isVipHaloActive)} />
            </div>
            <div>
                 <h3 className="font-semibold text-white mb-3">Community Effects</h3>
                 <NeonButton color="purple" onClick={simulateMultiReaction} className="w-full">
                    Simulate Multi-Reaction
                </NeonButton>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FlairContent;
