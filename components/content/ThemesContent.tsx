import React, { useState } from 'react';

type ThemeName = 'nebula' | 'galaxy' | 'aurora' | 'meteor';

interface Theme {
  name: string;
  gradient: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
}

const themes: { [key in ThemeName]: Theme } = {
  nebula: { name: 'Nebula', gradient: 'from-purple-900/80 via-pink-800/80 to-indigo-900/80', glowColor: '#ec4899', borderColor: 'border-pink-500/50', textColor: 'text-pink-400' },
  galaxy: { name: 'Galaxy', gradient: 'from-gray-800/80 via-gray-900/80 to-black', glowColor: '#06b6d4', borderColor: 'border-cyan-500/50', textColor: 'text-cyan-400' },
  aurora: { name: 'Aurora', gradient: 'from-green-900/80 via-cyan-800/80 to-blue-900/80', glowColor: '#10b981', borderColor: 'border-green-500/50', textColor: 'text-green-400' },
  meteor: { name: 'Meteor Shower', gradient: 'from-slate-900/80 via-black to-slate-800/80', glowColor: '#f59e0b', borderColor: 'border-amber-500/50', textColor: 'text-amber-400' },
};

const ProfilePreviewCard: React.FC<{ theme: Theme }> = ({ theme }) => (
    <div className="group relative w-full max-w-sm h-80 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-500"
         style={{ background: `linear-gradient(145deg, ${theme.gradient.split(' ')[0]}, ${theme.gradient.split(' ')[2]})`}}>
        <div className="absolute -inset-px rounded-2xl border-2 transition-all duration-300" style={{ borderColor: theme.glowColor, boxShadow: `0 0 25px ${theme.glowColor}`, opacity: 0.8 }}></div>
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-black/30 mb-4 border-2 border-white/20 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white text-glow" style={{ textShadow: `0 0 8px ${theme.glowColor}` }}>Cosmic_Voyager</h3>
            <p className="text-sm font-semibold" style={{ color: theme.glowColor }}>VIP Member</p>
        </div>
        {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100" style={{
                background: theme.glowColor,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `sparkle-pop 1s ${i * 0.1}s ease-out infinite`,
            }}></div>
        ))}
    </div>
);

const ThemeSelectorCard: React.FC<{ theme: Theme; isActive: boolean; onClick: () => void; }> = ({ theme, isActive, onClick }) => (
    <button onClick={onClick} className={`relative w-full p-4 rounded-lg border-2 transition-all duration-300 ${isActive ? theme.borderColor : 'border-gray-800/50 hover:border-white/30'}`}>
        <div className="absolute inset-0 bg-gradient-to-br" style={{ background: `linear-gradient(145deg, ${theme.gradient})` }}></div>
        <div className="relative z-10 text-white font-semibold text-glow" style={{ color: theme.textColor }}>{theme.name}</div>
        {isActive && <div className="absolute -inset-1 rounded-lg blur-md" style={{ background: theme.glowColor, opacity: 0.5 }}></div>}
    </button>
);


const ThemesContent: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('nebula');

  const handleThemeChange = (themeName: ThemeName) => {
    setActiveTheme(themeName);
    
    // Trigger cinematic ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'fixed top-0 left-0 w-screen h-screen rounded-full z-[9998] pointer-events-none';
    ripple.style.background = `radial-gradient(circle, ${themes[themeName].glowColor} 0%, transparent 60%)`;
    ripple.style.animation = 'theme-ripple-effect 1s ease-out forwards';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500 mb-4">
          Profile Themes
        </h2>
        <p className="text-lg text-gray-300">Select your cosmic aura. Your theme is a reflection of your presence.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Choose Your Theme</h3>
            <div className="space-y-4">
                {Object.keys(themes).map(key => (
                    <ThemeSelectorCard 
                        key={key}
                        theme={themes[key as ThemeName]}
                        isActive={activeTheme === key}
                        onClick={() => handleThemeChange(key as ThemeName)}
                    />
                ))}
            </div>
        </div>
        
        {/* Preview */}
        <div className="lg:col-span-2 flex items-center justify-center p-4">
            <ProfilePreviewCard theme={themes[activeTheme]} />
        </div>
      </div>
    </div>
  );
};

export default ThemesContent;