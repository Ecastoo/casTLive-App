import React from 'react';
import { ChatMessage, User } from '../types';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onAvatarClick: (user: User) => void;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, onAvatarClick }) => {
  const { user, message: text } = message;

  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
      const bubble = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(bubble.clientWidth, bubble.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - bubble.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${event.clientY - bubble.getBoundingClientRect().top - radius}px`;
      circle.classList.add("ripple");

      const ripple = bubble.getElementsByClassName("ripple")[0];
      if (ripple) ripple.remove();
      
      bubble.appendChild(circle);
  };

  return (
    <div className="flex items-start gap-3 group animate-fade-in">
      {/* Avatar */}
      <div className="relative flex-shrink-0 cursor-pointer" onClick={() => onAvatarClick(user)}>
        <div className={`w-10 h-10 rounded-full ${user.avatarGradient}`} />
        {user.isVip && (
          <div className="absolute -inset-0.5 rounded-full animate-[vip-halo-pulse_2s_ease-in-out_infinite] pointer-events-none"></div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-grow">
        <p className={`font-bold text-sm ${user.color}`}>{user.name}</p>
        <div 
            className="relative inline-block mt-1 p-3 rounded-xl rounded-tl-none bg-black/40 backdrop-blur-sm overflow-hidden"
            onMouseEnter={createRipple}
        >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_hsla(280,50%,50%,0.2),_transparent_70%),_radial-gradient(circle_at_30%_70%,_hsla(180,50%,50%,0.2),_transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity"></div>
             <div className="absolute inset-0 border border-white/10 rounded-xl rounded-tl-none box-border"></div>
            <span className="relative text-sm text-gray-200 break-words">{text}</span>
            {/* FIX: Removed invalid 'jsx' prop from style tag. This syntax is for styled-jsx (a Next.js feature) and is not compatible with standard React TypeScript projects. */}
            <style>{`
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 600ms linear;
                    background-color: rgba(255, 255, 255, 0.2);
                }
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;