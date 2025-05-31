import { Orbitron, Play, Allison } from "next/font/google";

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
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${play.variable} ${allison.variable}`}>
        {children}
      </body>
    </html>
  );
}
