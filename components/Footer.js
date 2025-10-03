// components/Footer.js
import React from 'react';
import Link from 'next/link'; // Import the Link component
import SocialLinks from './SocialLinks';

const footerStyle = {
  width: '100%',
  padding: '2rem 0',
  textAlign: 'center',
  color: '#888',
  fontSize: '0.9rem',
};

const linkStyle = {
  color: '#009933',
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '0 10px', // Add margin for spacing
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p style={{ margin: '0.25rem' }}>
        © {new Date().getFullYear()} VetMatchData
      </p>
      <p style={{ margin: '0.25rem' }}>
        Created by Jyot Patel, DVM Student at Washington State University
      </p>
      <div style={{ marginTop: '1rem' }}>
        <SocialLinks />
        <div style={{ marginTop: '1rem' }}>
          {/* NEW: Link to the About page */}
          <Link href="/about" style={linkStyle}>
            About the Data
          </Link>
        </div>
      </div>
    </footer>
  );
}