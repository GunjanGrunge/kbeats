'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import ContactModal from "@/components/ContactModal";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
  fonts,
}: {
  children: React.ReactNode;
  fonts: string;
}) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (    <body className={`${fonts} relative min-h-screen overflow-x-hidden`}>
      <div className="base-background"></div>
      <div className="grid-background"></div>
      <Navigation setIsContactModalOpen={setIsContactModalOpen} />
      <div className="relative z-[2]">
        {children}
      </div>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#020126',
            color: '#F5F5F5',
          },
        }}
      />
    </body>
  );
}
