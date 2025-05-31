'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';

export default function Media() {
  const sections = [
    {
      id: 'logo',
      title: '1. Logo',
      content: (
        <div className="space-y-4">
          <p className="text-lg">Primary Logo features "K BEATS" in Orbitron for a futuristic, tech-driven vibe.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">            <div className="bg-[#020126]/30 backdrop-blur-sm p-6 rounded-lg flex items-center justify-center">
              <Image
                src="/k-beats-logo.png"
                alt="K Beats Primary Logo"
                width={200}
                height={200}
                className="filter drop-shadow-[0_0_8px_rgba(236,242,65,0.3)]"
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-[#FFD700] font-medium">Available Formats</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>SVG - Vector format for scalable usage</li>
                <li>PNG - With transparency</li>
                <li>JPG - For solid background usage</li>
              </ul>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
                  <FaDownload /> Download Kit
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'colors',
      title: '2. Color Palette',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Primary', hex: '#020126', desc: 'Deep midnight blue – main background' },
            { name: 'Accent 1', hex: '#4CAF50', desc: 'Fresh green – call to action, highlights' },
            { name: 'Accent 2', hex: '#FFD700', desc: 'Vibrant gold – key elements, emphasis' },
            { name: 'Light Text', hex: '#F5F5F5', desc: 'Primary text on dark backgrounds' },
            { name: 'Dark Text', hex: '#121212', desc: 'Text on light areas or neutral sections' },
            { name: 'Neutral Gray', hex: '#9E9E9E', desc: 'Secondary info, muted components' },
          ].map((color) => (
            <div key={color.hex} className="p-4 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm">
              <div 
                className="w-full h-24 rounded mb-4" 
                style={{ backgroundColor: color.hex }}
              />
              <h4 className="font-medium text-[#FFD700]">{color.name}</h4>
              <p className="text-sm opacity-80 font-mono">{color.hex}</p>
              <p className="text-sm mt-2">{color.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'typography',
      title: '3. Typography',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-[#FFD700]">Orbitron</h4>
              <p className="font-orbitron text-2xl">Primary Display</p>
              <p className="text-sm opacity-80">Used for logo and headings</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#FFD700]">Play</h4>
              <p className="font-play text-2xl">Body Text Font</p>
              <p className="text-sm opacity-80">Main content and UI elements</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#FFD700]">Allison</h4>
              <p className="font-allison text-3xl">Accent Typography</p>
              <p className="text-sm opacity-80">Artistic accents and signatures</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'voice',
      title: '4. Tone of Voice',
      content: (
        <div className="bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-[#FFD700] mb-2">Brand Personality</h3>
              <p>Energetic, Innovative, Urban Creative</p>
            </div>
            <div>
              <h3 className="text-[#FFD700] mb-2">Target Audience</h3>
              <p>Designed to speak to creators, dreamers, and rhythm seekers.</p>
            </div>
            <div>
              <h3 className="text-[#FFD700] mb-2">Example</h3>
              <blockquote className="border-l-4 border-[#4CAF50] pl-4 italic">
                "Welcome to the sound playground. At K BEATS, every drop is engineered to move minds and bodies."
              </blockquote>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mission',
      title: '5. Brand Mission Statement',
      content: (
        <div className="bg-[#020126]/30 backdrop-blur-sm p-8 rounded-lg border border-[#4CAF50] shadow-lg">
          <p className="text-lg leading-relaxed">
            K BEATS exists to empower creators with distinctive, emotionally rich beats that enhance storytelling across video, digital, and immersive platforms. We're more than music — we build cinematic energy into every soundscape.
          </p>
        </div>
      ),
    },
    {
      id: 'press-kit',
      title: '6. Press Kit',
      content: (
        <div className="space-y-8">
          <div className="bg-white bg-opacity-5 backdrop-blur-sm p-8 rounded-lg">
            {/* Brand Overview */}
            <div className="mb-8">
              <h3 className="text-[#FFD700] text-xl font-medium mb-4">Brand Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><span className="text-[#4CAF50]">Brand Name:</span> K BEATS</p>
                  <p className="mb-2"><span className="text-[#4CAF50]">Tagline:</span> Crafting soundscapes, one beat at a time</p>
                  <p className="mb-2"><span className="text-[#4CAF50]">Founded:</span> 2025</p>
                </div>
                <div>
                  <p className="mb-2"><span className="text-[#4CAF50]">Website:</span> kbeatsofficial.com</p>
                  <p className="mb-2"><span className="text-[#4CAF50]">Email:</span> artists@kebeatsofficial.com</p>
                  <p className="mb-2"><span className="text-[#4CAF50]">Location:</span> India (Remote Worldwide)</p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h3 className="text-[#FFD700] text-xl font-medium mb-4">About K BEATS</h3>
              <p className="mb-4">K BEATS is a music production brand delivering premium, royalty-free beats for creators, filmmakers, and storytellers. With a futuristic sound rooted in urban, cinematic, and EDM-inspired styles, every track is designed to elevate digital content with purpose and energy.</p>
              <p>Whether it&apos;s background music for a reel, a beat for a YouTube vlog, or a soundtrack for a short film — K BEATS provides professional-quality audio tailored for modern media creators.</p>
            </div>            {/* Press Quotes */}
            <div className="mb-8">
              <h3 className="text-[#FFD700] text-xl font-medium mb-4">Press Quotes</h3>
              <div className="space-y-4">
                <blockquote className="border-l-4 border-[#4CAF50] pl-4 italic">
                  &quot;A cinematic soundscape architect — K BEATS hits deep.&quot;
                </blockquote>
                <blockquote className="border-l-4 border-[#4CAF50] pl-4 italic">
                  &quot;Where urban rhythm meets ambient emotion.&quot;
                </blockquote>
                <blockquote className="border-l-4 border-[#4CAF50] pl-4 italic">
                  &quot;One of the most distinct beat producers rising out of 2025.&quot;
                </blockquote>
              </div>
            </div>          </div>

          {/* Download Pack Button */}
          <div className="flex justify-center">
            <button 
              className="flex items-center gap-2 bg-[#4CAF50] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => alert('Press Kit download coming soon!')}
            >
              <FaDownload /> Download Full Press Kit
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (    <div className="min-h-screen relative">
      {/* Header with Breadcrumbs */}
      <header className="pt-24 pb-12 px-6 text-center relative z-[1]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-left mb-8 text-sm">
            <div className="flex items-center gap-2 text-[#9E9E9E]">
              <Link href="/" className="hover:text-[#4CAF50] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#4CAF50]">Media</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700] font-orbitron mb-4">
            K BEATS Brand Kit
          </h1>
          <p className="text-xl md:text-2xl font-allison text-[#4CAF50]">
            Crafting soundscapes, one beat at a time.
          </p>
        </div>
      </header>      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-7xl relative z-[1]">
        <div className="space-y-24">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-8 font-orbitron">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
