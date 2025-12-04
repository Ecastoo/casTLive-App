
import React from 'react';
import { UserProfile } from '../../types';

// Mock data for the profile
const userProfile: UserProfile = {
  name: 'Orion_Nebula',
  avatarGradient: 'bg-gradient-radial from-purple-500 via-pink-500 to-gray-900',
  isVip: true,
  streak: 128,
  followers: 78300,
  giftsSent: 18500,
  club: 'Stardust Crusaders',
  // FIX: Add missing properties to conform to UserProfile type.
  joined: 'Joined 3 months ago',
  stardustSent: 45000,
  color: 'text-pink-400',
};

const StatPill: React.FC<{ icon: React.ReactElement; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800/50 w-full sm:w-auto flex-1">
    <div className="flex items-center gap-2 text-cyan-400">
      {icon}
      <span className="text-sm font-semibold text-gray-400">{label}</span>
    </div>
    <p className="text-xl font-bold text-white mt-1">{value}</p>
  </div>
);

const ProfileCosmicBackground: React.FC = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        {[...Array(30)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 opacity-0"
                style={{
                    left: `${Math.random() * 100}%`,
                    animation: `profile-aurora-particles linear infinite`,
                    animationDuration: `${Math.random() * 15 + 10}s`,
                    animationDelay: `${Math.random() * 25}s`,
                }}
            />
        ))}
    </div>
);


const ProfileContent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] w-full animate-fade-in p-4">
      <ProfileCosmicBackground />

      <main className="relative z-10 flex flex-col items-center text-center">
        {/* Interactive Avatar */}
        <div className="group relative mb-4" style={{ perspective: '1000px' }}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-pink-500 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-slow-spin"></div>
            <div 
                className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full ${userProfile.avatarGradient} border-4 border-gray-800/50 shadow-2xl transition-transform duration-500 ease-out group-hover:[transform:rotateY(15deg)]`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Particle Ripple Effect on Hover */}
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover:animate-[particle-avatar-ripple_0.7s_ease-out]"
                    style={{ animationDelay: `${i * 0.05}s` }}></div>
                ))}
            </div>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-center gap-3 mb-2">
            {userProfile.isVip && (
                <div className="px-2 py-0.5 text-xs font-bold text-yellow-300 bg-yellow-900/50 border border-yellow-500/50 rounded-full text-glow animate-[vip-halo-pulse_3s_ease-in-out_infinite]">
                    VIP
                </div>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-glow">{userProfile.name}</h2>
        </div>
        
        <div className="flex items-center gap-2 text-orange-400 font-semibold mb-6 text-glow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45.385c-.345.675-.866 1.62-1.348 2.536-1.036 1.95-2.523 4.58-3.413 6.942-.98 2.52-1.82 5.4-1.82 7.598h13.25a1 1 0 00.97-1.216c-.11-1.144-.4-3.13-1.02-5.438-1.08-3.96-2.61-7.55-3.413-9.598C13.261 4.173 12.74 3.228 12.395 2.553zM8.5 15a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" /></svg>
            <span>{userProfile.streak} Day Streak</span>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl mb-8">
            <StatPill label="Followers" value={userProfile.followers.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
            <StatPill label="Gifts Sent" value={`${userProfile.giftsSent.toLocaleString()} ʚɞ`} icon={<span className="text-xl font-serif text-pink-400">ʚɞ</span>}/>
            <StatPill label="Club" value={userProfile.club} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.314-2.01 6.138-4.828 7.343" /></svg>} />
        </div>

        {/* Edit Button */}
        <button 
            className="relative px-8 py-3 font-semibold text-white bg-black/30 border-2 border-cyan-400/50 rounded-lg backdrop-blur-sm transition-all duration-300"
            // FIX: Cast the style object to React.CSSProperties to allow custom CSS variables like '--glow-color-1', resolving the TypeScript error.
            style={{ 
                '--glow-color-1': 'rgba(6, 182, 212, 0.7)', // cyan-500
                '--glow-color-2': 'rgba(236, 72, 153, 0.5)', // pink-500
                animation: `aurora-pulse-button 4s ease-in-out infinite`
            } as React.CSSProperties}
        >
            Edit Profile
        </button>
      </main>
    </div>
  );
};

export default ProfileContent;
