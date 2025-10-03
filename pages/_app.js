// pages/_app.js
import '../styles/globals.css';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      {/* FIX: Removed mode="wait" to allow for smoother asset loading during transitions */}
      <AnimatePresence>
        <motion.main
          key={router.route}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ flex: 1 }}
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default MyApp;