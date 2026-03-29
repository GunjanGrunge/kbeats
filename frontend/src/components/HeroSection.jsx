import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import './HeroSection.css';

// Animated counter component
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, target, duration]);
  
  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const HeroSection = ({ onOpenChat }) => {
  return (
    <section id="hero" className="hero-section" data-testid="hero-section">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-bg-gradient"></div>
        <img 
          src="https://images.unsplash.com/photo-1759735541630-036eefb7cd3a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHxuZW9uJTIwYWJzdHJhY3QlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzQ4MDk3MDF8MA&ixlib=rb-4.1.0&q=85"
          alt="Abstract neon background"
          className="hero-bg-image"
        />
      </div>

      <div className="hero-content">
        {/* Main Title */}
        <motion.div
          className="hero-title-wrapper"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">
            <span className="hero-title-k">K</span>
            <span className="hero-title-beats">BEATS</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Music Production & Mixing
        </motion.p>

        {/* Description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting beats that hit different. Custom music for creators, artists, 
          events & beyond. Where sound meets vision.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button 
            className="hero-btn-primary"
            onClick={onOpenChat}
            data-testid="hero-cta-primary"
          >
            <span>Start Your Project</span>
            <ArrowRight size={18} />
          </button>
          <a 
            href="https://www.youtube.com/@Kbeats_official" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hero-btn-secondary"
            data-testid="hero-cta-secondary"
          >
            <Play size={18} />
            <span>Watch Our Work</span>
          </a>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="stat-item">
            <span className="stat-number">
              <AnimatedCounter target={500} suffix="+" duration={2.5} />
            </span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">
              <AnimatedCounter target={3} duration={1.5} />
            </span>
            <span className="stat-label">Platforms</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number stat-24-7">
              <span className="stat-24">24</span>
              <span className="stat-slash">/</span>
              <span className="stat-7">7</span>
            </span>
            <span className="stat-label">Support</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </motion.div>

      {/* Side Social Links */}
      <motion.div 
        className="hero-social-side"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <a 
          href="https://www.youtube.com/@Kbeats_official" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link-side"
          data-testid="social-link-youtube"
        >
          YT
        </a>
        <a 
          href="https://www.instagram.com/kbeatsofficial/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link-side"
          data-testid="social-link-instagram"
        >
          IG
        </a>
        <a 
          href="https://soundcloud.com/k-beats-291187445" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link-side"
          data-testid="social-link-soundcloud"
        >
          SC
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
