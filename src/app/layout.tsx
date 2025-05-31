import type { Metadata } from "next";
import { Orbitron, Play, Allison } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const play = Play({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-play",
});

const allison = Allison({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-allison",
});

export const metadata: Metadata = {
  title: "K BEATS - Custom Music Production",
  description: "Professional custom beats and copyright-free music for content creators",
  icons: {
    icon: [
      {
        url: "/k-beats-logo.png",
        href: "/k-beats-logo.png",
      }
    ],
    apple: [
      {
        url: "/k-beats-logo.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${play.variable} ${allison.variable}`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#020126',
              color: '#ECF241',
              border: '1px solid #4CAF50'
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#020126',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ff4b4b',
                secondary: '#020126',
              },
            }
          }}
        />
      </body>
    </html>
  );
}
