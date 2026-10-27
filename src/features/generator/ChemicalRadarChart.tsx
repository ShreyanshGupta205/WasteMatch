import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface ChemicalRadarChartProps {
  className?: string;
}

export const ChemicalRadarChart: React.FC<ChemicalRadarChartProps> = ({ className = '' }) => {
  // Normalized 0-100 radar metric for the sample spent pickle liquor
  const data = [
    { subject: 'Acidity (Low pH)', value: 92, fullMark: 100 },
    { subject: 'Iron Content', value: 95, fullMark: 100 },
    { subject: 'Chloride Load', value: 88, fullMark: 100 },
    { subject: 'Corrosivity', value: 96, fullMark: 100 },
    { subject: 'Metals (Pb/Cr)', value: 24, fullMark: 100 },
    { subject: 'Organics', value: 15, fullMark: 100 },
  ];

  return (
    <div className={`w-full h-56 flex flex-col items-center justify-center p-1 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="62%" data={data} margin={{ top: 10, right: 25, bottom: 10, left: 25 }}>
          <PolarGrid stroke="#EBE7E4" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#555150', fontSize: 10, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Chemical Profile"
            dataKey="value"
            stroke="#D1343A"
            fill="#D1343A"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
