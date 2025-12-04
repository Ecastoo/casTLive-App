
import React from 'react';

const StatCard: React.FC<{ title: string; value: string; change: string; changeType: 'increase' | 'decrease', color: 'cyan' | 'pink' | 'green' }> = ({ title, value, change, changeType, color }) => {
    const colorClasses = {
        cyan: 'border-cyan-500/50 text-cyan-300',
        pink: 'border-pink-500/50 text-pink-400',
        green: 'border-green-500/50 text-green-400',
    }[color];
    const changeColor = changeType === 'increase' ? 'text-green-400' : 'text-red-400';

    return (
        <div className={`p-6 bg-gray-900/50 backdrop-blur-sm border rounded-xl box-glow ${colorClasses}`}>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
            <div className={`mt-2 flex items-center text-sm ${changeColor}`}>
                {changeType === 'increase' ? (
                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L6.22 8.64a.75.75 0 11-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 11-1.06 1.06L10.75 5.612V16.25a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
                ) : (
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.03-3.03a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.47 12.53a.75.75 0 111.06-1.06l3.03 3.03V3.75A.75.75 0 0110 3z" clipRule="evenodd" /></svg>
                )}
                <span>{change}</span>
                <span className="ml-1 text-gray-500">vs last month</span>
            </div>
        </div>
    );
};

const AnalyticsContent: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500 mb-4">
          Cosmic Analytics
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Live metrics from across the CasTLive universe. Monitor growth, engagement, and the flow of the ʚɞ economy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Stardust Sent" value="1.2M ʚɞ" change="+12.5%" changeType="increase" color="pink" />
          <StatCard title="Active Viewers" value="8,421" change="+8.1%" changeType="increase" color="cyan" />
          <StatCard title="New Followers" value="1,209" change="-2.3%" changeType="decrease" color="green" />
      </div>
      
      <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl">
        <h3 className="text-2xl font-semibold mb-4 text-glow text-cyan-300">Engagement Over Time</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for a chart component */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="ml-4">Chart data would be visualized here.</p>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-glow text-pink-300">Top Gifts This Week</h3>
            <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between"><span>1. Galactic Whale</span> <span>4,501 sent</span></li>
                <li className="flex justify-between"><span>2. Comet's Kiss</span> <span>12,832 sent</span></li>
                <li className="flex justify-between"><span>3. Stardust Sparkle</span> <span>25,110 sent</span></li>
            </ul>
          </div>
           <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-glow text-green-300">Most Active Clubs</h3>
            <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between"><span>1. Stardust Crusaders</span> <span>+150 members</span></li>
                <li className="flex justify-between"><span>2. Nebula Nomads</span> <span>+88 members</span></li>
                <li className="flex justify-between"><span>3. Supernova Surfers</span> <span>+210 members</span></li>
            </ul>
          </div>
       </div>

    </div>
  );
};

export default AnalyticsContent;
