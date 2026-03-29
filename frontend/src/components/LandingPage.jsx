import { useState, useEffect } from 'react';
import './LandingPage.css';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ShowcaseSection from './ShowcaseSection';
import ChatbotWidget from './ChatbotWidget';
import Footer from './Footer';
import Header from './Header';

const LandingPage = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <HeroSection onOpenChat={() => setShowChatbot(true)} />
      <ServicesSection />
      <ShowcaseSection />
      <Footer />
      
      <ChatbotWidget 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)} 
      />
      
      {/* Floating chat button */}
      {!showChatbot && (
        <button 
          className="floating-chat-button"
          onClick={() => setShowChatbot(true)}
          aria-label="Open chat"
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
