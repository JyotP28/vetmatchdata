// pages/index.js
import path from 'path';
import { promises as fs } from 'fs';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CompetitionChart from '../components/CompetitionChart';
import styles from '../styles/Home.module.css';

export default function HomePage({ specialtyData }) {
  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.8 }, }, };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } }, };

  return (
    <>
      <Head>
        <title>VIRMP Visualized | VetMatchData</title> 
      </Head>

      <motion.main 
        className={styles.main}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.leftColumn} variants={itemVariants}>
          <h1 className={styles.title}>
            VIRMP Data <br />
            <span className={styles.titleVisualized}>Visualized</span>
          </h1>
          <p className={styles.subtitle}>
            Better than the stale PDF format. Discover competition trends and insights instantly.
          </p>
          <Link href="/explore" passHref>
            <motion.button 
              className={styles.exploreButton}
              whileHover={{ scale: 1.05, backgroundColor: '#007a29' }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Explore the Data
            </motion.button>
          </Link>
        </motion.div>

        <motion.div className={styles.rightColumn} variants={itemVariants}>
          <CompetitionChart specialtyData={specialtyData} />
        </motion.div>
      </motion.main>
    </>
  );
}

// getStaticProps
export async function getStaticProps() {
  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'specialty_summary.json');
  const specialtyFileContents = await fs.readFile(filePath, 'utf8');
  const specialtyData = JSON.parse(specialtyFileContents);

  return {
    props: {
      specialtyData,
    },
  };
}