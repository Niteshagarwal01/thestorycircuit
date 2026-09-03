import { Playfair_Display, Poppins, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'The Story Circuit | Creative Media Agency',
  description: 'We craft cinematic stories that sell. Premium video production, brand reels, and creative direction for brands that mean business.',
  keywords: ['video production', 'creative agency', 'brand films', 'reels', 'advertising'],
  openGraph: {
    title: 'The Story Circuit',
    description: 'Cinematic stories that convert.',
    images: ['/logo.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
