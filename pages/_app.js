// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; 
import '../styles/globals.css';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
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
      <Head>
        {/* Correct placement for viewport meta tag */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
      </Head>
      
      <AnimatedBackground />
      
      <main style={{ flex: 1 }}>
        <Component {...pageProps} />
      </main>
      
      {/* Manual AdBanner removed. 
        Google Auto Ads will now decide where to place ads. 
      */}
      
      <Footer />
    </div>
  );
}

export default MyApp;