import React from 'react';
import { CosmicClub } from '../types';
import NeonButton from './NeonButton';

interface ClubCardProps {
    club: CosmicClub;
    onJoin: (club: CosmicClub) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onJoin }) => {
    const colorClass = `text-${club.color}-400`;
    
    return (
        <div className={`relative group bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-800 flex flex-col transition-all duration-300 animate-float`} style={{animationDelay: `${club.id * 0.2}s`}}>
            {/* Hover Aura Effect */}
            <div 
                className={`absolute -inset-px rounded-2xl ${club.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse-aura_4s_ease-in-out_infinite]`}
                style={{
                    background: `radial-gradient(circle at 70% 30%, var(--tw-gradient-from), transparent 60%), radial-gradient(circle at 30% 80%, var(--tw-gradient-to), transparent 50%)`,
                }}
            ></div>
            <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorClass} animate-[pulse-aura_4s_ease-in-out_infinite]`}></div>


            <div className="relative z-10 flex-grow">
                <h3 className={`text-2xl font-bold mb-2 text-glow ${colorClass}`}>{club.name}</h3>
                <p className="text-sm text-gray-400 mb-4 h-10">{club.description}</p>
                <div className="text-sm text-gray-300 mb-6">
                    <span className="font-semibold">{club.memberCount.toLocaleString()}</span> Members
                </div>

                {/* Top Gifters Leaderboard */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-2">Top Gifters</h4>
                    <div className="space-y-2">
                        {club.topGifters.map((gifter, index) => (
                             <div key={gifter.name} className="flex items-center justify-between text-xs bg-black/30 p-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-gray-400 w-4">{index + 1}</span>
                                    <span className="font-medium text-white">{gifter.name}</span>
                                </div>
                                <span className="font-bold text-pink-400 text-glow">{gifter.amount.toLocaleString()} ʚɞ</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-6 text-center">
                <NeonButton color={club.color as 'cyan' | 'pink'} onClick={() => onJoin(club)}>
                    Join Constellation
                </NeonButton>
            </div>
        </div>
    );
};

export default ClubCard;