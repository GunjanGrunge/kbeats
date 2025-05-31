"use client";
import Image from "next/image";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import WaveBackground from "@/components/WaveBackground";
import ChatBot from "@/components/ChatBot";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import "./styles.css";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="grid-background"></div>
      <WaveBackground />
      
      {/* Navigation */}
      <nav className="fixed w-full py-4 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-[#FF6F00] transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <HiX className="w-8 h-8" />
              ) : (
                <HiMenu className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center gap-12">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Beats</a>
            <a href="#" className="nav-link">Studio</a>
            <a href="#" 
               className="nav-link" 
               onClick={(e) => {
                 e.preventDefault();
                 setIsContactModalOpen(true);
               }}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-[#1E3A8A] bg-opacity-95 backdrop-blur-sm py-4 px-6 shadow-lg">
              <div className="flex flex-col items-center gap-6">
                <a href="#" 
                   className="nav-link" 
                   onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a href="#" 
                   className="nav-link"
                   onClick={() => setIsMenuOpen(false)}
                >
                  Beats
                </a>
                <a href="#" 
                   className="nav-link"
                   onClick={() => setIsMenuOpen(false)}
                >
                  Studio
                </a>
                <a href="#" 
                   className="nav-link"
                   onClick={(e) => {
                     e.preventDefault();
                     setIsContactModalOpen(true);
                     setIsMenuOpen(false);
                   }}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Rest of the content */}
      <main style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#F5F5F5',
        padding: '0 20px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="hero-content" style={{ textAlign: 'center', width: '100%' }}>
          <div className="logo-container" style={{ 
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '220px',
            margin: '0 auto 2rem'
          }}>
            <Image
              src="/k-beats-logo.png"
              alt="K Beats Large Logo"
              width={220}
              height={220}
              priority
              quality={100}
              sizes="(max-width: 480px) 140px, (max-width: 768px) 180px, 220px"
              style={{ 
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                filter: 'drop-shadow(0 0 20px rgba(255, 111, 0, 0.3))',
                animation: 'float 3s ease-in-out infinite'
              }}
            />
          </div>
          <h1 className="gradient-text" style={{ 
            fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            fontWeight: 'bold',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>
            K Beats
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-allison)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#FF6F00',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            letterSpacing: '0.05em'
          }}>
            Crafting soundscapes, one beat at a time.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="cta-button">
              Explore Beats
            </button>
            <button className="cta-button outlined" onClick={() => setIsContactModalOpen(true)}>
              Contact Us
            </button>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="social-links">
            <a
              href="https://www.youtube.com/@Kbeats_official"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              <FaYoutube size={20} style={{ color: 'var(--color-logo-outline)' }} />
            </a>
            <a
              href="https://www.instagram.com/kbeatsofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              <FaInstagram size={20} style={{ color: 'var(--color-logo-outline)' }} />
            </a>
          </div>
          <div className="footer-info">
            <div className="copyright">
              © {new Date().getFullYear()} K Beats. All rights reserved.
            </div>
            <a
              href="https://gunjangrunge.github.io/Portfolio-Website/"
              target="_blank"
              rel="noopener noreferrer"
              className="credits-link"
              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              Made with ♥ by Gunjan Sarkar
            </a>
          </div>
        </div>
      </footer>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <ChatBot />
    </div>
  );
}
