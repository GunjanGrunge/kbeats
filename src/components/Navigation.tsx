'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

interface NavigationProps {
  setIsContactModalOpen: (isOpen: boolean) => void;
}

export default function Navigation({ setIsContactModalOpen }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full py-4 px-6 z-10 bg-[#020126]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between items-center">
          <Link href="/" className="text-[#FFD700] font-orbitron text-xl">K BEATS</Link>
          <button
            onClick={toggleMenu}
            className="text-white hover:text-[#FF6F00] transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiMenu className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center gap-12">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/beats" className="nav-link">Beats</Link>
          <Link href="/media" className="nav-link">Media</Link>
          <button
            className="nav-link"
            onClick={() => setIsContactModalOpen(true)}
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#020126] bg-opacity-95 backdrop-blur-sm py-4 px-6 shadow-lg">
            <div className="flex flex-col items-center gap-6">
              <Link href="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link href="/beats"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Beats
              </Link>
              <Link href="/media"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Media
              </Link>
              <button
                className="nav-link"
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
