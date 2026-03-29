import { motion } from 'framer-motion';
import { Mic2, Music, Sparkles, Users, Radio, Volume2, Mail, MessageCircle } from 'lucide-react';
import './ServicesSection.css';

const ServicesSection = ({ onOpenChat }) => {
  const services = [
    {
      icon: Music,
      title: 'Custom Beat Production',
      description: 'Original beats crafted specifically for your project. From hard-hitting trap to smooth lo-fi, cinematic scores to viral TikTok sounds — we create the perfect soundtrack for your vision.',
      features: ['Unlimited revisions', 'Full ownership rights', 'Multiple formats delivered'],
      image: 'https://images.pexels.com/photos/5749200/pexels-photo-5749200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      icon: Volume2,
      title: 'Mixing & Mastering',
      description: 'Professional-grade audio engineering that makes your tracks radio-ready. Crystal clear vocals, punchy drums, balanced frequencies — we bring out the best in your music.',
      features: ['Industry-standard processing', 'Stem mixing available', 'Streaming-optimized masters'],
      image: 'https://images.unsplash.com/photo-1610716632424-4d45990bcd48?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMHN0dWRpbyUyMGRhcmt8ZW58MHx8fHwxNzc0ODA5Njk0fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Sparkles,
      title: 'Events & Weddings',
      description: 'Make your special moments unforgettable with custom soundtracks. Grand entrance music, first dance remixes, party anthems, and ceremony scores tailored to your story.',
      features: ['Personalized compositions', 'Quick turnaround', 'Live event support'],
      image: 'https://images.unsplash.com/photo-1765279113604-efe3b0301134?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxkaiUyMGxpdmUlMjBwZXJmb3JtYW5jZSUyMGxhc2VyfGVufDB8fHx8MTc3NDgwOTcwMXww&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Mic2,
      title: 'Artist Development',
      description: 'From raw talent to release-ready. We help emerging artists find their signature sound, build their catalog, and develop a professional portfolio that stands out.',
      features: ['Sound identity creation', 'Full EP/Album production', 'Release strategy support'],
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800'
    },
    {
      icon: Radio,
      title: 'Trending Remixes',
      description: 'Viral-worthy remixes and edits of popular tracks. Perfect for content creators who want to ride the wave while keeping their content fresh and copyright-safe.',
      features: ['Trend-aware production', 'Platform-optimized', 'Fast delivery'],
      image: 'https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?w=800'
    },
    {
      icon: Users,
      title: 'Vlog & Content Music',
      description: 'Background music that elevates your content without overwhelming it. Custom tracks that set the mood, build emotion, and keep viewers engaged from start to finish.',
      features: ['Copyright-free for your use', 'Mood-matched compositions', 'Bulk packages available'],
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800'
    }
  ];

  // Animation variants
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

  const headerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="services" className="services-section" data-testid="services-section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="services-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={headerVariants}
        >
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Do
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Services <span className="title-outline">& Offerings</span>
          </motion.h2>
          <motion.p 
            className="section-description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From beats that bang to mixes that slap — we deliver sound that makes an impact.
            Every project is custom-quoted based on your specific needs.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="service-card"
                variants={cardVariants}
                data-testid="service-card"
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-image-overlay"></div>
                </div>
                <div className="service-content">
                  <div className="service-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3>Ready to Start Your Project?</h3>
            <p>Every project is unique — reach out and let's discuss your vision. We'll create something amazing together.</p>
          </motion.div>
          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <button 
              className="cta-btn-primary"
              onClick={onOpenChat}
              data-testid="services-chat-cta"
            >
              <MessageCircle size={20} />
              <span>Chat with K Beats AI</span>
            </button>
            <a 
              href="mailto:artists@kebeatsofficial.com"
              className="cta-btn-secondary"
              data-testid="services-email-cta"
            >
              <Mail size={20} />
              <span>artists@kebeatsofficial.com</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
