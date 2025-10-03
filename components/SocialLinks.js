// components/SocialLinks.js
import React from 'react';
import { motion } from 'framer-motion';

const shamrockGreen = '#009933';
const neutralGray = '#888';

export default function SocialLinks() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
      {/* LinkedIn Icon */}
      <motion.a
        href="https://www.linkedin.com/in/jyotpatel28/" // <-- FIX: Updated URL
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: neutralGray }}
        whileHover={{ color: shamrockGreen, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </motion.a>
    </div>
  );
}