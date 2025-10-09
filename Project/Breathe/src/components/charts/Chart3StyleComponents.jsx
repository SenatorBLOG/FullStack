import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Chart 3 Color Palette (from Figma design)
export const Chart3Colors = {
  primary: '#3A82F7',      // Active blue (primary data)
  secondary: '#BDDEFF',    // Light blue (secondary data, text, disabled)
  background: 'rgba(84, 164, 244, 0.13)', // Transparent blue background
  containerBg: '#FFFFFF',   // White container background
  textPrimary: '#BDDEFF',   // Light blue text
  textSecondary: '#98CCFF', // Slightly darker blue text
  gridLines: '#CFCFCF',     // Grid line color
  shadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)', // Container shadow

  // для баров
  segment1: '#70B8FF',
  segment2: '#62aafb',
  segment3: '#549bf6',
  segment4: '#387ded',

  // для линии
  linePrimary: '#387DED',

  // сетка
  gridLine: '#70B8FF',

};

// Chart 3 Blue Container (like the original Chart 3)
export const Chart3BlueContainer = ({ children, title, subtitle, className = "", width = "100%", height = "425px", variant = "blue" }) => (
  <div className={`relative ${className}`} style={{ width, height }}>
    <div 
      className="w-full h-full rounded-[20px]"
      style={{ 
        background: Chart3Colors.background,
        boxShadow: Chart3Colors.shadow 
      }}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="absolute left-[66px] top-[33px]">
          {subtitle && (
            <div 
              className="text-[18px] font-normal leading-[20px] mb-1"
              style={{ color: Chart3Colors.textSecondary }}
            >
              {subtitle}
            </div>
          )}
          {title && (
            <div 
              className="text-[22px] font-bold leading-[28px]"
              style={{ color: Chart3Colors.textPrimary }}
            >
              {title}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  </div>
);

// Custom Tooltip styled like Chart 3
export const Chart3Tooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="rounded-[8px] px-[16px] py-[8px] text-[16px] font-normal leading-[18px]"
        style={{ 
          background: '#D9D9D9',
          color: '#12294E'
        }}
      >
        {`${payload[0].value}`}
      </div>
    );
  }
  return null;
};

// Chart 3 Bar Chart Component
export const Chart3BarChart = ({ data, dataKey = "value", className = "", ...props }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 100, right: 30, left: 100, bottom: 80 }}>
      <XAxis 
        dataKey="name" 
        axisLine={false}
        tickLine={false}
        tick={{ 
          fontSize: 12, 
          fill: Chart3Colors.textPrimary,
          fontFamily: 'Montserrat'
        }}
      />
      <YAxis 
        axisLine={false}
        tickLine={false}
        tick={{ 
          fontSize: 14, 
          fill: Chart3Colors.textPrimary,
          fontFamily: 'Montserrat',
          textAnchor: 'end'
        }}
      />
      <Tooltip content={<Chart3Tooltip />} />
      <Bar 
        dataKey={dataKey} 
        fill={Chart3Colors.secondary}
        radius={[7, 7, 0, 0]}
        {...props}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.active ? Chart3Colors.primary : Chart3Colors.secondary} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

// Chart 3 Line Chart Component
export const Chart3LineChart = ({ data, dataKey = "value", strokeColor = Chart3Colors.primary, className = "", ...props }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <XAxis 
        dataKey="name" 
        axisLine={false}
        tickLine={false}
        tick={{ 
          fontSize: 12, 
          fill: Chart3Colors.textPrimary,
          fontFamily: 'Montserrat'
        }}
      />
      <YAxis 
        axisLine={false}
        tickLine={false}
        tick={{ 
          fontSize: 14, 
          fill: Chart3Colors.textPrimary,
          fontFamily: 'Montserrat'
        }}
      />
      <Tooltip content={<Chart3Tooltip />} />
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={strokeColor}
        strokeWidth={3}
        dot={{ fill: strokeColor, strokeWidth: 2, stroke: '#FFFFFF', r: 6 }}
        {...props}
      />
    </LineChart>
  </ResponsiveContainer>
);

// Chart 3 Pie Chart Component
export const Chart3PieChart = ({ data, className = "", ...props }) => {
  const COLORS = ['#4A3AFF', '#962DFF', '#E0C6FD', '#C6D2FD'];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          {...props}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<Chart3Tooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Chart 3 Metric Card
export const Chart3MetricCard = ({ title, subtitle, value, change, 
    changeType = 'neutral', // 'positive'|'negative'|'neutral'
   icon, width = "332px", height = "225px",children }) => (
  <Chart3BlueContainer title={title} subtitle={subtitle} width={width} height={height}>
    <div className="absolute left-[33px] bottom-[33px]">
      <div 
        className="text-[44px] font-bold leading-[52px] mb-2"
        style={{ color: '#1E1B39' }}
      >
        {value}
      </div>
      {change && (
        <div className="flex items-center gap-2">
          <span 
            className="text-[14px] font-normal leading-[16px]"
            style={{ color: changeType === 'positive' ? '#04CE00' : '#FF718B' }}
          >
            {changeType === 'positive' ? '+' : ''}{change}%
          </span>
          <div 
            className="w-[15px] h-[10px]"
            style={{ 
              background: changeType === 'positive' ? '#04CE00' : '#FF718B',
              transform: changeType === 'positive' ? 'rotate(0deg)' : 'rotate(180deg)'
            }}
          />
        </div>
      )}
    </div>
    {icon && (
      <div className="absolute right-[33px] top-[50%] transform -translate-y-1/2">
        {icon}
      </div>
    )}
    {children}
  </Chart3BlueContainer>
);

export const Chart3Dropdown = ({ value, onChange, options, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закрытие меню при клике вне области
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      style={{ background: Chart3Colors.background, borderRadius: '20px' }}
    >
      {/* Основная кнопка */}
      <div
        className="flex items-center justify-between px-5 py-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className="text-[14px] font-normal leading-[16px]"
          style={{ color: Chart3Colors.textPrimary }}
        >
          {value}
        </span>

        {/* Стрелочка */}
        <div className="w-[10px] h-[6px] relative">
          <div
            className={`absolute w-[1px] h-[7px] rounded-sm transition-transform duration-200 ${
              isOpen ? 'rotate-[135deg] top-[2px] left-[3px]' : 'rotate-45 left-[0px] top-[0px]'
            }`}
            style={{ background: '#D9D9D9' }}
          />
          <div
            className={`absolute w-[1px] h-[7px] rounded-sm transition-transform duration-200 ${
              isOpen ? '-rotate-[135deg] top-[2px] left-[6px]' : 'rotate-[315deg] left-[4px] top-[0px]'
            }`}
            style={{ background: '#D9D9D9' }}
          />
        </div>
      </div>

      {/* Выпадающее меню */}
      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-full rounded-[20px] shadow-md z-10 overflow-hidden"
          style={{ background: Chart3Colors.background }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              className={`px-5 py-2 cursor-pointer text-[14px] transition-colors duration-150 ${
                opt === value
                  ? 'font-medium'
                  : 'hover:bg-[#1C345D]'
              }`}
              style={{ color: Chart3Colors.textPrimary }}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


