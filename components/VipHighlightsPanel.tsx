import React, { useState } from 'react';
import { HighlightedUser } from '../types';
import VipMiniOverlay from './VipMiniOverlay';

const PhoenixIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19 10c-1.14 0-2.2.39-3 1.03V8c0-3.31-2.69-6-6-6S4 4.69 4 8v5.17c-.41.22-.78.51-1.1.86C2.32 14.54 2 15.22 2 16c0 1.66 1.34 3 3 3 .55 0 1.07-.15 1.5-.42.93 1.22 2.36 2.01 4 2.32V22h2v-1.11c1.64-.31 3.07-1.1 4-2.32.43.27.95.42 1.5.42 1.66 0 3-1.34 3-3 0-.78-.32-1.46-.89-1.97-.24-.22-.51-.4-.79-.55.08-.2.13-.41.17-.63.09-.43.13-.86.13-1.3C22 11.34 20.66 10 19 10z"/></svg>;
const LeviathanIcon: React.FC<{className?: string}> = ({className}) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.57 14.86c-1.39-1.42-3.5-2.22-5.71-2.22h-1.57c-.88 0-1.71.28-2.42.79-2.03 1.43-3.75 3.19-5.06 5.16l-.3.45c-.3.45-.11 1.08.34 1.37.45.3.99.11 1.28-.34l.3-.45c1.1-1.68 2.5-3.19 4.25-4.45.4-.28.87-.44 1.36-.44h1.57c3.1 0 5.67-1.29 7.03-2.65.17-.17.27-.4.27-.64s-.1-.47-.27-.64zm-8.8-10.43L11.7 5c-1.12.63-2.09 1.49-2.88 2.5.34.09.68.21 1.02.38-1.54 1.14-2.73 2.66-3.51 4.39-.43-1.07-.63-2.19-.63-3.34 0-1.33.32-2.61.92-3.77.72-1.39 1.77-2.58 3.09-3.53z"/></svg>;

const mockUsers: HighlightedUser[] = [
    { id: 1, name: 'Cosmo_King', avatarGradient: 'bg-gradient-radial from-yellow-400 via-orange-500', status: 'VIP', streak: 12, color: 'yellow', position: { top: '15%', left: '10%' },
      recentGifts: [{name: 'Phoenix', icon: <PhoenixIcon className="w-5 h-5" />}, {name: 'Leviathan', icon: <LeviathanIcon className="w-5 h-5" />} ],
      perks: [{name: 'Custom Badge', icon: <></>}, {name: 'Glow Effect', icon: <></>}]},
    { id: 2, name: 'Stellar_Queen', avatarGradient: 'bg-gradient-radial from-pink-400 via-purple-500', status: 'VIP', streak: 25, color: 'pink', position: { top: '65%', left: '5%' },
      recentGifts: [{name: 'Leviathan', icon: <LeviathanIcon className="w-5 h-5" />}],
      perks: [{name: 'Custom Badge', icon: <></>}]},
    { id: 3, name: 'Void_Walker', avatarGradient: 'bg-gradient-radial from-indigo-500 via-blue-600', status: 'Top Gifter', streak: 8, color: 'indigo', position: { top: '15%', left: '80%' },
      recentGifts: [{name: 'Phoenix', icon: <PhoenixIcon className="w-5 h-5" />}],
      perks: []},
    { id: 4, name: 'Comet_Chaser', avatarGradient: 'bg-gradient-radial from-cyan-400 via-teal-500', status: 'Top Gifter', streak: 31, color: 'cyan', position: { top: '65%', left: '85%' },
      recentGifts: [{name: 'Leviathan', icon: <LeviathanIcon className="w-5 h-5" />}],
      perks: []},
];

const CosmicBadge: React.FC<{user: HighlightedUser, onClick: () => void}> = ({ user, onClick }) => {
    return (
        <div 
            className="absolute group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
            style={{ top: user.position.top, left: user.position.left }}
            onClick={onClick}
        >
            <div className="relative w-16 h-16 md:w-20 md:h-20 animate-[badge-float_8s_ease-in-out_infinite]" style={{ animationDelay: `${user.id * 0.5}s` }}>
                <div className={`absolute inset-0 rounded-full ${user.avatarGradient} border-2 border-white/20 transition-all duration-300 group-hover:scale-110`}></div>
                <div className={`absolute -inset-1 rounded-full border-2 border-${user.color}-400/50 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_20px_theme(colors.${user.color}.400)] transition-all duration-300`}></div>
                 {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100" style={{
                        animation: `sparkle-pop 0.8s ${i * 0.1}s ease-out`,
                        top: '50%', left: '50%',
                    }}></div>
                ))}
            </div>
            <p className={`text-center text-xs font-bold mt-2 text-${user.color}-400 text-glow opacity-80 group-hover:opacity-100 transition-opacity`}>{user.name}</p>
        </div>
    );
};

const VipHighlightsPanel: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<HighlightedUser | null>(null);

    return (
        <div className="relative mt-16">
            <h3 className="text-3xl font-bold tracking-tighter text-glow text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">VIP Highlights</h3>
            <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto bg-black/20 rounded-3xl border border-gray-800/50 overflow-hidden">
                {/* Cosmic Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-radial from-gray-800 via-gray-900 to-black animate-[pulse-glow_5s_ease-in-out_infinite] border-2 border-cyan-500/30"></div>
                </div>

                {/* Aurora Trails */}
                <svg className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {mockUsers.map(user => (
                        <path 
                            key={user.id}
                            d={`M 50% 50% C 50% 50%, ${user.position.left} ${user.position.top}, ${user.position.left} ${user.position.top}`}
                            className={`stroke-current text-${user.color}-500/40`}
                            strokeWidth="2"
                            strokeDasharray="10 15"
                            style={{ animation: 'aurora-trail-flow 30s linear infinite' }}
                        />
                    ))}
                </svg>

                {/* Badges */}
                {mockUsers.map(user => (
                    <CosmicBadge key={user.id} user={user} onClick={() => setSelectedUser(user)} />
                ))}
            </div>
            {selectedUser && (
                <VipMiniOverlay user={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
        </div>
    );
};

export default VipHighlightsPanel;
