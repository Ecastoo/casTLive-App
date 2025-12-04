
import React from 'react';

const PromptBlock: React.FC<{ title: string; prompt: string }> = ({ title, prompt }) => (
  <div className="p-4 bg-black/50 border border-gray-700 rounded-lg">
    <h4 className="text-lg font-semibold text-cyan-300 mb-2">{title}</h4>
    <code className="block text-sm text-pink-300 bg-gray-900 p-3 rounded whitespace-pre-wrap selection:bg-pink-500/50">
      {prompt}
    </code>
  </div>
);

const AIPromptsContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400 mb-4">
          AI Prompts
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          At the heart of CasTLive is a powerful generative AI. Here are examples of the prompts that shape the visuals of our universe.
        </p>
      </div>

      <div className="space-y-6">
        <PromptBlock
          title="Creator Avatars"
          prompt={`a celestial being, face made of swirling galaxy, cosmic dust for hair, wearing crystalline armor that refracts starlight, hyper-realistic, 8k, cinematic lighting, epic composition`}
        />
        <PromptBlock
          title="Live Backgrounds"
          prompt={`panoramic view of a bioluminescent alien forest at night, two moons in the sky casting an ethereal glow, floating islands, flora pulsing with soft light, aurora borealis, atmospheric, concept art`}
        />
        <PromptBlock
          title="Gift Animations (Supernova)"
          prompt={`visual effect for a 'supernova' gift: starts as a small bright star, rapidly expands into a vibrant, multi-colored explosion of light and particles, then collapses, leaving a shimmering, slowly rotating nebula cloud in its place`}
        />
        <PromptBlock
          title="Interactive Events"
          prompt={`Generate a random cosmic event: a meteor shower with trailing neon particles. Allow viewers to click on meteors to trigger small 'stardust' explosions. Make 1 in 100 meteors a rare 'crystal meteor' with a unique visual effect.`}
        />
      </div>
    </div>
  );
};

export default AIPromptsContent;
