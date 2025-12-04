
import React, { useState, useRef, useEffect } from 'react';

type AvatarSource = 'upload' | 'ai' | 'premade';

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
  <button onClick={onClick} className={`relative px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${isActive ? 'text-cyan-300' : 'text-gray-400 hover:text-white'}`}>
    {label}
    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)]"></div>}
  </button>
);

const CustomizationAccordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-800/50">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 text-left hover:bg-white/5">
                <span className="font-semibold text-white">{title}</span>
                <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && <div className="p-3 bg-black/20">{children}</div>}
        </div>
    );
};

const ColorPicker: React.FC<{ color: string; onChange: (color: string) => void }> = ({ color, onChange }) => (
    <div className="relative w-full h-10">
        <input type="color" value={color} onChange={e => onChange(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="w-full h-full rounded-md border border-gray-600" style={{ backgroundColor: color }}></div>
    </div>
);

const AvatarCustomizationContent: React.FC = () => {
    // Initialize state from localStorage
    const [activeSource, setActiveSource] = useState<AvatarSource>(() => {
        try {
            const saved = localStorage.getItem('avatarSettings');
            return saved ? JSON.parse(saved).activeSource || 'premade' : 'premade';
        } catch { return 'premade'; }
    });
    
    const [hairColor, setHairColor] = useState(() => {
        try {
            const saved = localStorage.getItem('avatarSettings');
            return saved ? JSON.parse(saved).hairColor || '#ec4899' : '#ec4899';
        } catch { return '#ec4899'; }
    });
    
    const [outfitColor, setOutfitColor] = useState(() => {
        try {
            const saved = localStorage.getItem('avatarSettings');
            return saved ? JSON.parse(saved).outfitColor || '#06b6d4' : '#06b6d4';
        } catch { return '#06b6d4'; }
    });

    const [aiPrompt, setAiPrompt] = useState(() => {
        try {
            const saved = localStorage.getItem('avatarSettings');
            return saved ? JSON.parse(saved).aiPrompt || '' : '';
        } catch { return ''; }
    });

    const previewRef = useRef<HTMLDivElement>(null);

    const handleSave = () => {
        const settings = {
            activeSource,
            hairColor,
            outfitColor,
            aiPrompt
        };
        localStorage.setItem('avatarSettings', JSON.stringify(settings));

        // Visual feedback
        const btn = document.getElementById('save-avatar-btn');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "Saved!";
            btn.classList.add('text-green-400', 'border-green-400');
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('text-green-400', 'border-green-400');
            }, 2000);
        }
    };

    const handlePreviewHover = (e: React.MouseEvent) => {
        const preview = previewRef.current;
        if (!preview) return;

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.pointerEvents = 'none';
            particle.style.backgroundColor = `hsl(${180 + Math.random() * 120}, 100%, 70%)`;
            particle.style.animation = `control-ripple 0.8s ${i * 0.05}s ease-out forwards`;
            
            const rect = preview.getBoundingClientRect();
            particle.style.left = `${e.clientX - rect.left}px`;
            particle.style.top = `${e.clientY - rect.top}px`;

            preview.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    };

    return (
        <div className="animate-fade-in max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                    Cosmic Identity
                </h2>
                <p className="text-lg text-gray-300">Craft your avatar. Define your presence in the cosmos.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 flex flex-col">
                    <div className="flex border-b border-gray-800/50 mb-4">
                        <TabButton label="Cosmic Avatars" isActive={activeSource === 'premade'} onClick={() => setActiveSource('premade')} />
                        <TabButton label="Generate with AI" isActive={activeSource === 'ai'} onClick={() => setActiveSource('ai')} />
                        <TabButton label="Upload Photo" isActive={activeSource === 'upload'} onClick={() => setActiveSource('upload')} />
                    </div>

                    <div className="flex-grow space-y-2 overflow-y-auto pr-2">
                        {activeSource === 'premade' && (
                            <>
                                <CustomizationAccordion title="Hair">
                                    <div className="space-y-4">
                                    <p className="text-sm text-gray-400">Color</p>
                                    <ColorPicker color={hairColor} onChange={setHairColor} />
                                    </div>
                                </CustomizationAccordion>
                                <CustomizationAccordion title="Outfit">
                                    <div className="space-y-4">
                                    <p className="text-sm text-gray-400">Color</p>
                                    <ColorPicker color={outfitColor} onChange={setOutfitColor} />
                                    </div>
                                </CustomizationAccordion>
                                <CustomizationAccordion title="Accessories">
                                    <p className="text-sm text-gray-400 text-center p-4">More accessories coming soon!</p>
                                </CustomizationAccordion>
                            </>
                        )}

                        {activeSource === 'ai' && (
                            <div className="p-4 space-y-4">
                                <label className="block text-sm font-medium text-gray-300">AI Generation Prompt</label>
                                <textarea 
                                    className="w-full h-32 bg-black/20 border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                                    placeholder="Describe your cosmic avatar (e.g., 'A crystalline warrior with stardust hair')..."
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-500">Describe the celestial features, armor, and aura of your avatar.</p>
                            </div>
                        )}

                        {activeSource === 'upload' && (
                             <div className="p-8 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors cursor-pointer m-4">
                                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                <span>Upload Image</span>
                             </div>
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            id="save-avatar-btn"
                            onClick={handleSave}
                            className="relative px-10 py-4 font-semibold text-white bg-black/40 border-2 border-cyan-400/50 rounded-lg backdrop-blur-sm transition-all duration-300"
                            style={{
                                '--glow-color-1': 'rgba(6, 182, 212, 0.8)',
                                '--glow-color-2': 'rgba(192, 132, 252, 0.6)',
                                animation: 'save-button-pulse 4s ease-in-out infinite'
                            } as React.CSSProperties}
                        >
                            Save Avatar
                        </button>
                    </div>
                </div>

                {/* Preview */}
                <div ref={previewRef} onMouseMove={handlePreviewHover} className="relative aspect-square bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
                    
                    {/* Render AI Prompt Text overlay if AI mode is selected */}
                    {activeSource === 'ai' && aiPrompt && (
                         <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
                            <p className="text-xs text-cyan-300 italic text-center max-h-20 overflow-hidden text-ellipsis">"{aiPrompt}"</p>
                        </div>
                    )}
                    
                    {/* Render placeholder avatar if not uploading */}
                    {activeSource !== 'upload' && (
                        <>
                             <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 20% 20%, ${hairColor}20, transparent 40%), radial-gradient(circle at 80% 70%, ${outfitColor}20, transparent 40%)` }}></div>

                            <div className="relative w-3/4 h-3/4" style={{ transformStyle: 'preserve-3d', animation: 'preview-rotate 20s linear infinite alternate' }}>
                               {/* Avatar Body */}
                               <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full" style={{ background: outfitColor, boxShadow: `0 0 35px ${outfitColor}` }}></div>
                               {/* Avatar Head */}
                               <div className="absolute top-0 left-1/3 w-1/3 h-1/3 rounded-full" style={{ background: hairColor, boxShadow: `0 0 35px ${hairColor}`}}></div>
                            </div>
                        </>
                    )}
                    
                    {activeSource === 'upload' && (
                        <div className="text-gray-500">Image Preview</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AvatarCustomizationContent;
