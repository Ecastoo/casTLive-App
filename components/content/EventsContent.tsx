import React, { useState, useEffect, useRef, useCallback } from 'react';

type FeedItemType = 'live' | 'post' | 'highlight';
interface FeedItem {
  id: number;
  type: FeedItemType;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  image?: string;
}

const initialFeedItems: FeedItem[] = [
    { id: 1, type: 'live', author: 'Orion_Nebula', avatar: 'bg-gradient-radial from-purple-500 via-pink-500', content: 'Exploring the Crystal Caves of Xylos!', timestamp: 'LIVE NOW' },
    { id: 2, type: 'post', author: 'Galaxina', avatar: 'bg-gradient-radial from-blue-600 via-cyan-400', content: 'Just discovered a new cosmic phenomenon. The universe is full of wonders!', timestamp: '2 hours ago', image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop' },
    { id: 3, type: 'highlight', author: 'Comet_Chaser', avatar: 'bg-gradient-radial from-yellow-500 via-orange-600', content: 'Highlight: Epic finale of last night\'s Galactic Race!', timestamp: '8 hours ago' },
];

const moreFeedItems: FeedItem[] = [
    { id: 4, type: 'post', author: 'Stardust_Seeker', avatar: 'bg-gradient-radial from-pink-500 via-red-500', content: 'Check out this stunning view from my observatory deck.', timestamp: '1 day ago', image: 'https://images.unsplash.com/photo-1446776811953-b23d579424c1?q=80&w=2072&auto=format&fit=crop' },
    { id: 5, type: 'live', author: 'Supernova_Surfer', avatar: 'bg-gradient-radial from-red-600 via-yellow-400', content: 'Surfing solar flares! Don\'t try this at home.', timestamp: 'LIVE NOW' },
    { id: 6, type: 'highlight', author: 'Galaxina', avatar: 'bg-gradient-radial from-blue-600 via-cyan-400', content: 'That time we outsmarted the black hole bandits.', timestamp: '2 days ago' },
];

const ReactionBar = () => (
    <div className="absolute bottom-4 right-4 flex items-center space-x-3 bg-gray-900/50 backdrop-blur-sm p-2 rounded-full border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="text-gray-300 hover:text-pink-400 transition-colors transform hover:scale-125"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></button>
        <button className="text-gray-300 hover:text-cyan-400 transition-colors transform hover:scale-125"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></button>
        <button className="text-gray-300 hover:text-yellow-400 transition-colors transform hover:scale-125 text-2xl font-serif">ʚɞ</button>
    </div>
);

const FeedCard: React.FC<{ item: FeedItem }> = ({ item }) => {
    const isLive = item.type === 'live';
    return (
        <div className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/80 rounded-2xl overflow-hidden animate-fade-in ${isLive ? 'border-pink-500/50 shadow-[0_0_15px_theme(colors.pink.500/0.3)]' : ''}`}>
            {isLive && (
                <div className="absolute top-4 left-4 bg-black/50 text-pink-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 z-10 border border-pink-500/50 animate-[pulse-glow_3s_ease-in-out_infinite]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                    </span>
                    LIVE
                </div>
            )}
            <div className="p-5">
                <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 ${item.avatar} box-glow text-cyan-500/50`}></div>
                    <div>
                        <p className="font-bold text-white">{item.author}</p>
                        <p className={`text-xs ${isLive ? 'text-pink-400 font-bold text-glow' : 'text-gray-400'}`}>{item.timestamp}</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-300">{item.content}</p>
            </div>
            {item.image && <img src={item.image} alt="Post content" className="w-full h-64 object-cover" />}
            <ReactionBar />
        </div>
    );
};

const ParticleRibbon: React.FC = () => (
    <div className="absolute inset-y-0 right-0 w-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/50 via-pink-500/50 to-purple-600/50 animate-[particle-ribbon-flow_4s_linear_infinite]" style={{ backgroundSize: '100% 300%' }}></div>
        {[...Array(10)].map((_,i) => (
            <div key={i} className="absolute h-1 w-1 bg-white rounded-full animate-[particle-float_5s_infinite]" style={{
                left: `${Math.random() * 80 - 40}%`,
                animationDelay: `${Math.random() * 5}s`
            }}></div>
        ))}
    </div>
);

const TopContributors: React.FC = () => (
    <div className="hidden lg:block w-80 flex-shrink-0 ml-8">
        <div className="sticky top-8 bg-gray-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-glow text-cyan-300 mb-6 text-center">Top Contributors</h3>
            <div className="space-y-4">
                {['Cosmo_King', 'Stellar_Queen', 'Void_Walker'].map((name, index) => (
                    <div key={name} className="relative flex items-center space-x-4 bg-gray-800/50 p-3 rounded-lg overflow-hidden">
                        <span className="text-lg font-bold text-cyan-400">{index + 1}</span>
                        <div className={`w-10 h-10 rounded-full flex-shrink-0 ${initialFeedItems[index].avatar}`}></div>
                        <p className="font-semibold text-white">{name}</p>
                        <ParticleRibbon />
                    </div>
                ))}
            </div>
        </div>
    </div>
);


const CosmicFeedContent: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>(initialFeedItems);
  const [isLoading, setIsLoading] = useState(false);
  const mainContentRef = useRef<HTMLElement | null>(null);

  const loadMoreItems = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setItems(prevItems => [...prevItems, ...moreFeedItems.map(item => ({...item, id: prevItems.length + item.id}))]);
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  useEffect(() => {
    mainContentRef.current = document.getElementById('main-content');
    const mainEl = mainContentRef.current;
    
    const handleScroll = () => {
      if (!mainEl) return;
      const { scrollTop, scrollHeight, clientHeight } = mainEl;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreItems();
      }
    };
    
    if (mainEl) {
        mainEl.addEventListener('scroll', handleScroll);
    }

    return () => {
        if (mainEl) {
            mainEl.removeEventListener('scroll', handleScroll);
        }
    };
  }, [loadMoreItems]);

  return (
    <div className="flex">
        <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                Cosmic Feed
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                A live pulse of the CasTLive universe. Streams, highlights, and community moments, all in one flow.
                </p>
            </div>
            <div className="space-y-8">
                {items.map(item => <FeedCard key={item.id} item={item} />)}
            </div>
            {isLoading && <p className="text-center text-gray-400 mt-8">Loading more cosmic events...</p>}
        </div>
        <TopContributors />
    </div>
  );
};

export default CosmicFeedContent;