import type { Metadata, Viewport } from 'next';
import { Urbanist, JetBrains_Mono, Space_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Cursor } from '@/components/cursor';
import { NotchBar } from '@/components/notch-bar';
import { WorkspaceScene } from '@/components/three/workspace-scene';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

const SITE_URL = 'https://portfolio-v2-six-mu-33.vercel.app';
const TITLE = 'Alfonso Mayoral — AI Engineer';
const DESCRIPTION =
  'AI engineer shipping consumer iOS and enterprise GenAI. Madrid, headed west.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s — Alfonso Mayoral' },
  description: DESCRIPTION,
  applicationName: 'Alfonso Mayoral',
  authors: [{ name: 'Alfonso Mayoral', url: SITE_URL }],
  creator: 'Alfonso Mayoral',
  keywords: [
    'AI engineer', 'Alfonso Mayoral', 'Spotter AI', 'AISC Madrid',
    'Beam Suntory', 'GenAI', 'iOS', 'LLM', 'Madrid', 'Exponential Fellowship',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Alfonso Mayoral',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/profile.png', width: 1200, height: 630, alt: 'Alfonso Mayoral' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/profile.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${jetbrains.variable} ${spaceMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased text-fg min-h-screen relative">
        <Providers>
          <WorkspaceScene />
          <div className="relative z-10">
            <NotchBar />
            {children}
          </div>
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
