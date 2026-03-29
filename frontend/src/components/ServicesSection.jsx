import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      title: 'Custom Music Production',
      description: 'Original compositions from scratch. Your vision, our sound. Whether it\'s a YouTube intro, podcast theme, or full track - we craft music that slaps.',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
      features: ['Original Beats', 'Any Genre/Vibe', 'Commercial Rights', 'Unlimited Revisions']
    },
    {
      title: 'Mixing & Mastering',
      description: 'Turn your raw recordings into radio-ready bangers. Pro mixing, mastering, and polish that makes your track stand out on any platform.',
      image: 'https://images.unsplash.com/photo-1535406208535-1429839cfd13',
      features: ['Studio Quality', '24-48hr Turnaround', 'Streaming Optimized', 'Free Revisions']
    },
    {
      title: 'Event & Wedding Music',
      description: 'Live mixing, custom playlists, and soundtracks for your special moments. From ceremony to reception - we set the vibe.',
      image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg',
      features: ['Live DJ Sets', 'Custom Playlists', 'Ceremony Music', 'Reception Bangers']
    },
    {
      title: 'Artist Support',
      description: 'Full production support for independent artists. Beat making, recording guidance, mixing, mastering - the whole package.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
      features: ['Beat Production', 'Recording Advice', 'Mix & Master', 'Distribution Ready']
    },
    {
      title: 'Trending Remixes',
      description: 'Viral-ready remixes and mashups of trending tracks. Perfect for content creators who need that TikTok/IG heat.',
      image: 'https://images.unsplash.com/photo-1571266028243-d220c6a7edbf',
      features: ['Latest Trends', 'Unique Edits', 'Copyright Cleared', 'Social Media Ready']
    },
    {
      title: 'Sound Design',
      description: 'Custom sound effects, transitions, and audio branding. Make your content unforgettable with signature sounds.',
      image: 'https://images.unsplash.com/photo-1627407660893-fe01f60d44c4',
      features: ['Custom SFX', 'Audio Logos', 'Transitions', 'Brand Identity']
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="section-container">
        <div className="section-header scroll-reveal">
          <h2 className="section-title">
            <span className="title-accent">What We</span> Create
          </h2>
          <p className="section-description">
            From beats that bang to mixes that slap - we do it all. No cookie-cutter packages, just custom fire tailored to your exact vibe.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card glass-card scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} />
                <div className="service-overlay"></div>
              </div>
              
              <div className="service-content">
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
            </div>
          ))}
        </div>

        <div className="pricing-note glass-card scroll-reveal">
          <h3>Real Talk About Pricing</h3>
          <p>
            Every project hits different. We don't do fixed packages because your music deserves better than that. 
            Let's chat about what you need, and we'll cook up a quote that makes sense for your vision and budget.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;