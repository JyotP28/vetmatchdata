import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../styles/Explore.module.css';
import { event } from '../lib/gtag'; 

const truncate = (str, n) => {
  return (str.length > n) ? str.substr(0, n - 1) + '…' : str;
};

const lineStyleProps = {
  strokeWidth: 2,
  dot: { r: 4 },
  activeDot: { r: 6 },
};

const toggleContainerStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' };
const toggleLabelStyle = { marginRight: '10px', fontWeight: 'bold' };
const switchStyle = { position: 'relative', display: 'inline-block', width: '50px', height: '24px' };
const sliderStyle = { position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ccc', transition: '.4s', borderRadius: '24px' };
const sliderBeforeStyle = { position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' };

export default function InternshipView({ specialtyData }) {
  const [showAsPercentage, setShowAsPercentage] = useState(false);
  const specialtyNames = useMemo(() => {
    const names = new Set(specialtyData.filter(d => d.Program_Type === 'Internship').map(d => d.Specialty));
    return Array.from(names).sort();
  }, [specialtyData]);

  const [selectedSpecialty, setSelectedSpecialty] = useState(specialtyNames[0]);
  const chartData = useMemo(() => {
    return specialtyData.filter(d => d.Program_Type === 'Internship' && d.Specialty === selectedSpecialty).map(d => ({ ...d, matchRate: d.Total_Applicants > 0 ? (d.Positions_Matched / d.Total_Applicants) * 100 : 0 })).sort((a, b) => a.Year - b.Year);
  }, [specialtyData, selectedSpecialty]);

  // handles the dropdown events to send to GA
  const handleSpecialtyChange = (e) => {
    const newSpecialty = e.target.value;
    setSelectedSpecialty(newSpecialty);

    event({
      action: 'select_internship',
      category: 'Explore Page Filters',
      label: newSpecialty,
    });
  };

  return (
    <div>
      <p style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '1rem', backgroundColor: 'rgba(230, 240, 230, 0.5)', borderRadius: '8px', lineHeight: '1.6' }}>
        This dashboard visualizes trends for individual internship specialties. Select a specialty to see the year-over-year trend in applicants versus positions filled. The Match Rate % is calculated as (Positions Matched / Total Applicants).
      </p>

      <div className={styles.controlsContainer}>
        <div className={styles.selectGroup}>
          <label htmlFor="specialty-select" className={styles.selectLabel}>Select an Internship:</label>
          <select id="specialty-select" value={selectedSpecialty} onChange={handleSpecialtyChange} className={styles.selectDropdown}>
            {specialtyNames.map(name => (
              <option key={name} value={name}>{truncate(name, 30)}</option>
            ))}
          </select>
        </div>
        <label style={toggleContainerStyle} onClick={() => setShowAsPercentage(!showAsPercentage)}>
          <span style={toggleLabelStyle}>Show as %</span>
          <div style={switchStyle}>
            <div style={{...sliderStyle, backgroundColor: showAsPercentage ? '#009933' : '#ccc'}}>
              <div style={{...sliderBeforeStyle, transform: showAsPercentage ? 'translateX(26px)' : 'translateX(0px)'}} />
            </div>
          </div>
        </label>
      </div>

      <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>{selectedSpecialty} Internship Trends</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          {showAsPercentage ? <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} /> : <YAxis />}
          <Tooltip formatter={(value) => showAsPercentage ? `${value.toFixed(1)}%` : value} />
          <Legend verticalAlign="bottom" align="center" />
          {showAsPercentage ? <Line type="monotone" name="Match Rate" dataKey="matchRate" stroke="#009933" {...lineStyleProps} />
            : <>
                <Line type="monotone" name="Applicants" dataKey="Total_Applicants" stroke="#8884d8" {...lineStyleProps} />
                <Line type="monotone" name="Positions Matched" dataKey="Positions_Matched" stroke="#82ca9d" {...lineStyleProps} />
              </>
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}