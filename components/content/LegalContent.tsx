import React, { useState, useRef, useEffect, useCallback } from 'react';
import NeonButton from '../NeonButton';

interface Particle {
  id: number;
  top: number;
}

const faqs = [
  { q: "Is CasTLive for all ages?", a: "CasTLive is designed as an adult-friendly environment. We expect users to be mature and responsible. Content may not be suitable for all ages, and user discretion is advised." },
  { q: "What is your policy on safety and privacy?", a: "Users are ultimately responsible for their own security and privacy. We provide tools to block and report, but you control what you share. Never share sensitive personal information." },
  { q: "What happens if I see illegal activity?", a: "We have a zero-tolerance policy for illegal activities, especially those involving child safety. Any profiles suspected of child abuse or related content will be terminated immediately and reported to the proper authorities." },
  { q: "How does moderation work?", a: "We use a combination of AI-powered detection and human moderators to enforce our community guidelines. However, we empower users with robust tools to manage their own experience." },
];

const LegalContent: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showRipple, setShowRipple] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const particleIdCounter = useRef(0);

    const playChime = () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(987.77, audioContext.currentTime); // B5 note
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);

        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    };

    const handleAcknowledge = () => {
        setShowRipple(true);
        playChime();
        setTimeout(() => setShowRipple(false), 1200);
    };

    const handleScroll = useCallback(() => {
        const scrollEl = scrollRef.current;
        if (!scrollEl) return;
        
        const scrollTop = scrollEl.scrollTop;
        const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight);
        
        const newParticle: Particle = {
            id: particleIdCounter.current++,
            top: scrollPercentage * (scrollEl.clientHeight - 20) + 10,
        };

        setParticles(prev => [...prev, newParticle].slice(-20)); // Keep only the last 20 particles
    }, []);

    useEffect(() => {
        const scrollEl = scrollRef.current;
        scrollEl?.addEventListener('scroll', handleScroll);
        return () => scrollEl?.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

  return (
    <div className="space-y-8 animate-fade-in">
        {showRipple && (
            <div className="pointer-events-none fixed inset-0 z-[9999]" style={{
                background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 60%)',
                animation: 'theme-ripple-effect 1.2s ease-out forwards'
            }}></div>
        )}

      <div className="p-6 bg-red-900/30 backdrop-blur-sm border border-red-500/50 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-glow text-red-300 mb-2">Important Notice</h3>
        <p className="text-red-200">
            CasTLive is an adult-friendly environment. Users are responsible for their own security & privacy.
            <br />
            <span className="font-bold">Profiles involved in child abuse will be terminated immediately.</span>
        </p>
      </div>

      <div className="relative p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-xl">
        <h3 className="text-2xl font-semibold mb-4 text-glow text-cyan-300">Frequently Asked Questions</h3>
        <div ref={scrollRef} className="relative h-64 overflow-y-auto pr-4 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
                <h4 className="font-semibold text-white">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
        {/* Aurora Particle Trail */}
        <div className="absolute top-0 right-2 bottom-0 w-2 pointer-events-none">
            {particles.map(p => (
                <div key={p.id} className="absolute w-1.5 h-1.5 rounded-full" style={{
                    top: `${p.top}px`,
                    left: '50%',
                    background: `radial-gradient(circle, hsl(${180 + Math.random() * 40}, 100%, 70%), transparent 70%)`,
                    animation: `aurora-scroll-particle-fade 1s forwards`,
                    transform: `translateX(${(Math.random() - 0.5) * 20}px)`
                }}></div>
            ))}
        </div>
      </div>
      
      <div className="text-center">
        <NeonButton color="cyan" className="px-8 py-3" onClick={handleAcknowledge}>
            Acknowledge
        </NeonButton>
      </div>
    </div>
  );
};

export default LegalContent;
