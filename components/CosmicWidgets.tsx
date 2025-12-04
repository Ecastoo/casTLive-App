import React, { useState } from 'react';
import Overlay from './Overlay';

// Data placeholders
const trendingStreams = [
  { name: 'Orion_Nebula', game: 'Starfield Odyssey' },
  { name: 'Galaxina', game: 'Cosmic Craft' },
  { name: 'Void_Walker', game: 'Black Hole Escape' },
];

const topGifters = [
  { name: 'Cosmo_King', amount: '150,000 ʚɞ' },
  { name: 'Stellar_Queen', amount: '125,000 ʚɞ' },
  { name: 'Comet_Chaser', amount: '98,000 ʚɞ' },
];

const upcomingEvents = [
  { name: 'Galactic Grand Prix', date: 'Tomorrow @ 8 PM CST' },
  { name: 'Creator Constellation Gala', date: 'Next Week' },
  { name: 'Charity Stream: Save the Tribbles', date: 'In 2 Weeks' },
];

interface WidgetTileProps {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
  color: 'cyan' | 'pink' | 'purple';
}

const WidgetTile: React.FC<WidgetTileProps> = ({ title, children, onClick, color }) => {
    const colorClasses = {
        cyan: 'border-cyan-400/50 hover:shadow-[0_0_25px_theme(colors.cyan.400/0.7)] text-cyan-300',
        pink: 'border-pink-400/50 hover:shadow-[0_0_25px_theme(colors.pink.400/0.7)] text-pink-300',
        purple: 'border-purple-400/50 hover:shadow-[0_0_25px_theme(colors.purple.400/0.7)] text-purple-300',
    }[color];
    
    const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
        const tile = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(tile.clientWidth, tile.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - tile.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - tile.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");

        const ripple = tile.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        tile.appendChild(circle);
        
        onClick();
    };

    return (
        <div 
            className={`group relative bg-black/30 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 cursor-pointer overflow-hidden ${colorClasses}`}
            onClick={createRipple}
        >
            <h3 className={`text-2xl font-bold mb-4 text-glow`}>{title}</h3>
            <div className="space-y-3 text-white/80 relative z-10">
                {children}
            </div>
             <style dangerouslySetInnerHTML={{ __html: `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 600ms linear;
                    background-color: rgba(255, 255, 255, 0.2);
                    z-index: 0;
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `}} />
        </div>
    )
};

const CosmicWidgets: React.FC = () => {
    const [overlay, setOverlay] = useState<{ title: string; content: React.ReactNode } | null>(null);

    const handleClose = () => setOverlay(null);

    return (
        <div className="relative py-12">
            <div className="absolute inset-0 overflow-hidden -z-10 rounded-3xl">
                {/* Aurora Background */}
                <div className="absolute inset-0 animate-aurora-flow opacity-30"></div>
                {/* Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-[aurora-particles-float_15s_infinite]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 15}s`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <WidgetTile title="Trending Streams" color="cyan" onClick={() => setOverlay({ title: 'All Trending Streams', content: <p>A detailed list of all trending streams would appear here, with links to join them live.</p> })}>
                    {trendingStreams.map(s => <div key={s.name} className="flex justify-between text-sm"><span className="font-semibold">{s.name}</span> <span className="text-gray-400">{s.game}</span></div>)}
                </WidgetTile>
                
                <WidgetTile title="Top Gifters" color="pink" onClick={() => setOverlay({ title: 'Top Gifters Leaderboard', content: <p>The full leaderboard for top supporters would be displayed here, showcasing their cosmic generosity.</p> })}>
                     {topGifters.map(g => <div key={g.name} className="flex justify-between text-sm"><span className="font-semibold">{g.name}</span> <span className="font-bold text-pink-400">{g.amount}</span></div>)}
                </WidgetTile>

                <WidgetTile title="Upcoming Events" color="purple" onClick={() => setOverlay({ title: 'Full Events Schedule', content: <p>A complete calendar of all upcoming events, creator milestones, and galactic gatherings would be shown here.</p> })}>
                    {upcomingEvents.map(e => <div key={e.name} className="flex justify-between text-sm"><span className="font-semibold">{e.name}</span> <span className="text-gray-400">{e.date}</span></div>)}
                </WidgetTile>
            </div>
            
            <Overlay 
                isOpen={!!overlay} 
                onClose={handleClose} 
                title={overlay?.title || ''}
            >
                {overlay?.content}
            </Overlay>
        </div>
    );
};

export default CosmicWidgets;