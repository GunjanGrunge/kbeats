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
import { Headphones } from 'lucide-react';
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
      <ServicesSection onOpenChat={() => setShowChatbot(true)} />
      <AboutSection />
      <SocialSection />
      <FooterSection />
      
      <ChatbotWidget 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)} 
      />
      
      {/* Floating chat button with music icon */}
      {!showChatbot && (
        <button 
          className="floating-chat-btn"
          onClick={() => setShowChatbot(true)}
          aria-label="Chat with K Beats AI"
          data-testid="chatbot-trigger"
        >
          <Headphones size={28} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default LandingPage;
