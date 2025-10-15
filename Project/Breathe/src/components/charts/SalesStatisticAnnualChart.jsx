import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const SalesStatisticAnnualChart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('Annual');
  const [loading, setLoading] = useState(false);

  // Design system colors matching Figma
  const colors = {
    segment1: '#962DFF',     // Top segment - primary purple
    segment2: '#C893FD',     // Second segment - medium purple
    segment3: '#E0C6FD',     // Third segment - light purple
    segment4: '#F0E5FC',     // Bottom segment - lightest purple
    segment5: '#9291A5',     // Additional segment - gray
    trendLine: '#FF718B',    // Trend line - pink/red
    background: '#FFF',
    textPrimary: '#1E1B39',
    textSecondary: '#615E83',
    gridLine: '#E5E5EF',
    containerShadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)',
    dropdownBg: '#F8F8FF'
  };

  // Mock data for annual sales statistic
  const mockData = [
    {
      name: '2017',
      segment1: 550000,   // Top segment
      segment2: 450000,   // Second from top
      segment3: 400000,   // Third from top 
      segment4: 300000,   // Bottom segment
      trendValue: 1200000,
      totalValue: 1700000
    },
    {
      name: '2018',
      segment1: 400000,
      segment2: 350000,
      segment3: 250000,
      segment4: 200000,
      trendValue: 950000,
      totalValue: 1200000
    },
    {
      name: '2019',
      segment1: 850000,
      segment2: 700000,
      segment3: 600000,
      segment4: 450000,
      segment5: 400000,
      trendValue: 2100000,
      totalValue: 3000000
    },
    {
      name: '2020',
      segment1: 400000,
      segment2: 350000,
      segment3: 250000,
      segment4: 200000,
      trendValue: 1050000,
      totalValue: 1200000
    },
    {
      name: '2021',
      segment1: 400000,
      segment2: 350000,
      segment3: 250000,
      segment4: 200000,
      trendValue: 1050000,
      totalValue: 1200000
    },
    {
      name: '2022',
      segment1: 400000,
      segment2: 350000,
      segment3: 250000,
      segment4: 200000,
      trendValue: 1050000,
      totalValue: 1200000
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 300);
  }, [period]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload.find(p => p.dataKey === 'trendValue');
      if (data) {
        return (
          <div 
            className="rounded-[8px] px-[16px] py-[8px] text-[16px] font-normal text-center"
            style={{ 
              background: colors.textPrimary,
              color: '#FFFFFF'
            }}
          >
            ${(data.value / 1000000).toFixed(1)}M
          </div>
        );
      }
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

  // Custom Bar component to create stacked appearance
  const CustomBar = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const segments = [
      { key: 'segment1', color: colors.segment1 },
      { key: 'segment2', color: colors.segment2 },
      { key: 'segment3', color: colors.segment3 },
      { key: 'segment4', color: colors.segment4 },
      { key: 'segment5', color: colors.segment5 }
    ];

    const totalValue = payload.totalValue || 1;
    let currentY = y + height;
    
    return (
      <g>
        {segments.map((segment, index) => {
          const segmentValue = payload[segment.key] || 0;
          const segmentHeight = (segmentValue / totalValue) * height;
          const segmentY = currentY - segmentHeight;
          
          currentY = segmentY;
          
          return (
            <rect
              key={segment.key}
              x={x}
              y={segmentY}
              width={width}
              height={segmentHeight}
              fill={segment.color}
              rx={index === 0 ? 10 : 0} // Rounded top only for first segment
              ry={index === 0 ? 10 : 0}
            />
          );
        })}
      </g>
    );
  };

  return (
    <div className="w-full h-[384px] relative">
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
            Statistics
          </div>
          <div 
            className="text-[22px] font-bold leading-[28px]"
            style={{ color: colors.textPrimary }}
          >
            Sales statistic
          </div>
        </div>

        {/* Dropdown */}
        <div className="absolute right-[33px] top-[38px]">
          <CustomDropdown
            value={period}
            onChange={setPeriod}
            options={['Annual', 'Quarterly', 'Monthly']}
          />
        </div>

        {/* Divider */}
        <div 
          className="absolute left-[33px] top-[106px] w-[444px] h-[1px]"
          style={{ background: colors.gridLine }}
        />

        {/* Chart Area */}
        <div className="absolute left-[72px] top-[151px] w-[405px] h-[161px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-[16px]" style={{ color: colors.textSecondary }}>
                Loading...
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
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
                    fontSize: 14, 
                    fill: colors.textSecondary,
                    fontFamily: 'Inter'
                  }}
                />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 3000000]}
                  ticks={[0, 1000000, 2000000, 3000000]}
                  tick={{ 
                    fontSize: 14, 
                    fill: colors.textSecondary,
                    fontFamily: 'Inter'
                  }}
                  tickFormatter={(value) => value === 0 ? '0' : `${value / 1000000}M`}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                {/* Stacked Bars */}
                <Bar 
                  dataKey="totalValue"
                  shape={<CustomBar />}
                />
                
                {/* Trend Line */}
                <Line 
                  type="monotone"
                  dataKey="trendValue" 
                  stroke={colors.trendLine}
                  strokeWidth={2}
                  dot={{ fill: colors.trendLine, strokeWidth: 2, stroke: '#FFFFFF', r: 3.5 }}
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Y-axis Labels */}
        <div className="absolute left-[33px] top-[144px] w-[22px] h-[169px]">
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', bottom: '0px' }}
          >
            0
          </div>
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '105px' }}
          >
            1M
          </div>
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '52px' }}
          >
            2M
          </div>
          <div 
            className="absolute text-[14px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '0px' }}
          >
            3M
          </div>
        </div>

        {/* Years Labels */}
        <div className="absolute left-[72px] top-[328px] w-[405px] flex justify-between">
          {data.map((item) => (
            <span 
              key={item.name}
              className="text-[14px] font-normal text-center"
              style={{ color: colors.textSecondary, width: '32px' }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesStatisticAnnualChart;
