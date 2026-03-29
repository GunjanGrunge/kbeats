import { motion } from 'framer-motion';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section" data-testid="about-section">
      <div className="section-container">
        <div className="about-grid">
          {/* Left - Image */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1771945701672-70e9be57c6a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxuZW9uJTIwYWJzdHJhY3QlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzQ4MDk3MDF8MA&ixlib=rb-4.1.0&q=85"
                alt="K Beats Studio"
              />
              <div className="about-image-border"></div>
            </div>
            <div className="about-tag">
              <span className="tag-year">2024</span>
              <span className="tag-text">Crafting Sound</span>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">About K Beats</span>
            <h2 className="about-title">
              Where <span className="highlight">Sound</span> Meets <span className="highlight">Vision</span>
            </h2>
            
            <div className="about-text">
              <p>
                We're not just producers — we're sonic architects. At K Beats, we believe every creator 
                deserves music that truly represents their vision. No generic loops, no cookie-cutter beats.
              </p>
              <p>
                Whether you're a YouTuber looking for that perfect vlog soundtrack, an artist searching 
                for your signature sound, or planning the most epic wedding — we craft audio experiences 
                that hit different.
              </p>
            </div>

            {/* Signature */}
            <div className="about-signature">
              <div className="signature-line"></div>
              <span className="signature-text">K Beats Team</span>
            </div>

            {/* Quote */}
            <blockquote className="about-quote">
              "It doesn't matter where you start — it's how you make it sound."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
