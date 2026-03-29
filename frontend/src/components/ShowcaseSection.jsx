import { useState } from 'react';
import './ShowcaseSection.css';

const ShowcaseSection = () => {
  const [activeTab, setActiveTab] = useState('youtube');

  const youtubeVideos = [
    'https://www.youtube.com/embed/videoseries?list=UULFkbeats_official',
  ];

  return (
    <section id="showcase" className="showcase-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-accent">Our</span> Work
          </h2>
          <p className="section-description">
            Check out our latest mixes, remixes, and productions across platforms
          </p>
        </div>

        <div className="showcase-tabs">
          <button 
            className={`tab-button ${activeTab === 'youtube' ? 'active' : ''}`}
            onClick={() => setActiveTab('youtube')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </button>
          
          <button 
            className={`tab-button ${activeTab === 'soundcloud' ? 'active' : ''}`}
            onClick={() => setActiveTab('soundcloud')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.255-2.154c-.01-.057-.05-.1-.1-.1m-1.175.462c-.049 0-.089.04-.096.088l-.178 1.692.178 1.64c.007.047.047.085.096.085.048 0 .087-.038.094-.085l.201-1.64-.201-1.692c-.007-.048-.046-.088-.094-.088m2.35-.462c-.053 0-.096.044-.103.098l-.213 2.154.213 2.105c.007.054.05.098.103.098.051 0 .093-.044.101-.098l.234-2.105-.234-2.154c-.008-.054-.05-.098-.101-.098m.938.462c-.049 0-.088.04-.095.088l-.182 1.692.182 1.64c.007.047.046.085.095.085.05 0 .089-.038.097-.085l.198-1.64-.198-1.692c-.008-.048-.047-.088-.097-.088m.937-.462c-.053 0-.096.046-.103.1l-.176 2.154.176 2.105c.007.057.05.098.103.098.052 0 .095-.041.102-.098l.211-2.105-.211-2.154c-.007-.054-.05-.1-.102-.1m.938.462c-.05 0-.089.04-.096.088l-.165 1.692.165 1.64c.007.047.046.085.096.085.049 0 .089-.038.095-.085l.189-1.64-.189-1.692c-.006-.048-.046-.088-.095-.088m.937-.462c-.054 0-.097.046-.104.1l-.144 2.154.144 2.105c.007.057.05.098.104.098.053 0 .095-.041.103-.098l.178-2.105-.178-2.154c-.008-.054-.05-.1-.103-.1m.938.462c-.051 0-.091.04-.098.088l-.134 1.692.134 1.64c.007.047.047.085.098.085.05 0 .088-.038.096-.085l.157-1.64-.157-1.692c-.008-.048-.046-.088-.096-.088M9.026 11.5c-.055 0-.098.046-.106.1l-.123 2.154.123 2.105c.008.057.051.098.106.098.054 0 .097-.041.104-.098l.145-2.105-.145-2.154c-.007-.054-.05-.1-.104-.1m.938.462c-.052 0-.092.04-.1.088l-.112 1.692.112 1.64c.008.047.048.085.1.085.051 0 .09-.038.098-.085l.133-1.64-.133-1.692c-.008-.048-.047-.088-.098-.088m.937-.462c-.056 0-.1.046-.107.1l-.102 2.154.102 2.105c.007.057.051.098.107.098.055 0 .098-.041.106-.098l.122-2.105-.122-2.154c-.008-.054-.051-.1-.106-.1m.937.462c-.053 0-.094.04-.101.088l-.091 1.692.091 1.64c.007.047.048.085.101.085.052 0 .092-.038.1-.085l.112-1.64-.112-1.692c-.008-.048-.048-.088-.1-.088m.938-.462c-.057 0-.101.046-.108.1l-.081 2.154.081 2.105c.007.057.051.098.108.098.056 0 .099-.041.107-.098l.101-2.105-.101-2.154c-.008-.054-.051-.1-.107-.1m.937.462c-.054 0-.095.04-.102.088l-.07 1.692.07 1.64c.007.047.048.085.102.085.053 0 .093-.038.101-.085l.091-1.64-.091-1.692c-.008-.048-.048-.088-.101-.088m.938-.462c-.058 0-.102.046-.11.1l-.06 2.154.06 2.105c.008.057.052.098.11.098.057 0 .1-.041.108-.098l.08-2.105-.08-2.154c-.008-.054-.051-.1-.108-.1m.937.462c-.055 0-.096.04-.104.088l-.05 1.692.05 1.64c.008.047.049.085.104.085.054 0 .095-.038.102-.085l.07-1.64-.07-1.692c-.007-.048-.048-.088-.102-.088m.938-.462c-.059 0-.103.046-.111.1l-.04 2.154.04 2.105c.008.057.052.098.111.098.058 0 .101-.041.109-.098l.06-2.105-.06-2.154c-.008-.054-.051-.1-.109-.1m.937.462c-.056 0-.098.04-.105.088l-.029 1.692.029 1.64c.007.047.049.085.105.085.055 0 .096-.038.104-.085l.05-1.64-.05-1.692c-.008-.048-.049-.088-.104-.088m.938-.462c-.06 0-.104.046-.112.1l-.02 2.154.02 2.105c.008.057.052.098.112.098.059 0 .102-.041.11-.098l.039-2.105-.039-2.154c-.008-.054-.051-.1-.11-.1"/>
            </svg>
            SoundCloud
          </button>
          
          <button 
            className={`tab-button ${activeTab === 'instagram' ? 'active' : ''}`}
            onClick={() => setActiveTab('instagram')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
            </svg>
            Instagram
          </button>
        </div>

        <div className="showcase-content">
          {activeTab === 'youtube' && (
            <div className="youtube-container">
              <div className="video-wrapper glass-card">
                <iframe
                  src="https://www.youtube.com/embed?listType=user_uploads&list=kbeats_official"
                  title="K Beats YouTube Channel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="platform-link">
                <a 
                  href="https://www.youtube.com/@Kbeats_official" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button secondary"
                >
                  <span>Visit Our YouTube Channel</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'soundcloud' && (
            <div className="soundcloud-container">
              <div className="embed-wrapper glass-card">
                <iframe
                  width="100%"
                  height="450"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/k-beats-291187445&color=%236667ab&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                ></iframe>
              </div>
              <div className="platform-link">
                <a 
                  href="https://soundcloud.com/k-beats-291187445" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button secondary"
                >
                  <span>Follow on SoundCloud</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'instagram' && (
            <div className="instagram-container">
              <div className="instagram-grid">
                <div className="instagram-placeholder glass-card">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                  </svg>
                  <p>Follow us on Instagram for behind-the-scenes content, live sessions, and music updates!</p>
                </div>
              </div>
              <div className="platform-link">
                <a 
                  href="https://www.instagram.com/kbeatsofficial/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button secondary"
                >
                  <span>Follow on Instagram</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
