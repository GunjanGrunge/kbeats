import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
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

  return (
    <footer id="footer" className="footer-section" data-testid="footer-section">
      {/* CTA Banner */}
      <div className="footer-cta">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="footer-cta-title">Ready to Create?</h2>
          <p className="footer-cta-text">
            Let's turn your vision into sound. Start a conversation with our AI assistant 
            and tell us about your project.
          </p>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <div className="footer-marquee">
        <Marquee speed={40} gradient={false}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="footer-marquee-item">
              <span className="marquee-logo-k">K</span>
              <span className="marquee-logo-beats">BEATS</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        <div className="section-container">
          <div className="footer-grid">
            {/* Logo & Description */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-k">K</span>
                <span className="logo-beats">BEATS</span>
              </div>
              <p className="footer-description">
                Crafting beats that hit different. Custom music for creators, artists, events & beyond.
              </p>
            </div>

            {/* Links */}
            <div className="footer-links">
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
            </div>

            {/* Services */}
            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li>Custom Production</li>
                <li>Mixing & Mastering</li>
                <li>Events & Weddings</li>
                <li>Artist Support</li>
              </ul>
            </div>

            {/* Social */}
            <div className="footer-links">
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
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} K Beats. All rights reserved.</p>
            <p>Crafted with passion for music</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
