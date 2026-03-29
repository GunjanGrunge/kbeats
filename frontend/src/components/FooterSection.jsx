import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Mail, Headphones } from 'lucide-react';
import './FooterSection.css';

const FooterSection = () => {
  const footerLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Connect', id: 'social' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <footer id="footer" className="footer-section" data-testid="footer-section">
      {/* CTA Banner */}
      <div className="footer-cta">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2 
            className="footer-cta-title"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Ready to Create?
          </motion.h2>
          <motion.p 
            className="footer-cta-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's turn your vision into sound. Start a conversation with our AI assistant 
            or reach out directly — we're here to make your project legendary.
          </motion.p>
          <motion.div 
            className="footer-cta-actions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a 
              href="mailto:artists@kebeatsofficial.com" 
              className="footer-email-btn"
              data-testid="footer-email-cta"
            >
              <Mail size={20} />
              <span>artists@kebeatsofficial.com</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <motion.div 
        className="footer-marquee"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Marquee speed={40} gradient={false}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="footer-marquee-item">
              <Headphones size={32} strokeWidth={2} />
              <span className="marquee-logo-k">K</span>
              <span className="marquee-logo-beats">BEATS</span>
            </div>
          ))}
        </Marquee>
      </motion.div>

      {/* Footer Content */}
      <div className="footer-content">
        <div className="section-container">
          <motion.div 
            className="footer-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
          >
            {/* Logo & Description */}
            <motion.div className="footer-brand" variants={itemVariants}>
              <div className="footer-logo">
                <span className="logo-k">K</span>
                <span className="logo-beats">BEATS</span>
              </div>
              <p className="footer-description">
                Crafting beats that hit different. Custom music for creators, artists, events & beyond.
              </p>
              <a href="mailto:artists@kebeatsofficial.com" className="footer-email-link">
                <Mail size={16} />
                artists@kebeatsofficial.com
              </a>
            </motion.div>

            {/* Links */}
            <motion.div className="footer-links" variants={itemVariants}>
              <h4>Navigation</h4>
              <ul>
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollToSection(link.id)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div className="footer-links" variants={itemVariants}>
              <h4>Services</h4>
              <ul>
                <li>Custom Beat Production</li>
                <li>Mixing & Mastering</li>
                <li>Events & Weddings</li>
                <li>Artist Development</li>
                <li>Trending Remixes</li>
                <li>Vlog & Content Music</li>
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div className="footer-links" variants={itemVariants}>
              <h4>Follow Us</h4>
              <ul>
                <li>
                  <a href="https://www.youtube.com/@Kbeats_official" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/kbeatsofficial/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://soundcloud.com/k-beats-291187445" target="_blank" rel="noopener noreferrer">
                    SoundCloud
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p>&copy; {new Date().getFullYear()} K Beats. All rights reserved.</p>
            <p>Crafted with passion for music</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
