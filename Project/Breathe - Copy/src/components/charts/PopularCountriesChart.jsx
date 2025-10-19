import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PopularCountriesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Color palette matching the Figma design
  const colors = {
    primary: '#4A3AFF',      // Primary purple (USA)
    secondary: '#962DFF',    // Secondary purple (UK)
    tertiary: '#E0C6FD',     // Light purple (Canada)
    quaternary: '#C6D2FD',   // Light blue (Australia)
    background: '#FFFFFF',
    textPrimary: '#1E1B39',
    textSecondary: '#9291A5',
    gridLine: '#E5E5EF',
    containerShadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)'
  };

  const mockData = [
    { 
      name: 'USA', 
      value: 175, 
      color: colors.primary,
      maxValue: 175
    },
    { 
      name: 'Canada', 
      value: 130, 
      color: colors.tertiary,
      maxValue: 175
    },
    { 
      name: 'UK', 
      value: 98, 
      color: colors.secondary,
      maxValue: 175
    },
    { 
      name: 'Australia', 
      value: 50, 
      color: colors.quaternary,
      maxValue: 175
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 300);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="rounded-[8px] px-[16px] py-[8px] text-[16px] font-normal text-center"
          style={{ 
            background: '#1E1B39',
            color: '#FFFFFF'
          }}
        >
          {`${payload[0].value}%`}
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { fill, width, height, x, y, payload } = props;
    const maxWidth = 175; // Max width for 100%
    const actualWidth = (payload.value / 100) * maxWidth;
    
    return (
      <rect
        x={x}
        y={y}
        width={actualWidth}
        height={height}
        fill={fill}
        rx={4}
        ry={4}
      />
    );
  };

  return (
    <div className="w-full h-[305px] relative">
      {/* Container */}
      <div 
        className="w-full h-full rounded-[20px] relative"
        style={{ 
          background: colors.background,
          boxShadow: colors.containerShadow 
        }}
      >
        {/* Header */}
        <div className="absolute left-[33px] top-[32px]">
          <div 
            className="text-[14px] font-normal leading-[16px] mb-1"
            style={{ color: colors.textSecondary }}
          >
            Statistics
          </div>
          <div 
            className="text-[18px] font-bold leading-[24px]"
            style={{ color: colors.textPrimary }}
          >
            Popular countries
          </div>
        </div>

        {/* Chart Area */}
        <div className="absolute left-[33px] top-[102px] w-[240px] h-[131px]">
          {/* Country Labels */}
          <div className="absolute left-0 top-0 w-[58px] h-full flex flex-col justify-between">
            {data.map((item, index) => (
              <div 
                key={item.name}
                className="text-[14px] font-normal h-[16px] flex items-center"
                style={{ color: colors.textSecondary }}
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* Bars Container */}
          <div className="absolute left-[107px] top-0 w-[175px] h-full flex flex-col justify-between">
            {data.map((item, index) => (
              <div key={item.name} className="h-[12px] relative">
                {/* Background bar */}
                <div 
                  className="absolute left-0 top-0 w-full h-full rounded-[4px]"
                  style={{ background: '#F0F0F0' }}
                />
                {/* Data bar */}
                <div 
                  className="absolute left-0 top-0 h-full rounded-[4px] transition-all duration-500"
                  style={{ 
                    background: item.color,
                    width: `${(item.value / 100) * 100}%`
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Percentage Labels */}
        <div className="absolute left-[107px] top-[257px] w-[196px] flex justify-between">
          <span 
            className="text-[14px] font-normal"
            style={{ color: colors.textSecondary }}
          >
            0%
          </span>
          <span 
            className="text-[14px] font-normal"
            style={{ color: colors.textSecondary }}
          >
            50%
          </span>
          <span 
            className="text-[14px] font-normal"
            style={{ color: colors.textSecondary }}
          >
            100%
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[16px]" style={{ color: colors.textSecondary }}>
              Loading...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularCountriesChart;
