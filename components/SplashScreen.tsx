import React, { useState } from 'react';
import NeonButton from './NeonButton';

interface SplashScreenProps {
  onStartJourney: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStartJourney }) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    // Delay to allow button animation to be seen before fading out
    setTimeout(() => {
      onStartJourney();
    }, 1000); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative z-10 animate-fade-in p-4 animate-aurora-flow">
        <div className="shooting-star" style={{ animationDelay: '0s' }}></div>
        <div className="shooting-star" style={{ animationDelay: '3s', width: '1px', height: '100px' }}></div>
        <div className="shooting-star" style={{ animationDelay: '7s' }}></div>

      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold text-center text-glow text-cyan-300 tracking-widest uppercase animate-float"
            style={{ filter: 'drop-shadow(0 0 25px hsl(180, 100%, 50%))' }}
        >
            Cas<span className="text-pink-400" style={{ filter: 'drop-shadow(0 0 25px hsl(330, 100%, 70%))' }}>T</span>Live
        </h1>
        <p className="text-lg text-gray-300 text-glow">
          The Ultra Cosmic Master Guide
        </p>
      </div>
      
      <div className="absolute bottom-20">
        <NeonButton 
            color="pink" 
            onClick={handleStart}
            className="px-10 py-4 text-lg"
        >
          {isStarting ? 'Initiating...' : 'Start Journey'}
        </NeonButton>
      </div>
    </div>
  );
};

export default SplashScreen;