// pages/explore.js
import path from 'path';
import { promises as fs } from 'fs';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SchoolView from '../components/SchoolView';
import InternshipView from '../components/InternshipView';
import ResidencyView from '../components/ResidencyView';

// Styling for our filter buttons
const buttonStyle = { padding: '10px 20px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', margin: '0' };
const activeButtonStyle = { ...buttonStyle, backgroundColor: '#009933', color: 'white', borderColor: '#009933' };

// Animation for the view switching (tabs)
const viewVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ExplorePage({ annualData, schoolData, specialtyData }) {
  const [view, setView] = useState('internship');

  return (
    // This main container is a regular div
    <div 
      style={{ 
        fontFamily: 'sans-serif', 
        padding: 'calc(1rem + env(safe-area-inset-top)) 5% 2rem 5%' 
      }}
    >
      <Head>
        <title>Explore the Data | VetMatchData</title>
      </Head>
      
      {/* This is the container for the top link */}
      <div style={{ padding: '0 5% 0 5%' }}>
        <Link href="/" style={{ color: '#009933', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
          &larr; Back to Home
        </Link>
      </div>
      
      {/* This is the container for the filter buttons */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 5%' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>What would you like to explore?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <button style={view === 'internship' ? activeButtonStyle : buttonStyle} onClick={() => setView('internship')}>
            Internship Data
          </button>
          <button style={view === 'residency' ? activeButtonStyle : buttonStyle} onClick={() => setView('residency')}>
            Residency Data
          </button>
          <button style={view === 'school' ? activeButtonStyle : buttonStyle} onClick={() => setView('school')}>
            School Specific Data
          </button>
        </div>
      </div>

      {/* This is the container for the animated chart views */}
      <div style={{ padding: '0 5% 2rem 5%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            variants={viewVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {view === 'internship' && <InternshipView specialtyData={specialtyData} />}
            {view === 'residency' && <ResidencyView specialtyData={specialtyData} />}
            {view === 'school' && <SchoolView schoolData={schoolData} annualData={annualData} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// getStaticProps function remains the same
export async function getStaticProps() {
  const dataDirectory = path.join(process.cwd(), 'data');
  const annualFile = await fs.readFile(path.join(dataDirectory, 'annual_summary.json'), 'utf8');
  const schoolFile = await fs.readFile(path.join(dataDirectory, 'school_summary.json'), 'utf8');
  const specialtyFile = await fs.readFile(path.join(dataDirectory, 'specialty_summary.json'), 'utf8');
  
  const annualData = JSON.parse(annualFile);
  const schoolData = JSON.parse(schoolFile);
  const specialtyData = JSON.parse(specialtyFile);

  return {
    props: {
      annualData,
      schoolData,
      specialtyData,
    },
  };
}