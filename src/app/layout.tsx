import type { Metadata } from "next";
import { Orbitron, Play, Allison } from "next/font/google";
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
      <body className={`${orbitron.variable} ${play.variable} ${allison.variable}`}>{children}</body>
    </html>
  );
}
