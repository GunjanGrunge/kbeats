import { motion } from 'framer-motion';
import { Mic2, Music, Sparkles, Users, Radio, Volume2 } from 'lucide-react';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      icon: Music,
      title: 'Custom Production',
      description: 'Original beats tailored to your vision. From trap to lo-fi, we create sounds that define your content.',
      image: 'https://images.pexels.com/photos/5749200/pexels-photo-5749200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
      icon: Volume2,
      title: 'Mixing & Mastering',
      description: 'Professional-grade mixing that makes your tracks radio-ready. Crystal clear, punchy, and balanced.',
      image: 'https://images.unsplash.com/photo-1610716632424-4d45990bcd48?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMHN0dWRpbyUyMGRhcmt8ZW58MHx8fHwxNzc0ODA5Njk0fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Sparkles,
      title: 'Events & Weddings',
      description: 'Custom soundtracks for your special moments. Entrance music, first dance, party anthems - we got you.',
      image: 'https://images.unsplash.com/photo-1765279113604-efe3b0301134?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxkaiUyMGxpdmUlMjBwZXJmb3JtYW5jZSUyMGxhc2VyfGVufDB8fHx8MTc3NDgwOTcwMXww&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Mic2,
      title: 'Artist Support',
      description: 'From beats to full production. We help emerging artists find their sound and build their catalog.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800'
    },
    {
      icon: Radio,
      title: 'Trending Remixes',
      description: 'Viral-worthy remixes of popular tracks. Perfect for content creators who want to ride the wave.',
      image: 'https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?w=800'
    },
    {
      icon: Users,
      title: 'Vlog & Content',
      description: 'Background music that elevates your content. No copyright issues, 100% custom, 100% yours.',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800'
    }
  ];

  return (
    <section id="services" className="services-section" data-testid="services-section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Services <span className="title-outline">& Offerings</span>
          </h2>
          <p className="section-description">
            From beats that bang to mixes that slap — we deliver sound that makes an impact
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
