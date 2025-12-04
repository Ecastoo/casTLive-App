
import React from 'react';
import { Gift } from '../../types';

const StardustIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>;
const CometIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-12 h-12"><path d="M12.97 4.28a1.5 1.5 0 0 1 2.48 1.48L14.41 12l1.04 6.24a1.5 1.5 0 0 1-2.48 1.48l-8.4-5.25a1.5 1.5 0 0 1 0-2.96l8.4-5.25z" /></svg>;
const NebulaIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-12 h-12"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8a5 5 0 0 0 5 5V7a5 5 0 0 0-5 5z" opacity=".3" /><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /><path d="M12 7v10a5 5 0 0 1 0-10z" /></svg>;
const WhaleIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-12 h-12"><path d="M20.57 14.86c-1.39-1.42-3.5-2.22-5.71-2.22h-1.57c-.88 0-1.71.28-2.42.79-2.03 1.43-3.75 3.19-5.06 5.16l-.3.45c-.3.45-.11 1.08.34 1.37.45.3.99.11 1.28-.34l.3-.45c1.1-1.68 2.5-3.19 4.25-4.45.4-.28.87-.44 1.36-.44h1.57c3.1 0 5.67-1.29 7.03-2.65.17-.17.27-.4.27-.64s-.1-.47-.27-.64zm-8.8-10.43L11.7 5c-1.12.63-2.09 1.49-2.88 2.5.34.09.68.21 1.02.38-1.54 1.14-2.73 2.66-3.51 4.39-.43-1.07-.63-2.19-.63-3.34 0-1.33.32-2.61.92-3.77.72-1.39 1.77-2.58 3.09-3.53z" /></svg>;


const gifts: Gift[] = [
  { name: 'Stardust Sparkle', price: 10, icon: <StardustIcon />, animation: 'A shower of tiny, glittering particles.', color: 'yellow' },
  { name: 'Comet\'s Kiss', price: 50, icon: <CometIcon />, animation: 'A swift, glowing comet streaks across the screen.', color: 'cyan' },
  { name: 'Nebula Bloom', price: 250, icon: <NebulaIcon />, animation: 'A beautiful nebula cloud gently unfurls and fades.', color: 'purple' },
  { name: 'Galactic Whale', price: 1000, icon: <WhaleIcon />, animation: 'A majestic, ethereal whale made of stars swims gracefully.', color: 'indigo' },
];

const GiftCard: React.FC<{ gift: Gift }> = ({ gift }) => {
  const colorClasses = {
    yellow: 'border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/10 box-glow',
    cyan: 'border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 box-glow',
    purple: 'border-purple-400/50 text-purple-300 hover:bg-purple-500/10 box-glow',
    indigo: 'border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/10 box-glow',
  }[gift.color] || '';

  return (
    <div className={`p-6 bg-gray-900/50 backdrop-blur-sm border ${colorClasses} rounded-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center space-y-4`}>
      <div className="animate-float">{gift.icon}</div>
      <h4 className="text-xl font-bold tracking-wide">{gift.name}</h4>
      <div className="flex items-center font-semibold text-lg">
        <span>{gift.price}</span>
        <span className="ml-2 text-2xl font-serif text-pink-400">ʚɞ</span>
      </div>
      <p className="text-sm text-gray-400 h-12">{gift.animation}</p>
    </div>
  );
};

const EconomyContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
          The ʚɞ Economy
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Our universe is powered by ʚɞ (Stardust), a currency that translates support into stunning visual experiences. Gifting is an art form here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gifts.map(gift => <GiftCard key={gift.name} gift={gift} />)}
      </div>

      <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl">
        <h3 className="text-2xl font-semibold mb-4 text-glow text-cyan-300">How It Works</h3>
        <p className="text-gray-300">
          Viewers purchase ʚɞ and can send gifts to creators during live experiences. Each gift triggers a unique, cinematic animation that becomes part of the broadcast, visible to everyone. This system allows for direct, impactful support that enhances the show itself.
        </p>
      </div>
    </div>
  );
};

export default EconomyContent;
