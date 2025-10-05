import Head from 'next/head';
import Link from 'next/link';

const pageStyles = {
  fontFamily: 'sans-serif',
  padding: '2rem 5%',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: '1.7',
};

const headingStyles = {
  color: '#009933', // shamrock green theme color
};

const linkStyle = {
  color: '#009933',
  fontWeight: 'bold',
  textDecoration: 'none',
};

export default function AboutPage() {
  return (
    <div style={pageStyles}>
      <Head>
        <title>About the Data | VetMatchData</title>
      </Head>
      <Link href="/explore" style={{ ...linkStyle, display: 'block', marginBottom: '2rem' }}>
        &larr; Back to Explore
      </Link>

      <h1 style={headingStyles}>About the Data</h1>

      <h2 style={headingStyles}>Reason for Creation</h2>
      <p>
        Like many other vet students, I&apos;d say that I like numbers and data in general more than the average person. Seeing the boring presentation of the match numbers, and an interest in learning how to program, I saw an opportunity to make an improvement to this niche issue that maybe a handful of other people might be facing. I wanted to see historical trends without having to just copy paste a bunch of tables, and so this became a side project of mine. I learned how to use Next.JS as the backbone and had fun learning how to design and create a website and I encourage other students to do the same. 
      </p>

      <h2 style={headingStyles}>Data Source</h2>
      <p>
        The data presented on this site is compiled from the publicly available PDF summary reports published annually by the Veterinary Internship & Residency Matching Program (VIRMP).
      </p>

      <h2 style={headingStyles}>Data Processing</h2>
      <p>
        Each PDF was processed using a script to extract the tabular data into a structured JSON format. This process allows the data to be easily filtered, sorted, and visualized in ways that are not possible with the original static documents.
      </p>

      <h2 style={headingStyles}>A Note on Normalization</h2>
      <p>
        To enable historical trend analysis, some specialty and program names have been standardized or &quot;normalized&quot; across different years. The VIRMP has occasionally used slightly different terminology for the same program in different years.
      </p>
      <p>
        For example:
      </p>
      <ul>
        <li>A program called <strong>&quot;Small Animal Medicine/Surgery&quot;</strong> in 2015 and a program called <strong>&quot;Rotating - Small Animal&quot;</strong> in 2021 are treated as the same category for the purpose of tracking long-term trends.</li>
      </ul>
      <p>
        This normalization is a necessary step to compare data across years consistently. While every effort has been made to group categories logically, this is an interpretive process.
      </p>
      
      <h2 style={headingStyles}>Limitations</h2>
      <p>
        This is an independent project and is not affiliated with the VIRMP. All data is provided &quot;as-is&quot; based on the public reports, and while efforts have been made to ensure accuracy, minor transcription errors may exist.
      </p>
      
      <h2 style={headingStyles}>Contact & Feedback</h2>
      <p>
        Feel free to reach out to me if you have a suggestion for a new chart or notice an error?
      </p>
      <p>
        <a 
          href="mailto:your.email@wsu.edu?subject=VetMatchData Feedback" 
          style={linkStyle}
        >
          Send an Email
        </a>
      </p>
    </div>
  );
}