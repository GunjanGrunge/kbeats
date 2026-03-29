import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import MarqueeSection from './MarqueeSection';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import SocialSection from './SocialSection';
import FooterSection from './FooterSection';
import ChatbotWidget from './ChatbotWidget';
import './LandingPage.css';

const LandingPage = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="landing-page" data-testid="landing-page">
      <Navbar onOpenChat={() => setShowChatbot(true)} />
      <HeroSection onOpenChat={() => setShowChatbot(true)} />
      <MarqueeSection />
      <ServicesSection />
      <AboutSection />
      <SocialSection />
      <FooterSection />
      
      <ChatbotWidget 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)} 
      />
      
      {/* Floating chat button */}
      {!showChatbot && (
        <button 
          className="floating-chat-btn"
          onClick={() => setShowChatbot(true)}
          aria-label="Open chat"
          data-testid="chatbot-trigger"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default LandingPage;
