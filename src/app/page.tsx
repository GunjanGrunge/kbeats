"use client";
import Image from "next/image";
import ChatBot from "@/components/ChatBot";
import "./styles.css";

export default function Home() {
  return (
    <div className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Content */}
      <main style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#F5F5F5',
        padding: '80px 20px 0',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="hero-content" style={{ textAlign: 'center', width: '100%' }}>
          <div className="logo-container" style={{ 
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '220px',
            margin: '0 auto 2rem'
          }}>
            <Image
              src="/k-beats-logo.png"
              alt="K Beats Large Logo"
              width={220}
              height={220}
              priority
              quality={100}
              sizes="(max-width: 480px) 140px, (max-width: 768px) 180px, 220px"
              style={{ 
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                filter: 'drop-shadow(0 0 20px rgba(236, 242, 65, 0.3))',
                animation: 'float 3s ease-in-out infinite'
              }}
            />
          </div>
          <h1 className="gradient-text" style={{ 
            fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            fontWeight: 'bold',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>
            K Beats
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-allison)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#4DBF3B',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            letterSpacing: '0.05em'
          }}>
            Crafting soundscapes, one beat at a time.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="cta-button">
              Explore Beats
            </button>
            <button className="cta-button outlined">
              Contact Us
            </button>
          </div>
        </div>
      </main>

      <ChatBot />
    </div>
  );
}
