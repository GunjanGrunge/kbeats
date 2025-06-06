import { Orbitron, Play, Allison } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import "./globals.css";
import "./styles.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fonts = `${orbitron.variable} ${play.variable} ${allison.variable}`;

  return (
    <html lang="en">
      <ClientLayout fonts={fonts}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
          <Footer />
          <ChatBot />
        </div>
      </ClientLayout>
    </html>
  );
}
