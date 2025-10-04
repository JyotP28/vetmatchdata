import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import useWindowSize from '../hooks/useWindowSize';

const shamrockGreen = '#009933';

// shortens long text in dropdown menu
const truncate = (str, n) => {
  return (str.length > n) ? str.substr(0, n - 1) + '…' : str;
};

// truncates text to a single line 
const CustomYAxisTick = ({ x, y, payload, fontSize }) => {
  // max of 20 characters
  const truncatedText = truncate(payload.value, 20);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="end" fill="#666" fontSize={fontSize} dominantBaseline="middle">
        {truncatedText}
      </text>
    </g>
  );
};


export default function CompetitionChart({ specialtyData }) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const leftMargin = isMobile ? 100 : 140;
  const barSize = isMobile ? 20 : 30;
  const labelFontSize = isMobile ? 14 : 14;
  const tickFontSize = isMobile ? 12 : 14;

  const competitionData = specialtyData
    .filter(item => item.Year === 2025 && item.Program_Type === 'Residency' && item.Positions_Offered > 0)
    .map(item => ({
      name: item.Specialty, 
      ratio: parseFloat((item.Total_Applicants / item.Positions_Offered).toFixed(2)),
      applicants: item.Total_Applicants,
      positions: item.Positions_Offered,
    }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 5);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
          <p style={{ fontWeight: 'bold', margin: 0 }}>{data.name}</p>
          <p>{data.applicants} Applicants</p>
          <p>{data.positions} Positions</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div>
      <h2 style={{ fontWeight: 600, color: '#333', marginBottom: '0rem' }}>Most Competitive Residencies for 2025</h2>
      <p style={{ color: '#555', marginTop: '0.5rem' }}>Based on applicants per available position.</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={competitionData}
          layout="vertical"
          margin={{ top: 20, right: 40, left: leftMargin, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={<CustomYAxisTick fontSize={tickFontSize} />}
            interval={0}
          />
          <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
          <Bar dataKey="ratio" barSize={barSize} fill={shamrockGreen}>
            <LabelList dataKey="ratio" position="right" fill="#333" fontSize={labelFontSize} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}