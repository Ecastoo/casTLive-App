import React from 'react';
import NeonButton from '../NeonButton';

const ShowcaseCard: React.FC<{title: string, description: string}> = ({title, description}) => (
    <div className="group relative p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-slow-spin"></div>
        <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2 text-glow text-white">{title}</h4>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);


const UIShowcaseContent: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400 mb-4">
          UI/UX Showcase
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Every interaction is designed to be cinematic and intuitive. Our UI is part of the experience, not just an overlay.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-6 text-glow text-white text-center">Interactive Elements</h3>
        <div className="flex justify-center items-center gap-6 p-8 bg-gray-900/50 rounded-xl border border-gray-700">
            <NeonButton color="cyan">Engage</NeonButton>
            <NeonButton color="pink">Subscribe</NeonButton>
        </div>
        <p className="text-center text-gray-400 mt-4">Buttons with hover-activated neon glows and ripple effects.</p>
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-glow text-white text-center">Card Components</h3>
        <div className="grid md:grid-cols-2 gap-6">
           <ShowcaseCard title="Hover-Activated Borders" description="Cards come alive on interaction, with animated gradients and glows to draw focus." />
           <ShowcaseCard title="Glassmorphism" description="Semi-transparent, blurred backgrounds create a sense of depth against the cosmic backdrop." />
        </div>
      </div>

       <div>
        <h3 className="text-2xl font-semibold mb-6 text-glow text-white text-center">Cursor Effects</h3>
        <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-700">
           <p className="text-center text-gray-300">Move your cursor around the screen. The "Comet Trail" effect provides constant visual feedback, making navigation feel magical and integrated into the cosmic theme.</p>
        </div>
      </div>
    </div>
  );
};

export default UIShowcaseContent;