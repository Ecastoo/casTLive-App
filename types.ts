import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactElement;
}

export interface Gift {
  name: string;
  price: number;
  icon: React.ReactElement;
  animation: string;
  color: 'yellow' | 'cyan' | 'purple' | 'indigo' | 'pink' | 'green' | 'orange' | 'red';
}

export interface User {
  name: string;
  avatarGradient: string;
  isVip: boolean;
  joined: string;
  stardustSent: number;
  color: string;
}

export interface UserProfile extends User {
    streak: number;
    followers: number;
    giftsSent: number;
    club: string;
}

export interface ChatMessage {
  id: number;
  user: User;
  message: string;
}

export type FeedItemType = 'live' | 'post' | 'highlight';
export interface FeedItem {
  id: number;
  type: FeedItemType;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  image?: string;
}

export interface HighlightedUser {
  id: number;
  name: string;
  avatarGradient: string;
  status: string;
  streak: number;
  color: string;
  position: { top: string; left: string };
  recentGifts: { name: string; icon: React.ReactElement }[];
  perks: { name: string; icon: React.ReactElement }[];
}

export interface CosmicClub {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  gradient: string;
  color: 'cyan' | 'pink' | 'purple' | 'green' | 'yellow' | 'indigo' | 'orange' | 'red';
  topGifters: {
    name: string;
    amount: number;
  }[];
}

export interface Conversation {
    id: number;
    participant: User;
    isTyping: boolean;
    messages: DirectMessage[];
}

export interface DirectMessage {
    id: number;
    sender: User | 'self';
    text: string;
    timestamp: string;
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface FlaggedContent {
    id: number;
    user: User;
    reason: string;
    content: string;
    riskLevel: RiskLevel;
}

export interface PurchaseOption {
    amount: number;
    price: number;
    bonus: number;
}

export interface Transaction {
    id: string;
    type: 'purchase' | 'gift_sent' | 'gift_received';
    description: string;
    amount: number;
    date: string;
}
