import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Orbitron } from 'next/font/google';
import localFont from 'next/font/local';
import { Providers } from '@/providers/Providers';
import { MobileBlocker } from '@/components/atoms/MobileBlocker';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  display: 'swap',
});

const nasalization = localFont({
  src: '../fonts/Nasalization Rg.otf',
  variable: '--font-nasalization',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NASA urban planning project',
  description: 'Application for urban planning using NASA data - Four Elements',
  openGraph: {
    title: 'NASA Urban Planning Project',
    description: 'Application for urban planning using NASA data - Four Elements',
    url: 'https://nasa-4-elements.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://nasa-4-elements.vercel.app/preview.png',
        width: 1200,
        height: 630,
        alt: 'NASA Urban Planning Project - Four Elements Dashboard',
      },
    ],
    siteName: 'NASA 4 Elements',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NASA Urban Planning Project',
    description: 'Application for urban planning using NASA data - Four Elements',
    images: ['https://nasa-4-elements.vercel.app/preview.png'],
  },
  icons: {
    icon: '/nasa.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} ${orbitron.variable} ${nasalization.variable} font-inter antialiased`}
      >
        <MobileBlocker />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
