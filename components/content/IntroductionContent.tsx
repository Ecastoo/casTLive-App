
import React from 'react';
import CosmicWidgets from '../CosmicWidgets';
import VipHighlightsPanel from '../VipHighlightsPanel';

const IntroductionContent: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 mb-4">
          Welcome, Cosmic Voyager
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          You've arrived at the control deck of the CasTLive Universe. Below is a live overview of cosmic activity. Explore trending streams, recognize top supporters, and stay ahead of upcoming events.
        </p>
      </div>

      <CosmicWidgets />
      <VipHighlightsPanel />
      
    </div>
  );
};

export default IntroductionContent;