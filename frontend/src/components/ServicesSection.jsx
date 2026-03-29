import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      title: 'Opportunity to create your own unique profile',
      description: 'Build your brand and showcase your music to the world.',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
      cta: 'Explore'
    },
    {
      title: 'Support and feedback from the music community',
      description: 'Connect with artists, producers, and fans who get it.',
      image: 'https://images.unsplash.com/photo-1571266028243-d220c6a7edbf',
      cta: 'Connect'
    },
    {
      title: 'Guaranteed payouts for every track played',
      description: 'Your music, your money. Fair compensation every time.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
      cta: 'Explore'
    }
  ];

  return (
    <section id="services" className="services-section-new">
      <div className="section-container">
        <div className="services-header scroll-reveal">
          <h2 className="services-title-new">
            What We <span className="highlight">Create</span>
          </h2>
          <p className="services-subtitle">
            From beats that bang to mixes that slap - custom fire for every vibe
          </p>
        </div>

        <div className="services-cards-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card-new scroll-reveal"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-image-wrapper">
                <img src={service.image} alt={service.title} />
                <div className="card-gradient-overlay"></div>
              </div>
              
              <div className="card-content-new">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="card-cta">
                  {service.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Grid */}
        <div className="additional-services">
          <div className="service-pill scroll-reveal">
            <div className="pill-icon">🎵</div>
            <span>Custom Beats</span>
          </div>
          <div className="service-pill scroll-reveal">
            <div className="pill-icon">🎚️</div>
            <span>Mix & Master</span>
          </div>
          <div className="service-pill scroll-reveal">
            <div className="pill-icon">💒</div>
            <span>Event Music</span>
          </div>
          <div className="service-pill scroll-reveal">
            <div className="pill-icon">🎤</div>
            <span>Artist Support</span>
          </div>
          <div className="service-pill scroll-reveal">
            <div className="pill-icon">🔥</div>
            <span>Trending Remixes</span>
          </div>
          <div className="service-pill scroll-reveal">
            <div className="pill-icon">🎧</div>
            <span>Sound Design</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
