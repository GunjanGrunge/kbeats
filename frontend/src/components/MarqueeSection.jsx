import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import './MarqueeSection.css';

const MarqueeSection = () => {
  const words = ['BEATS', 'PRODUCTION', 'MIXING', 'REMIXES', 'EVENTS', 'WEDDINGS', 'ARTISTS', 'CUSTOM'];

  return (
    <motion.section 
      className="marquee-section" 
      data-testid="marquee-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Marquee speed={80} gradient={false} className="marquee-track">
          {words.map((word, index) => (
            <div key={index} className="marquee-item">
              <span className={index % 2 === 0 ? 'solid' : 'outline'}>{word}</span>
              <span className="marquee-dot">●</span>
            </div>
          ))}
        </Marquee>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <Marquee speed={60} gradient={false} direction="right" className="marquee-track marquee-track-2">
          {words.reverse().map((word, index) => (
            <div key={index} className="marquee-item-small">
              <span>{word}</span>
              <span className="marquee-dot-small">◆</span>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </motion.section>
  );
};

export default MarqueeSection;
