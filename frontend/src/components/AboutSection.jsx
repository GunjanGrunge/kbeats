import { motion } from 'framer-motion';
import './AboutSection.css';

const AboutSection = () => {
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: -80, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }
    }
  };

  const textReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3 + i * 0.1
      }
    })
  };

  return (
    <section id="about" className="about-section" data-testid="about-section">
      <div className="section-container">
        <div className="about-grid">
          {/* Left - Image */}
          <motion.div
            className="about-image-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={imageVariants}
          >
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1771945701672-70e9be57c6a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxuZW9uJTIwYWJzdHJhY3QlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzQ4MDk3MDF8MA&ixlib=rb-4.1.0&q=85"
                alt="K Beats Studio"
              />
              <motion.div 
                className="about-image-border"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            <motion.div 
              className="about-tag"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="tag-year">2024</span>
              <span className="tag-text">Crafting Sound</span>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={contentVariants}
          >
            <motion.span 
              className="section-label"
              custom={0}
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              About K Beats
            </motion.span>
            
            <motion.h2 
              className="about-title"
              custom={1}
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Where <span className="highlight">Sound</span> Meets <span className="highlight">Vision</span>
            </motion.h2>
            
            <motion.div 
              className="about-text"
              custom={2}
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p>
                We're not just producers — we're sonic architects. At K Beats, we believe every creator 
                deserves music that truly represents their vision. No generic loops, no cookie-cutter beats.
              </p>
              <p>
                Whether you're a YouTuber looking for that perfect vlog soundtrack, an artist searching 
                for your signature sound, or planning the most epic wedding — we craft audio experiences 
                that hit different.
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div 
              className="about-signature"
              custom={3}
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="signature-line"></div>
              <span className="signature-text">K Beats Team</span>
            </motion.div>

            {/* Quote */}
            <motion.blockquote 
              className="about-quote"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              "It doesn't matter where you start — it's how you make it sound."
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
