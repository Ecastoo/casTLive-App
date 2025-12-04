import React from 'react';

const TypingIndicator: React.FC = () => {
    return (
        <div className="relative flex items-center gap-2 px-4 py-3 bg-gray-800/60 rounded-2xl rounded-bl-none">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="relative w-2.5 h-2.5 bg-cyan-400 rounded-full" style={{ animation: `bounce 1.4s infinite ${i * 0.2}s` }}>
                     <div className="absolute inset-0" style={{ animation: `sparkle 1.4s infinite ${i * 0.2}s` }}>
                        {[...Array(2)].map((_, s_idx) => (
                             <div key={s_idx} className="absolute w-1 h-1 bg-cyan-300 rounded-full" style={{ animation: `particle-spark 0.7s ease-out forwards`, animationDelay: `${s_idx * 0.3}s`, top: '50%', left: '50%'}}></div>
                        ))}
                    </div>
                </div>
            ))}
            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0.5); opacity: 0.5; }
                    40% { transform: scale(1.0); opacity: 1; }
                }
                 @keyframes sparkle {
                    0%, 70%, 100% { opacity: 0; }
                    40% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default TypingIndicator;
