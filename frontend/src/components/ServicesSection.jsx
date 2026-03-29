import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      icon: '🎵',
      title: 'Custom Music Production',
      description: 'Original compositions tailored for your vlogs, videos, and creative projects. From concept to completion.',
      features: ['Original Compositions', 'Any Genre', 'Full Rights Included']
    },
    {
      icon: '🎚️',
      title: 'Mixing & Mastering',
      description: 'Professional audio engineering to make your tracks sound polished, balanced, and radio-ready.',
      features: ['Studio Quality', 'Fast Turnaround', 'Unlimited Revisions']
    },
    {
      icon: '💒',
      title: 'Event & Wedding Music',
      description: 'Custom soundtracks and live mixing for your special moments. Make memories that sound as good as they feel.',
      features: ['Live Performance', 'Custom Playlists', 'Special Requests']
    },
    {
      icon: '🎤',
      title: 'Artist Support',
      description: 'Production, mixing, and guidance for independent artists. Bring your musical vision to life.',
      features: ['Full Production', 'Creative Direction', 'Distribution Ready']
    },
    {
      icon: '🔥',
      title: 'Trending Remixes',
      description: 'High-energy remixes and mashups of trending songs. Perfect for content creators and parties.',
      features: ['Latest Trends', 'Unique Edits', 'Copyright Cleared']
    },
    {
      icon: '🎧',
      title: 'Sound Design',
      description: 'Custom sound effects, transitions, and audio branding for podcasts, videos, and games.',
      features: ['Custom SFX', 'Brand Identity', 'Audio Logos']
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-accent">What We</span> Offer
          </h2>
          <p className="section-description">
            Comprehensive music production services tailored to your unique needs. 
            No fixed packages - every project is custom-priced based on your vision.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card glass-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pricing-note glass-card">
          <h3>Personalized Pricing</h3>
          <p>
            Every project is unique. We don't believe in one-size-fits-all packages. 
            Chat with us to discuss your needs and get a custom quote tailored to your vision and budget.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
