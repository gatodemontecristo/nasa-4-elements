import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/providers/Providers';
import './globals.css';

// Professional sans-serif for body text
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// Elegant serif for headings
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

// Modern geometric for architectural feel
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

// Technical monospace
const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NASA urban planning project',
  description: 'Application for urban planning using NASA data - Four Elements',
  icons: {
    icon: '/nasa.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} font-inter antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
