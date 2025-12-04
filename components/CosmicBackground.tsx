
import React from 'react';

const CosmicBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div id="stars1" className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-70 animate-[move-twink-back_200s_linear_infinite]"></div>
      <div id="stars2" className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-[move-twink-back_150s_linear_infinite]"></div>
      <div id="stars3" className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-[move-twink-back_100s_linear_infinite]"></div>
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.3), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 191, 255, 0.3), transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 20, 147, 0.2), transparent 50%)
          `,
          animation: 'nebula-pulse 20s ease-in-out infinite'
        }}
      ></div>
      <style>{`
        @keyframes move-twink-back {
            from {background-position:0 0;}
            to {background-position:-10000px 5000px;}
        }
         @keyframes nebula-pulse {
            0% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.1); opacity: 0.6; }
            100% { transform: scale(1); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default CosmicBackground;
