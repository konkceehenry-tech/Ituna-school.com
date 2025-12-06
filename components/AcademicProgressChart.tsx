import React, { useState } from 'react';
// FIX: Imported Student type from the correct types file instead of mockData.
import { Student } from '../types';

interface AcademicProgressChartProps {
  academicHistory: Student['academicHistory'];
}

const AcademicProgressChart: React.FC<AcademicProgressChartProps> = ({ academicHistory }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chartData = academicHistory
    .map(termData => {
      if (termData.records.length === 0) {
        return { term: termData.term, average: 0 };
      }
      const total = termData.records.reduce((sum, record) => sum + record.grade, 0);
      const average = Math.round(total / termData.records.length);
      return { term: termData.term, average };
    })
    .reverse();

  if (chartData.length < 2) {
    return (
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Academic Progress</h3>
        <p className="text-gray-400">Not enough data to display a trend. At least two terms of data are required.</p>
      </div>
    );
  }
  
  const width = 500;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const yMin = 50; 
  const yMax = 100;
  
  const xScale = (index: number) => padding.left + (index / (chartData.length - 1)) * chartWidth;
  const yScale = (grade: number) => padding.top + chartHeight - ((Math.max(grade, yMin) - yMin) / (yMax - yMin)) * chartHeight;

  const linePoints = chartData.map((d, i) => `${xScale(i)},${yScale(d.average)}`);
  const linePath = `M ${linePoints.join(' L ')}`;
  const areaPath = `${linePath} L ${xScale(chartData.length - 1)},${yScale(yMin)} L ${xScale(0)},${yScale(yMin)} Z`;
  
  const yAxisLabels = [50, 60, 70, 80, 90, 100];

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Academic Progress Trend</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-labelledby="chart-title" role="img">
        <title id="chart-title">A line chart showing the student's average grade over past terms.</title>
        
        <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
        </defs>
        
        {yAxisLabels.map(label => (
          <g key={label} className="text-gray-700">
            <line 
              x1={padding.left} y1={yScale(label)} 
              x2={width - padding.right} y2={yScale(label)} 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeDasharray="2,2" 
            />
            <text x={padding.left - 8} y={yScale(label) + 4} textAnchor="end" fontSize="10" fill="currentColor" className="text-gray-400">
              {label}%
            </text>
          </g>
        ))}
        
        {chartData.map((d, i) => (
           <text key={d.term} x={xScale(i)} y={height - padding.bottom + 15} textAnchor="middle" fontSize="10" fill="currentColor" className="text-gray-400">
             {d.term.replace(/ \d{4}/, '')}
           </text>
        ))}

        <path d={areaPath} fill="url(#areaGradient)" />

        <path
          d={linePath}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {chartData.map((d, i) => (
          <g key={`point-${i}`} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} className="cursor-pointer">
            <circle
              cx={xScale(i)}
              cy={yScale(d.average)}
              r={hoveredIndex === i ? 6 : 4}
              fill="#38bdf8"
              stroke="#1f2937"
              strokeWidth="2"
              style={{ transition: 'r 0.2s ease-in-out' }}
            />
            <circle
              cx={xScale(i)}
              cy={yScale(d.average)}
              r="10"
              fill="transparent"
            />
          </g>
        ))}

        {hoveredIndex !== null && (() => {
            const d = chartData[hoveredIndex];
            const x = xScale(hoveredIndex);
            const y = yScale(d.average);
            
            let tooltipX = x - 50;
            if (tooltipX < padding.left) tooltipX = padding.left;
            if (tooltipX + 100 > width - padding.right) tooltipX = width - padding.right - 100;

            let tooltipY = y - 55;
            if (tooltipY < padding.top) tooltipY = y + 15;

            return (
                <g transform={`translate(${tooltipX}, ${tooltipY})`} className="pointer-events-none transition-opacity" style={{ opacity: 1 }}>
                    <rect width="100" height="45" rx="4" fill="rgba(0,0,0,0.8)" />
                    <text x="50" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        {d.term}
                    </text>
                    <text x="50" y="34" textAnchor="middle" fill="#e5e7eb" fontSize="12">
                        Average: {d.average}%
                    </text>
                </g>
            )
        })()}
      </svg>
    </div>
  );
};

export default AcademicProgressChart;