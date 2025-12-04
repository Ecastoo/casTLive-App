import React, { useState, useEffect, useRef } from 'react';
import { Conversation, User, DirectMessage } from '../../types';
import NeonButton from '../NeonButton';
import TypingIndicator from '../TypingIndicator';

// --- MOCK DATA ---
const users: { [key: string]: User } = {
  orion: { name: 'Orion_Nebula', avatarGradient: 'bg-gradient-radial from-purple-500 via-pink-500', isVip: true, joined: 'Joined 3 months ago', stardustSent: 18500, color: 'text-pink-400' },
  stardust: { name: 'Stardust_Seeker', avatarGradient: 'bg-gradient-radial from-blue-600 via-cyan-400', isVip: false, joined: 'Joined 1 year ago', stardustSent: 7200, color: 'text-cyan-400' },
  comet: { name: 'Comet_Chaser', avatarGradient: 'bg-gradient-radial from-yellow-500 via-orange-600', isVip: true, joined: 'Joined 8 months ago', stardustSent: 45000, color: 'text-yellow-400' },
};

const initialConversations: Conversation[] = [
  { id: 1, participant: users.orion, isTyping: true, messages: [
      { id: 1, sender: users.orion, text: "Hey! Just saw your highlight from the Galactic Race, incredible flying!", timestamp: "10:32 AM" },
      { id: 2, sender: 'self', text: "Thanks! It was a close one. The asteroid field was tricky.", timestamp: "10:33 AM" },
    ]},
  { id: 2, participant: users.comet, isTyping: false, messages: [
      { id: 1, sender: users.comet, text: "Got your coordinates for the Nebula Gala next week?", timestamp: "Yesterday" },
    ]},
  { id: 3, participant: users.stardust, isTyping: false, messages: [
      { id: 1, sender: users.stardust, text: "Loved the custom gift you designed! So cool.", timestamp: "2 days ago" },
      { id: 2, sender: 'self', text: "Glad you liked it! Was fun to make in the Creator Studio.", timestamp: "2 days ago" },
    ]},
];

// --- SUB-COMPONENTS ---
const ConversationListItem: React.FC<{ conv: Conversation; isActive: boolean; onClick: () => void; }> = ({ conv, isActive, onClick }) => {
  const lastMessage = conv.messages[conv.messages.length - 1];
  return (
    <button onClick={onClick} className={`relative group w-full text-left p-3 flex items-center gap-4 rounded-lg transition-all duration-300 ${isActive ? 'bg-cyan-500/10' : 'hover:bg-white/5'}`}>
      <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
      <div className="relative flex-shrink-0">
        <div className={`w-12 h-12 rounded-full ${conv.participant.avatarGradient}`}></div>
        {conv.participant.isVip && <div className="absolute -inset-0.5 rounded-full animate-[vip-halo-pulse_2s_ease-in-out_infinite]"></div>}
      </div>
      <div className="relative flex-grow overflow-hidden">
        <p className={`font-bold truncate ${conv.participant.color}`}>{conv.participant.name}</p>
        <p className="text-sm text-gray-400 truncate">{conv.isTyping ? <span className="italic text-cyan-400">typing...</span> : (lastMessage?.sender === 'self' ? 'You: ' : '') + lastMessage?.text}</p>
      </div>
    </button>
  );
};

const DMMessageBubble: React.FC<{ msg: DirectMessage }> = ({ msg }) => {
  const isSelf = msg.sender === 'self';
  return (
    <div className={`flex items-end gap-2 ${isSelf ? 'justify-end' : 'justify-start'}`}>
      {!isSelf && <div className={`w-8 h-8 rounded-full flex-shrink-0 ${(msg.sender as User).avatarGradient}`}></div>}
      <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isSelf ? 'bg-cyan-600/50 rounded-br-none' : 'bg-gray-800/60 rounded-bl-none'}`}>
        <p className="text-white text-sm">{msg.text}</p>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const DMsContent: React.FC = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState<number | null>(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConvId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation]);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 mb-4">
          Direct Messages
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[65vh]">
        {/* Conversation List */}
        <div className="md:col-span-1 lg:col-span-1 bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-3 space-y-2 overflow-y-auto">
          {conversations.map(conv => (
            <ConversationListItem 
              key={conv.id} 
              conv={conv}
              isActive={conv.id === activeConvId}
              onClick={() => setActiveConvId(conv.id)}
            />
          ))}
        </div>

        {/* Active Chat */}
        <div className="md:col-span-2 lg:col-span-3 bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl flex flex-col">
          {activeConversation ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-700/50 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${activeConversation.participant.avatarGradient}`}></div>
                <h3 className={`text-lg font-bold ${activeConversation.participant.color}`}>{activeConversation.participant.name}</h3>
              </div>

              {/* Messages */}
              <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {activeConversation.messages.map(msg => <DMMessageBubble key={msg.id} msg={msg} />)}
                {activeConversation.isTyping && (
                  <div className="flex items-end gap-2 justify-start">
                     <div className={`w-8 h-8 rounded-full flex-shrink-0 ${activeConversation.participant.avatarGradient}`}></div>
                     <TypingIndicator />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700/50 flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                <button className="p-2 text-gray-400 hover:text-pink-400 transition-colors text-xl font-serif">ʚɞ</button>
                <input type="text" placeholder="Send a direct message..." className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all" />
                <NeonButton color="cyan" className="px-5 py-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg></NeonButton>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500">
              <p>Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DMsContent;
