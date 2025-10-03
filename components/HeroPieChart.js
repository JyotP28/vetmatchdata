// components/HeroPieChart.js
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Your shamrock green theme colors
const COLORS = ['#009933', '#d3d3d3']; // [Matched, Unmatched]

export default function HeroPieChart({ annualData }) {
  // We'll calculate the overall match rate for the latest year (2025)
  const latestYearData = annualData.filter(d => d.Year === 2025);
  
  const totalOffered = latestYearData.reduce((sum, item) => sum + item.Positions_Offered, 0);
  const totalMatched = latestYearData.reduce((sum, item) => sum + item.Positions_Matched, 0);
  const totalUnmatched = totalOffered - totalMatched;

  const chartData = [
    { name: 'Matched', value: totalMatched },
    { name: 'Unmatched', value: totalUnmatched },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Tooltip formatter={(value) => `${value} Positions`} />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}