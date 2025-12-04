import React, { useState } from 'react';
import NeonButton from '../NeonButton';
import FloatingGiftPanel from '../FloatingGiftPanel';
import { ChatMessage, User } from '../../types';
import ChatMessageBubble from '../ChatMessageBubble';
import MiniProfileOverlay from '../MiniProfileOverlay';

const users: { [key: string]: User } = {
  orion: { name: 'Orion_Nebula', avatarGradient: 'bg-gradient-radial from-purple-500 via-pink-500', isVip: true, joined: 'Joined 3 months ago', stardustSent: 18500, color: 'text-pink-400' },
  stardust: { name: 'Stardust_Seeker', avatarGradient: 'bg-gradient-radial from-blue-600 via-cyan-400', isVip: false, joined: 'Joined 1 year ago', stardustSent: 7200, color: 'text-cyan-400' },
  galaxina: { name: 'Galaxina', avatarGradient: 'bg-gradient-radial from-pink-500 via-red-500', isVip: false, joined: 'Joined 2 weeks ago', stardustSent: 1200, color: 'text-purple-400' },
  comet: { name: 'Comet_Chaser', avatarGradient: 'bg-gradient-radial from-yellow-500 via-orange-600', isVip: true, joined: 'Joined 8 months ago', stardustSent: 45000, color: 'text-yellow-400' },
};

const sampleMessages: ChatMessage[] = [
  { id: 1, user: users.orion, message: 'Welcome to the stream, cosmic voyagers! The energy is electric tonight.' },
  { id: 2, user: users.stardust, message: 'This is amazing! The view from this sector is incredible.' },
  { id: 3, user: users.galaxina, message: 'Loving the vibes in here. ✨ So glad I tuned in!' },
  { id: 4, user: users.comet, message: 'Hey everyone! Just warping in. Did I miss the supernova?' },
  { id: 5, user: users.orion, message: "Not yet, Comet_Chaser! You're just in time. We're about to approach the pulsar." },
];

const ChatContent: React.FC = () => {
  const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
          Cosmic Chat
        </h2>
      </div>
      
      <div className="flex-grow bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 flex flex-col">
        {/* Message Area */}
        <div id="chat-messages" className="flex-grow space-y-4 overflow-y-auto pr-2">
          {sampleMessages.map((msg) => (
             <ChatMessageBubble key={msg.id} message={msg} onAvatarClick={setSelectedUser} />
          ))}
        </div>

        {/* Input Area */}
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-4">
          <div className="relative w-full group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-cyan-600 rounded-lg blur opacity-0 group-focus-within:opacity-75 transition duration-1000 group-focus-within:duration-200 animate-tilt"></div>
            <input 
              type="text" 
              placeholder="Send a message in the cosmos..."
              className="relative w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-0 transition-all"
            />
          </div>
          <NeonButton 
            color="cyan"
            className="px-4 py-2"
          >
            Chat
          </NeonButton>
          <div className="relative">
            <NeonButton 
              color="pink"
              className="px-4 py-2 text-xl font-serif"
              onClick={() => setIsGiftPanelOpen(!isGiftPanelOpen)}
            >
              ʚɞ
            </NeonButton>
          </div>
        </div>
      </div>
      
      <FloatingGiftPanel 
        isOpen={isGiftPanelOpen}
        onClose={() => setIsGiftPanelOpen(false)}
      />

      {selectedUser && (
        <MiniProfileOverlay 
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default ChatContent;