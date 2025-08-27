'use client';

import { FaYoutube, FaInstagram, FaSoundcloud } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="social-links">
          <a
            href="https://www.youtube.com/@Kbeats_official"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <FaYoutube size={20} style={{ color: 'var(--color-logo-outline)' }} />
          </a>
          <a
            href="https://www.instagram.com/kbeatsofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <FaInstagram size={20} style={{ color: 'var(--color-logo-outline)' }} />
          </a>
          <a
            href="https://soundcloud.com/k-beats-291187445?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <FaSoundcloud size={20} style={{ color: 'var(--color-logo-outline)' }} />
          </a>
        </div>
        <div className="footer-info">
          <div className="copyright">
            © {new Date().getFullYear()} K Beats. All rights reserved.
          </div>
          <a
            href="https://gunjangrunge.github.io/Portfolio-Website/"
            target="_blank"
            rel="noopener noreferrer"
            className="credits"
          >
            Made with ♥ by Gunjan Sarkar
          </a>
        </div>
      </div>
    </footer>
  );
}
