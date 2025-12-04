import React from 'react';

// FIX: Replaced JSX.Element with React.ReactElement
const PolicyPoint: React.FC<{ title: string; children: React.ReactNode, icon: React.ReactElement }> = ({ title, children, icon }) => (
  <div className="flex items-start space-x-4 p-4">
    <div className="flex-shrink-0 w-10 h-10 text-cyan-400">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="text-gray-400">{children}</p>
    </div>
  </div>
);

const ModerationContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          Moderation & Safety
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A vibrant universe requires a safe and respectful environment. Our policies and tools are designed to protect all voyagers on their journey.
        </p>
      </div>

      <div className="p-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl space-y-4">
        <PolicyPoint
          title="AI-Assisted Moderation"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>}
        >
          Our systems proactively scan for harmful content and behavior, flagging potential violations for human review. This helps us maintain a positive atmosphere in real-time.
        </PolicyPoint>

        <PolicyPoint
          title="Community Guidelines"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
        >
          Clear, comprehensive guidelines define the code of conduct. We expect all users to familiarize themselves with and adhere to these principles to ensure a welcoming space for everyone.
        </PolicyPoint>
        
        <PolicyPoint
          title="User Controls"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>}
        >
          We provide robust tools for users to manage their experience, including blocking, reporting, and chat filters. You are in control of your journey.
        </PolicyPoint>
      </div>

       <div className="text-center pt-4">
        <p className="text-gray-400">While this is an adult-friendly environment, we are committed to fostering creativity without toxicity. Our legal and policy documents provide further detail.</p>
       </div>
    </div>
  );
};

export default ModerationContent;