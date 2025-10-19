import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const WeeklyAverageViewsChart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('Weekly');
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  // Design system colors matching Figma
  const colors = {
    primary: '#962DFF',      // Active/highlighted bar
    secondary: '#F0E5FC',    // Disabled/default bars
    background: '#FFF',
    textPrimary: '#1E1B39',
    textSecondary: '#615E83',
    gridLine: '#E5E5EF',
    containerShadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)',
    dropdownBg: '#F8F8FF',
    tooltipBg: '#1E1B39',
    tooltipText: '#FFF'
  };

  // Mock data for weekly average views
  const mockData = [
    { name: 'MON', value: 1700, active: false },
    { name: 'TUE', value: 850, active: false },
    { name: 'WED', value: 1850, active: false },
    { name: 'THU', value: 1100, active: false },
    { name: 'FRI', value: 3000, active: true }, // Friday is active/current day
    { name: 'SAT', value: 600, active: false },
    { name: 'SUN', value: 1550, active: false }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 300);
  }, [period]);

  const maxValue = Math.max(...data.map(d => d.value), 3000);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && hoveredValue) {
      return (
        <div 
          className="rounded-[8px] px-[13px] py-[8px] text-[16px] font-normal text-center"
          style={{ 
            background: colors.tooltipBg,
            color: colors.tooltipText
          }}
        >
          {hoveredValue.toLocaleString()}
        </div>
      );
    }
    return null;
  };

  const CustomDropdown = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <div 
          className="flex items-center justify-between px-[16px] py-[10px] rounded-[20px] cursor-pointer w-[121px] h-[40px]"
          style={{ background: colors.dropdownBg }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span 
            className="text-[14px] font-normal"
            style={{ color: colors.textSecondary }}
          >
            {value}
          </span>
          <div className="w-[10px] h-[6px] relative">
            <div 
              className="absolute w-[1px] h-[7px] rounded-[5px] rotate-[-45deg]"
              style={{ background: '#D9D9D9', left: '0px', top: '0px' }}
            />
            <div 
              className="absolute w-[1px] h-[7px] rounded-[5px]"
              style={{ background: '#D9D9D9', left: '4px', top: '0px' }}
            />
          </div>
        </div>
        
        {isOpen && (
          <div 
            className="absolute right-0 top-[45px] rounded-[20px] shadow-lg z-10 w-[121px]"
            style={{ background: colors.dropdownBg }}
          >
            {options.map((option) => (
              <div
                key={option}
                className="px-[16px] py-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.1)] text-[14px]"
                style={{ color: colors.textSecondary }}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-[410px] relative">
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
            className="text-[18px] font-normal leading-[20px] mb-1"
            style={{ color: colors.textSecondary }}
          >
            Activity
          </div>
          <div 
            className="text-[22px] font-bold leading-[28px]"
            style={{ color: colors.textPrimary }}
          >
            Average views
          </div>
        </div>

        {/* Dropdown */}
        <div className="absolute right-[33px] top-[38px]">
          <CustomDropdown
            value={period}
            onChange={setPeriod}
            options={['Weekly', 'Monthly', 'Yearly']}
          />
        </div>

        {/* Divider */}
        <div 
          className="absolute left-[33px] top-[106px] w-[443px] h-[1px]"
          style={{ background: colors.gridLine }}
        />

        {/* Chart Area */}
        <div className="absolute left-[77px] top-[161px] w-[397px] h-[184px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-[16px]" style={{ color: colors.textSecondary }}>
                Loading...
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                onMouseMove={(e) => {
                  if (e && e.activeTooltipIndex !== undefined) {
                    setHoveredIndex(e.activeTooltipIndex);
                    if (data[e.activeTooltipIndex]) {
                      setHoveredValue(data[e.activeTooltipIndex].value);
                    }
                  }
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setHoveredValue(null);
                }}
              >
                <CartesianGrid 
                  strokeDasharray="none" 
                  vertical={false} 
                  stroke={colors.gridLine}
                />
                
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 12, 
                    fill: colors.textSecondary,
                    fontFamily: 'Inter'
                  }}
                />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, maxValue]}
                  ticks={[0, 1000, 2000, 3000]}
                  tick={{ 
                    fontSize: 14, 
                    fill: colors.textSecondary,
                    fontFamily: 'Inter'
                  }}
                  tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}k`}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Bar 
                  dataKey="value" 
                  radius={[7, 7, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.active || hoveredIndex === index ? colors.primary : colors.secondary}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Y-axis Labels */}
        <div className="absolute left-[33px] top-[153px] w-[17px] h-[193px]">
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', bottom: '0px' }}
          >
            0
          </div>
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '118px' }}
          >
            1k
          </div>
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '59px' }}
          >
            2k
          </div>
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '0px' }}
          >
            3k
          </div>
        </div>

        {/* Days Labels */}
        <div className="absolute left-[77px] top-[363px] w-[401px] h-[14px] flex justify-between">
          {data.map((item, index) => (
            <span 
              key={item.name}
              className="text-[12px] font-normal text-center"
              style={{ color: colors.textSecondary, width: '29px' }}
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* Hover Stat Tooltip - positioned dynamically */}
        {hoveredIndex !== null && hoveredValue && (
          <div 
            className="absolute w-[68px] h-[42px] pointer-events-none"
            style={{ 
              left: `${90 + hoveredIndex * 57}px`, 
              top: '143px'
            }}
          >
            <div 
              className="w-full h-[36px] rounded-[8px] flex items-center justify-center"
              style={{ background: colors.tooltipBg }}
            >
              <span 
                className="text-[16px] font-normal text-center"
                style={{ color: colors.tooltipText }}
              >
                {hoveredValue.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyAverageViewsChart;
