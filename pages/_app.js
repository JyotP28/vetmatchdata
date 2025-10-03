// pages/_app.js
import '../styles/globals.css';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';

// The motion and AnimatePresence imports are no longer needed here
// The router prop is also no longer needed

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      
      {/* The AnimatePresence and motion.main wrappers have been removed
        and replaced with a standard <main> tag.
      */}
      <main style={{ flex: 1 }}>
        <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  );
}

export default MyApp;