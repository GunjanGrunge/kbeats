import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './SocialSection.css';

const SocialSection = () => {
  const socials = [
    {
      name: 'YouTube',
      handle: '@Kbeats_official',
      url: 'https://www.youtube.com/@Kbeats_official',
      description: 'Watch our latest mixes, tutorials, and behind-the-scenes content'
    },
    {
      name: 'Instagram',
      handle: '@kbeatsofficial',
      url: 'https://www.instagram.com/kbeatsofficial/',
      description: 'Daily updates, stories, and exclusive previews'
    },
    {
      name: 'SoundCloud',
      handle: 'K Beats',
      url: 'https://soundcloud.com/k-beats-291187445',
      description: 'Stream our full catalog of beats and remixes'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, x: -30 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="social" className="social-section" data-testid="social-section">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="social-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Connect
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Follow <span className="title-outline">The Sound</span>
          </motion.h2>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="social-links"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              variants={cardVariants}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.3 }
              }}
              data-testid="social-link"
            >
              <div className="social-card-content">
                <h3 className="social-name">{social.name}</h3>
                <span className="social-handle">{social.handle}</span>
                <p className="social-description">{social.description}</p>
              </div>
              <div className="social-arrow">
                <ArrowUpRight size={32} />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialSection;
