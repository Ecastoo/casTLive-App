import React, { useState } from 'react';
import NeonButton from './NeonButton';
import FormField from './FormField';

const GiftIcon: React.FC<{ type: string, color: string }> = ({ type, color }) => {
    const commonClasses = "w-24 h-24";
    const style = { color };

    switch(type) {
        case 'Crystal':
            return <svg style={style} className={commonClasses} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 8.5l10 13.5L22 8.5L12 2zm0 2.33L19.44 12L12 19.67L4.56 12L12 4.33z"/></svg>;
        case 'Star':
            return <svg style={style} className={commonClasses} viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
        case 'Orb':
            return <svg style={style} className={commonClasses} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>;
        default:
            return null;
    }
}

const AuroraEffect: React.FC<{type: string, color: string}> = ({ type, color }) => {
    let effectClass = '';
    switch(type) {
        case 'Stardust Trail':
            effectClass = 'shadow-[0_0_35px_10px]';
            break;
        case 'Nebula Cloud':
            effectClass = 'blur-2xl opacity-60';
            break;
        case 'Aurora Veil':
            effectClass = 'blur-lg opacity-70 animate-aurora-flow';
            break;
    }

    return (
        <div 
            className={`absolute inset-0 w-full h-full rounded-full ${effectClass}`}
            style={{ backgroundColor: color, color: color }}
        ></div>
    )
}

const CustomGiftCreator: React.FC = () => {
    const [giftName, setGiftName] = useState('Cosmic Ray');
    const [giftIcon, setGiftIcon] = useState('Crystal');
    const [giftColor, setGiftColor] = useState('#06b6d4'); // cyan-500
    const [giftEffect, setGiftEffect] = useState('Stardust Trail');

    return (
        <div className="grid lg:grid-cols-2 gap-8 p-6 bg-black/30 backdrop-blur-md border border-gray-800/50 rounded-2xl">
            {/* Live Preview */}
            <div className="relative aspect-square flex items-center justify-center rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-cyan-900/50 to-black bg-[size:200%_200%] animate-[aurora-background-pan_20s_ease_infinite]"></div>
                <div className="relative w-48 h-48 flex items-center justify-center animate-slow-spin">
                    <AuroraEffect type={giftEffect} color={giftColor} />
                    <GiftIcon type={giftIcon} color={giftColor} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-white text-glow" style={{ textShadow: `0 0 10px ${giftColor}` }}>
                        {giftName}
                    </span>
                </div>
            </div>

            {/* Customization Controls */}
            <div className="flex flex-col space-y-6">
                <h3 className="text-2xl font-bold text-glow text-white">Customize Your Gift</h3>
                <FormField label="Gift Name">
                    <input type="text" value={giftName} onChange={(e) => setGiftName(e.target.value)} />
                </FormField>
                 <FormField label="Base Model">
                    <select value={giftIcon} onChange={(e) => setGiftIcon(e.target.value)}>
                        <option>Crystal</option>
                        <option>Star</option>
                        <option>Orb</option>
                    </select>
                </FormField>
                <FormField label="Primary Color">
                    <input type="color" value={giftColor} onChange={(e) => setGiftColor(e.target.value)} className="w-full h-10 p-0" />
                </FormField>
                <FormField label="Cosmic Effect">
                    <select value={giftEffect} onChange={(e) => setGiftEffect(e.target.value)}>
                        <option>Stardust Trail</option>
                        <option>Nebula Cloud</option>
                        <option>Aurora Veil</option>
                    </select>
                </FormField>
                <div className="pt-4 text-center">
                    <NeonButton color="cyan" className="px-8 py-3 text-lg animate-[pulse-glow_4s_ease-in-out_infinite]">
                        Save Gift
                    </NeonButton>
                </div>
            </div>
        </div>
    );
};

export default CustomGiftCreator;
