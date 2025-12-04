import React, { useState, useMemo } from 'react';
import CosmicBackground from './components/CosmicBackground';
import Sidebar from './components/Sidebar';
import IntroductionContent from './components/content/IntroductionContent';
import EconomyContent from './components/content/EconomyContent';
import UIShowcaseContent from './components/content/UIShowcaseContent';
import AIPromptsContent from './components/content/AIPromptsContent';
import ModerationContent from './components/content/ModerationContent';
import useCometTrail from './hooks/useCometTrail';
import SplashScreen from './components/SplashScreen';
import FloatingNav from './components/FloatingNav';
import { NavItem } from './types';
import CosmicFeedContent from './components/content/CosmicFeedContent';
import ChatContent from './components/content/ChatContent';
import ProfileContent from './components/content/ProfileContent';
import DMsContent from './components/content/DMsContent';
import ClubsContent from './components/content/ClubsContent';
import ThemesContent from './components/content/ThemesContent';
import FlairContent from './components/content/FlairContent';
import BalanceManagementContent from './components/content/BalanceManagementContent';
import AnalyticsContent from './components/content/AnalyticsContent';
import ModerationDashboardContent from './components/content/ModerationDashboardContent';
import SettingsContent from './components/content/SettingsContent';
import LegalContent from './components/content/LegalContent';
import AvatarCustomizationContent from './components/content/AvatarCustomizationContent';

// Icons for Sidebar
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const EconomyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const FeedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ClubsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const DMsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ModDashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const AnalyticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const LegalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CreatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const BalanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const ThemeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;

const navItems: NavItem[] = [
    { id: 'introduction', label: 'Introduction', icon: <HomeIcon /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
    { id: 'cosmic_feed', label: 'Cosmic Feed', icon: <FeedIcon /> },
    { id: 'chat', label: 'Chat', icon: <ChatIcon /> },
    { id: 'dms', label: 'DMs', icon: <DMsIcon /> },
    { id: 'clubs', label: 'Clubs', icon: <ClubsIcon /> },
    { id: 'economy', label: 'Economy', icon: <EconomyIcon /> },
    { id: 'balance', label: 'Balance', icon: <BalanceIcon /> },
    { id: 'avatar_customization', label: 'Avatar Creator', icon: <CreatorIcon /> },
    { id: 'themes', label: 'Themes & Flair', icon: <ThemeIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    { id: 'moderation_dashboard', label: 'Mod Dashboard', icon: <ModDashboardIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    { id: 'legal', label: 'Legal & Safety', icon: <LegalIcon /> },
];

const contentMap: { [key: string]: React.FC } = {
  introduction: IntroductionContent,
  economy: EconomyContent,
  ui_showcase: UIShowcaseContent,
  ai_prompts: AIPromptsContent,
  moderation_policy: ModerationContent,
  cosmic_feed: CosmicFeedContent,
  chat: ChatContent,
  profile: ProfileContent,
  dms: DMsContent,
  clubs: ClubsContent,
  themes: ThemesContent,
  flair: FlairContent,
  balance: BalanceManagementContent,
  analytics: AnalyticsContent,
  moderation_dashboard: ModerationDashboardContent,
  settings: SettingsContent,
  legal: LegalContent,
  avatar_customization: AvatarCustomizationContent,
};

function App() {
  const [activeContent, setActiveContent] = useState('introduction');
  const [showSplash, setShowSplash] = useState(true);
  useCometTrail();

  const ActiveComponent = useMemo(() => contentMap[activeContent] || IntroductionContent, [activeContent]);

  if (showSplash) {
    return (
      <>
        <CosmicBackground />
        <SplashScreen onStartJourney={() => setShowSplash(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <CosmicBackground />
      <div className="relative z-20 flex">
        <Sidebar activeContent={activeContent} setActiveContent={setActiveContent} navItems={navItems} />
        
        <main id="main-content" className="ml-64 flex-1 p-8 md:p-12 h-screen overflow-y-auto">
          <ActiveComponent />
        </main>
      </div>
      <FloatingNav />
    </div>
  );
}

export default App;