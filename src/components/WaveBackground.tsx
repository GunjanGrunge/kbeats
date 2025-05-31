'use client';

import { useEffect, useState } from 'react';

export default function WaveBackground() {
  const [waves, setWaves] = useState<Array<{ height: number; duration: number; delay: number }>>([]);
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const numberOfWaves = isMobile ? 200 : 300;
    const heightRange = isMobile ? 8 : 6;
    const baseHeight = isMobile ? 3 : 2;

    const newWaves = Array(numberOfWaves).fill(0).map((_, i) => ({
      height: Math.random() * heightRange + baseHeight,
      duration: (Math.random() * 1.8 + 3.0),
      delay: -(i * 0.1)
    }));
    setWaves(newWaves);

    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      if (isNowMobile !== isMobile) {
        const updatedWaves = Array(isNowMobile ? 200 : 300).fill(0).map((_, i) => ({
          height: Math.random() * (isNowMobile ? 8 : 6) + (isNowMobile ? 3 : 2),
          duration: (Math.random() * 1.8 + 3.0),
          delay: -(i * 0.1)
        }));
        setWaves(updatedWaves);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="wave-container">
      {waves.map((wave, i) => (
        <div 
          key={i} 
          className="wave" 
          style={{
            height: `${wave.height}vh`,
            animationDuration: `${wave.duration.toFixed(2)}s`,
            animationDelay: `${wave.delay}s`,
            backgroundColor: i % 3 === 0 
              ? 'var(--color-logo-outline)' 
              : i % 3 === 1 
                ? 'var(--color-accent2)' 
                : 'var(--color-accent1)',
            opacity: 0.7
          }}
        />
      ))}
    </div>
  );
}
