import React, { useState } from 'react';
import NeonButton from '../NeonButton';

type SettingsTab = 'privacy' | 'vip';

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
  <button onClick={onClick} className={`relative flex-1 px-4 py-3 text-sm font-semibold rounded-t-lg transition-all duration-300 ${isActive ? 'text-cyan-300 bg-gray-900/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {label}
    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)]"></div>}
  </button>
);

const CosmicToggle: React.FC<{ label: string; description: string; enabled: boolean; onToggle: () => void; }> = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800/50">
    <div>
      <h4 className="font-semibold text-white">{label}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={enabled} onChange={onToggle} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-cyan-600/50 transition-colors"></div>
      <div className={`dot absolute top-0.5 left-[2px] bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:shadow-[0_0_10px_theme(colors.cyan.300)]`}></div>
    </label>
  </div>
);

const PrivacySettings: React.FC = () => {
    const [visibility, setVisibility] = useState(true);
    const [giftHistory, setGiftHistory] = useState(true);
    const [clubMembership, setClubMembership] = useState(true);
    const [cinematicEffects, setCinematicEffects] = useState(true);

    return (
        <div className="space-y-4 animate-fade-in">
            <CosmicToggle label="Profile Visibility" description="Control who can see your profile and activity." enabled={visibility} onToggle={() => setVisibility(!visibility)} />
            <CosmicToggle label="Show Gift History" description="Display a log of gifts you've sent on your profile." enabled={giftHistory} onToggle={() => setGiftHistory(!giftHistory)} />
            <CosmicToggle label="Display Club Membership" description="Let others see which Cosmic Clubs you've joined." enabled={clubMembership} onToggle={() => setClubMembership(!clubMembership)} />
            <CosmicToggle label="Cinematic Effects" description="Enable full-screen aurora ripple effects for a more immersive experience." enabled={cinematicEffects} onToggle={() => setCinematicEffects(!cinematicEffects)} />
        </div>
    );
};

const VipManagement: React.FC = () => {
    const [glowColor, setGlowColor] = useState('#06b6d4'); // cyan-500

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/50 text-center">
                 <p className="text-sm font-semibold text-yellow-300">CURRENT TIER</p>
                 <p className="text-2xl font-bold text-white text-glow">Cosmic VIP</p>
             </div>
             <div className="p-4 bg-black/30 rounded-lg border border-gray-800/50">
                 <h4 className="font-semibold text-white mb-2">Streak Boosters</h4>
                 <p className="text-sm text-gray-300">You have <span className="font-bold text-cyan-400">3</span> Streak Boosters available.</p>
             </div>
             <div className="p-4 bg-black/30 rounded-lg border border-gray-800/50">
                 <h4 className="font-semibold text-white mb-3">Profile Glow Color</h4>
                 <div className="flex items-center gap-4">
                    <input type="color" value={glowColor} onChange={e => setGlowColor(e.target.value)} className="w-12 h-10 p-0 border-none bg-transparent cursor-pointer" />
                    <div className="w-full h-2 rounded-full" style={{background: glowColor, boxShadow: `0 0 15px ${glowColor}`}}></div>
                 </div>
             </div>
              <div className="p-4 bg-black/30 rounded-lg border border-gray-800/50 flex justify-between items-center">
                 <h4 className="font-semibold text-white">Custom Emotes</h4>
                 <NeonButton color="pink" className="px-4 py-2 text-sm">Manage</NeonButton>
             </div>
        </div>
    );
};


const SettingsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('privacy');

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-500 mb-4">
                    Settings
                </h2>
                <p className="text-lg text-gray-300">Customize your cosmic experience, from privacy to VIP perks.</p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl">
                <div className="flex border-b border-gray-800/50">
                    <TabButton label="Privacy" isActive={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
                    <TabButton label="VIP Management" isActive={activeTab === 'vip'} onClick={() => setActiveTab('vip')} />
                </div>

                <div className="p-6">
                    {activeTab === 'privacy' ? <PrivacySettings /> : <VipManagement />}
                </div>
            </div>
        </div>
    );
};

export default SettingsContent;