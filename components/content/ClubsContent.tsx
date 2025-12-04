import React, { useState } from 'react';
import { CosmicClub } from '../../types';
import NeonButton from '../NeonButton';
import ClubCard from '../ClubCard';
import WelcomeClubOverlay from '../WelcomeClubOverlay';

// --- MOCK DATA ---
const sampleClubs: CosmicClub[] = [
  {
    id: 1, name: 'Stardust Crusaders', description: 'For the most dedicated explorers of the cosmos.', memberCount: 1250,
    gradient: 'from-cyan-900 to-blue-900', color: 'cyan',
    topGifters: [
      { name: 'Cosmo_King', amount: 52000 }, { name: 'Void_Walker', amount: 48000 }, { name: 'Stellar_Queen', amount: 45000 }
    ]
  },
  {
    id: 2, name: 'Nebula Nomads', description: 'Wanderers of the galactic clouds and artistic souls.', memberCount: 873,
    gradient: 'from-purple-900 to-pink-900', color: 'pink',
    topGifters: [
      { name: 'Galaxina', amount: 35000 }, { name: 'Comet_Chaser', amount: 31000 }, { name: 'Star_Painter', amount: 28000 }
    ]
  },
  {
    id: 3, name: 'Supernova Surfers', description: 'Adrenaline junkies who ride the solar winds.', memberCount: 2401,
    gradient: 'from-orange-900 to-yellow-900', color: 'yellow',
    topGifters: [
      { name: 'Solar_Flare', amount: 68000 }, { name: 'Rocket_Man', amount: 65000 }, { name: 'Gravity_Goddess', amount: 59000 }
    ]
  }
];

// --- MAIN COMPONENT ---
const ClubsContent: React.FC = () => {
    const [joinedClub, setJoinedClub] = useState<CosmicClub | null>(null);

    const handleJoinClub = (club: CosmicClub) => {
        setJoinedClub(club);
    };

    const handleCloseOverlay = () => {
        setJoinedClub(null);
    };

    return (
        <div className="animate-fade-in max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400 mb-4">
                    Cosmic Clubs
                </h2>
                <p className="text-lg text-gray-300">
                    Find your constellation. Join a community or create your own.
                </p>
            </div>

            <div className="flex justify-center gap-4 mb-10">
                <NeonButton color="pink" className="relative px-6 py-3">
                    <span className="relative z-10">Create Club</span>
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-slow-spin"></div>
                </NeonButton>
                 <NeonButton color="cyan" className="relative px-6 py-3">
                    <span className="relative z-10">Join Private Club</span>
                     <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-cyan-600 via-blue-600 to-green-600 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-slow-spin"></div>
                </NeonButton>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleClubs.map(club => (
                    <ClubCard key={club.id} club={club} onJoin={handleJoinClub} />
                ))}
            </div>

            {joinedClub && (
                <WelcomeClubOverlay club={joinedClub} onClose={handleCloseOverlay} />
            )}
        </div>
    );
};

export default ClubsContent;