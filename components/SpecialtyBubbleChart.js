// components/SpecialtyBubbleChart.js
import React from 'react';
// --- REMOVED: Brush is no longer imported ---
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const generateColor = (index) => {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

export default function SpecialtyBubbleChart({ specialtyData }) {
  const filteredData = specialtyData.filter(item => item.Year === 2025 && item.Program_Type === 'Residency');

  const chartData = filteredData.map(item => ({
    ...item,
    ratio: item.Positions_Offered > 0 ? (item.Total_Applicants / item.Positions_Offered) : 0,
  }));
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
          <p style={{ fontWeight: 'bold', margin: 0 }}>{data.Specialty}</p>
          <p>Applicants: {data.Total_Applicants}</p>
          <p>Positions: {data.Positions_Offered}</p>
          <p>Applicants per Position: {Number(data.ratio).toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    // --- ADJUSTED: Reduced height slightly as we no longer need space for the brush ---
    <div style={{ width: '100%', height: 600, marginTop: '4rem' }}>
      <h2>Residency Specialty Competitiveness (2025)</h2>
      
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          // --- ADJUSTED: Bottom margin is smaller now that the brush is gone ---
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="Positions_Offered" 
            name="Positions Offered" 
          />
          <YAxis 
            type="number" 
            dataKey="Total_Applicants" 
            name="Total Applicants" 
          />
          <ZAxis type="number" dataKey="ratio" range={[100, 1000]} name="Applicants per Position" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          
          <Scatter name="Specialties" data={chartData}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${entry.Specialty}`} fill={generateColor(index)} />
            ))}
          </Scatter>

          {/* --- REMOVED: The <Brush /> component is now gone --- */}

        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}