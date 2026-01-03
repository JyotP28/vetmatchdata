// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner'; // Import the ad component
import { AnimatePresence, motion } from 'framer-motion';

const handleRouteChange = (url) => {
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChange-complete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      <main style={{ flex: 1 }}>
        <Component {...pageProps} />
      </main>
      
      {/* Placement for your single minimal ad */}
      <AdBanner />
      
      <Footer />
    </div>
  );
}

export default MyApp;