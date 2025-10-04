// components/SchoolView.js
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../styles/Explore.module.css';

const lineStyleProps = {
  strokeWidth: 2,
  dot: { r: 4 },
  activeDot: { r: 6 },
};

const toggleContainerStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' };
const toggleLabelStyle = { marginRight: '10px', fontWeight: 'bold' };
const switchStyle = { position: 'relative', display: 'inline-block', width: '50px', height: '24px' };
const sliderStyle = { position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ffffffff', transition: '.4s', borderRadius: '24px' };
const sliderBeforeStyle = { position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' };

export default function SchoolView({ schoolData, annualData }) { 
  // --- FIX: All Hooks have been moved to the top of the component ---
  const [showAsPercentage, setShowAsPercentage] = useState(false);
  
  // Added a safety check `|| []` to prevent errors if schoolData is temporarily unavailable
  const schoolNames = useMemo(() => [...new Set((schoolData || []).map(item => item.School_Name))].sort(), [schoolData]);
  
  const [selectedSchool, setSelectedSchool] = useState(schoolNames[0]);

  const nationalRates = useMemo(() => {
    if (!annualData) return []; // Safety check inside the hook
    const byYear = {};
    annualData.forEach(item => {
      if (!byYear[item.Year]) { byYear[item.Year] = {}; }
      if (item.Program_Type === 'Internship') { byYear[item.Year].nationalInternshipMatchRate = (item.Positions_Matched / item.Total_Applicants) * 100; } 
      else if (item.Program_Type === 'Residency') { byYear[item.Year].nationalResidencyMatchRate = (item.Positions_Matched / item.Total_Applicants) * 100; }
    });
    return Object.entries(byYear).map(([year, data]) => ({ Year: parseInt(year), ...data }));
  }, [annualData]);
  
  // --- FIX: The early return / safety check is now AFTER the hooks ---
  if (!schoolData || !annualData || schoolNames.length === 0) { 
    return <div>Loading data...</div>; 
  }

  const processedData = schoolData
    .filter(school => school.School_Name === selectedSchool)
    .map(item => {
      const totalInternshipApplicants = item.Applied_to_Internship + item.Applied_to_Both;
      const totalResidencyApplicants = item.Applied_to_Residency + item.Applied_to_Both;
      const matchedResidency = item.Total_Matched - item.Matched_Internship;
      const rates = nationalRates.find(rate => rate.Year === item.Year) || {};
      return {
        ...item, totalInternshipApplicants, totalResidencyApplicants, Matched_Residency: matchedResidency,
        internshipMatchRate: totalInternshipApplicants > 0 ? (item.Matched_Internship / totalInternshipApplicants) * 100 : 0,
        residencyMatchRate: totalResidencyApplicants > 0 ? (matchedResidency / totalResidencyApplicants) * 100 : 0,
        ...rates,
      };
    })
    .sort((a, b) => a.Year - b.Year);

  return (
    <div style={{ width: '100%' }}>

            <p style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '1rem', backgroundColor: 'rgba(230, 240, 230, 0.5)', borderRadius: '8px', lineHeight: '1.6' }}>
              This dashboard visualizes historical trends on a school-specific basis. Total internship and residency applicants are reflective of applicants to the individual categories and summed with the number of applicants appplying to both in the same cycle. 
            </p>

      <div className={styles.controlsContainer}>
        <div className={styles.selectGroup}>
          <label htmlFor="school-select" className={styles.selectLabel}>Select a School:</label>
          <select id="school-select" value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)} className={styles.selectDropdown}>
            {schoolNames.map(name => (<option key={name} value={name}>{name}</option>))}
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

      <h2>{selectedSchool}: Internship Stats</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={processedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          {showAsPercentage ? <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} /> : <YAxis />}
          <Tooltip formatter={(value) => showAsPercentage ? `${value.toFixed(1)}%` : value} />
          <Legend verticalAlign="bottom" align="center" />
          {showAsPercentage
            ? <>
                <Line type="monotone" name="School Match Rate" dataKey="internshipMatchRate" stroke="#009933" {...lineStyleProps} />
                <Line type="monotone" name="National Match Rate" dataKey="nationalInternshipMatchRate" stroke="#888888" strokeDasharray="3 3" {...lineStyleProps} />
              </>
            : <>
                <Line type="monotone" name="Applicants" dataKey="totalInternshipApplicants" stroke="#8884d8" {...lineStyleProps} />
                <Line type="monotone" name="Matched" dataKey="Matched_Internship" stroke="#82ca9d" {...lineStyleProps} />
              </>
          }
        </LineChart>
      </ResponsiveContainer>

      <h2 style={{marginTop: '3rem'}}>{selectedSchool}: Residency Stats</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={processedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          {showAsPercentage ? <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} /> : <YAxis />}
          <Tooltip formatter={(value) => showAsPercentage ? `${value.toFixed(1)}%` : value} />
          <Legend verticalAlign="bottom" align="center" />
          {showAsPercentage
            ? <>
                <Line type="monotone" name="School Match Rate" dataKey="residencyMatchRate" stroke="#009933" {...lineStyleProps} />
                <Line type="monotone" name="National Match Rate" dataKey="nationalResidencyMatchRate" stroke="#888888" strokeDasharray="3 3" {...lineStyleProps} />
              </>
            : <>
                <Line type="monotone" name="Applicants" dataKey="totalResidencyApplicants" stroke="#8884d8" {...lineStyleProps} />
                <Line type="monotone" name="Matched" dataKey="Matched_Residency" stroke="#82ca9d" {...lineStyleProps} />
              </>
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}