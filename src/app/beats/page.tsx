'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function BeatsPage() {
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => !prev);
    }, 1000); // 60 BPM

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Header with Breadcrumbs */}
      <header className="pt-24 pb-12 px-6 text-center relative z-[1]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-left mb-8 text-sm">
            <div className="flex items-center gap-2 text-[#9E9E9E]">
              <Link href="/" className="hover:text-[#4CAF50] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#4CAF50]">Beats</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-7xl relative z-[1] text-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700] font-orbitron mb-4">
            Beats Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F5F5] max-w-2xl mx-auto">
            We&apos;re crafting something special. Our beat library is currently under development.
          </p>

          {/* Metronome Animation */}
          <div className="relative h-64 w-full max-w-sm mx-auto my-16">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-1 h-1 bg-[#4CAF50] rounded-full">
              <div className={`
                w-1 h-48 origin-bottom transform transition-all duration-500 ease-in-out
                bg-gradient-to-t from-[#4CAF50] to-transparent
                ${tick ? 'rotate-45' : '-rotate-45'}
              `}>
                <div className="w-4 h-4 -translate-x-1.5 bg-[#FFD700] rounded-full shadow-lg 
                  shadow-[#FFD700]/20"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 
              bg-[#020126]/30 backdrop-blur-sm rounded-full border-2 border-[#4CAF50]"></div>
          </div>

          {/* Coming Soon Timer */}
          <div className="mt-12 space-y-6">
            <p className="text-[#4CAF50] font-orbitron text-lg">
              60 BPM - The heart of rhythm
            </p>
            <div className="flex justify-center gap-4">              <button 
                className="px-6 py-3 bg-[#4CAF50]/20 backdrop-blur-sm text-[#4CAF50] 
                  border border-[#4CAF50] rounded-lg hover:bg-[#4CAF50]/30 transition-all
                  font-orbitron"
                onClick={() => toast.success('Sign up feature coming soon!', {
                  style: {
                    background: '#020126',
                    color: '#F5F5F5',
                    border: '1px solid #4CAF50'
                  },
                  duration: 3000,
                })}
              >
                Notify When Ready
              </button>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { title: 'Premium Quality', text: 'Studio-grade beats crafted with precision' },
              { title: 'Multiple Genres', text: 'From Hip-Hop to EDM and everything in between' },
              { title: 'Exclusive Rights', text: 'Clear licensing for your creative projects' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-[#020126]/30 backdrop-blur-sm rounded-lg border border-[#4CAF50]/20">
                <h3 className="text-[#FFD700] font-orbitron mb-2">{feature.title}</h3>
                <p className="text-[#F5F5F5]/80">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
