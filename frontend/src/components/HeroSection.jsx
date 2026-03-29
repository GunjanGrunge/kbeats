import { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import { Music2 } from 'lucide-react';

const HeroSection = ({ onOpenChat }) => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="hero-section-new">
      <div className="hero-background-new">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="hero-container">
        {/* Large Geometric Text */}
        <div className="hero-text-massive">
          <div className="text-outline">BEATS</div>
        </div>

        {/* Circular Elements */}
        <div className="circle-element circle-1">
          <div className="circle-content">
            <Music2 size={60} />
            <p>Custom production for creators who need that edge</p>
          </div>
        </div>

        <div className="circle-element circle-2" 
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
          }}>
          <img 
            src="https://images.unsplash.com/photo-1571266028243-d220c6a7edbf"
            alt="DJ Setup"
          />
          <div className="circle-overlay">
            <h3>K Beats</h3>
          </div>
        </div>

        <div className="circle-element circle-3">
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
            alt="Music Studio"
          />
        </div>

        {/* Main CTA */}
        <div className="hero-cta-box">
          <h1>K Beats</h1>
          <p>Where sound meets vision. Custom beats, remixes & production that actually slap.</p>
          <button className="cta-learn-more" onClick={onOpenChat}>
            Start Your Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Navigation Pills */}
        <nav className="hero-nav-pills">
          <button onClick={() => document.getElementById('home').scrollIntoView()}>Home</button>
          <button className="active" onClick={() => document.getElementById('services').scrollIntoView()}>Services</button>
          <button onClick={() => document.getElementById('showcase').scrollIntoView()}>Tracks</button>
          <button onClick={() => document.getElementById('footer').scrollIntoView()}>Contact</button>
        </nav>

        {/* Side Icons */}
        <div className="side-icons">
          <a href="https://www.youtube.com/@Kbeats_official" target="_blank" rel="noopener noreferrer">
            <div className="icon-circle">Y</div>
          </a>
          <a href="https://www.instagram.com/kbeatsofficial/" target="_blank" rel="noopener noreferrer">
            <div className="icon-circle">I</div>
          </a>
          <a href="https://soundcloud.com/k-beats-291187445" target="_blank" rel="noopener noreferrer">
            <div className="icon-circle">S</div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
