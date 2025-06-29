import  Inter  from 'next/font/local';
import './globals.css';
import FloatingSocials from '@/components/Floatingsocials';
import { Providers } from './provider';
import { WishlistProvider } from '@/components/WishlistProvider';
import TawkToWidget from '@/components/TawkToWidget';
import WhatsappChat from '@/components/WhatsappChat';



const inter = Inter({
      src: [
        { path: '/fonts/Inter-Regular.otf', weight: '400', style: 'normal' },
        { path: '/fonts/Inter-Medium.otf', weight: '500', style: 'normal' },
        { path: '/fonts/Inter-Bold.otf', weight: '700', style: 'normal' },
      ],
      display: 'swap',
    });

export const metadata = {
      title: 'Digital Voyage - Guided Tours & Adventures',
      description: "Your trusted travel partner for booking flights, tours, and planning itineraries across Africa and beyond. Guided tours and adventure packages. Custom itineraries, expert support, and seamless travel experiences.",
      keywords: 'guided tours, adventure packages, safari tours, travel agency',
      openGraph: {
        title: 'Digital Voyage - Guided Tours & Adventures',
        description: 'Explore the world with Digital Voyage&apos;s curated tours and adventures.',
        url: 'https://digital_voyaging.com',
        images: [
      {
        url: '/images/nairobi.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Voyage Travel',
      },
    ],
      },
        twitter: {
    card: 'summary_large_image',
    title: 'Digital Voyage',
    description: 'Explore Africa with Digital Voyage',
    image: '/images/nairobi.jpg',
  },
    };

 export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en" className={`${inter.className}`} >
          <body>
            <Providers>
              <WishlistProvider >
                <TawkToWidget />
                <FloatingSocials />
                <WhatsappChat />
                {children}
              </WishlistProvider>
            </Providers>
          </body>
        </html>
      );
    }

