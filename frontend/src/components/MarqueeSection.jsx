import Marquee from 'react-fast-marquee';
import './MarqueeSection.css';

const MarqueeSection = () => {
  const words = ['BEATS', 'PRODUCTION', 'MIXING', 'REMIXES', 'EVENTS', 'WEDDINGS', 'ARTISTS', 'CUSTOM'];

  return (
    <section className="marquee-section" data-testid="marquee-section">
      <Marquee speed={80} gradient={false} className="marquee-track">
        {words.map((word, index) => (
          <div key={index} className="marquee-item">
            <span className={index % 2 === 0 ? 'solid' : 'outline'}>{word}</span>
            <span className="marquee-dot">●</span>
          </div>
        ))}
      </Marquee>
      <Marquee speed={60} gradient={false} direction="right" className="marquee-track marquee-track-2">
        {words.reverse().map((word, index) => (
          <div key={index} className="marquee-item-small">
            <span>{word}</span>
            <span className="marquee-dot-small">◆</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeSection;
