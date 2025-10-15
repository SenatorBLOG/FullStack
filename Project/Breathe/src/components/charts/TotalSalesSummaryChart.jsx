import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const TotalSalesSummaryChart = () => {
  const [activeTab, setActiveTab] = useState('Weekly');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Design system colors matching Figma
  const colors = {
    smartphones: '#962DFF',    // Primary purple
    headphones: '#4A3AFF',     // Blue purple  
    cameras: '#E0C6FD',        // Light purple
    wearables: '#93AAFD',      // Light blue
    background: '#FFF',
    textPrimary: '#1E1B39',
    textSecondary: '#615E83',
    gridLine: '#E5E5EF',
    containerShadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)',
    tabBackground: '#F8F8FF',
    tabActive: '#1E1B39',
    highlightBg: '#F7F7FB',
    allCategoriesBg: '#9291A5',
    allCategoriesBorder: '#4A3AFF',
    allCategoriesText: '#4A3AFF'
  };

  // Mock data for sales summary
  const mockData = {
    'Daily': [
      {
        name: 'MON',
        smartphones: 250000,
        headphones: 450000,
        cameras: 1100000,
        wearables: 680000
      },
      {
        name: 'TUE',
        smartphones: 320000,
        headphones: 100000,
        cameras: 75000,
        wearables: 500000
      },
      {
        name: 'WED',
        smartphones: 340000,
        headphones: 880000,
        cameras: 670000,
        wearables: 440000,
        highlighted: true
      },
      {
        name: 'THU',
        smartphones: 350000,
        headphones: 260000,
        cameras: 470000,
        wearables: 135000
      },
      {
        name: 'FRI',
        smartphones: 50000,
        headphones: 75000,
        cameras: 245000,
        wearables: 115000
      },
      {
        name: 'SAT',
        smartphones: 750000,
        headphones: 520000,
        cameras: 420000,
        wearables: 640000
      },
      {
        name: 'SUN',
        smartphones: 850000,
        headphones: 610000,
        cameras: 420000,
        wearables: 200000
      }
    ]
  };

  const categories = [
    { name: 'Smartphones', color: colors.smartphones, percentage: '37%' },
    { name: 'Headphones', color: colors.headphones, percentage: '23%' },
    { name: 'Cameras', color: colors.cameras, percentage: '29%' },
    { name: 'Wearables', color: colors.wearables, percentage: '21%' }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData[activeTab] || mockData['Daily']);
      setLoading(false);
    }, 300);
  }, [activeTab]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="rounded-[8px] px-[16px] py-[8px] text-[14px] font-normal"
          style={{ 
            background: colors.textPrimary,
            color: '#FFFFFF'
          }}
        >
          <div className="font-medium mb-1">{label}</div>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: entry.color }}
              />
              <span>{entry.name}: ${(entry.value / 1000).toFixed(0)}k</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[537px] relative">
      {/* Container */}
      <div 
        className="w-full h-full rounded-[20px] relative"
        style={{ 
          background: colors.background,
          boxShadow: colors.containerShadow 
        }}
      >
        {/* Header */}
        <div className="absolute left-[32px] top-[35px]">
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
            Total summary of sales
          </div>
        </div>

        {/* Tab Filters */}
        <div className="absolute left-[482px] top-[32px] w-[239px] h-[49px]">
          <div 
            className="w-full h-full rounded-[14.769px] relative"
            style={{ background: colors.tabBackground }}
          >
            {/* Active Tab Background */}
            <div 
              className="absolute h-[37px] rounded-[13px] transition-all duration-300"
              style={{ 
                background: colors.tabActive,
                width: '79px',
                top: '6px',
                left: activeTab === 'Daily' ? '16px' : activeTab === 'Weekly' ? '74px' : '155px'
              }}
            />
            
            {/* Tab Labels */}
            <div className="flex items-center h-full px-[24px] justify-between">
              <button
                onClick={() => setActiveTab('Daily')}
                className={`text-[14px] font-normal transition-colors ${
                  activeTab === 'Daily' ? 'text-white' : 'text-[#9291A5]'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setActiveTab('Weekly')}
                className={`text-[14px] font-normal transition-colors ${
                  activeTab === 'Weekly' ? 'text-white' : 'text-[#9291A5]'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setActiveTab('Monthly')}
                className={`text-[14px] font-normal transition-colors ${
                  activeTab === 'Monthly' ? 'text-white' : 'text-[#9291A5]'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="absolute left-[32px] top-[109px] w-[689px] h-[1px]"
          style={{ background: colors.gridLine }}
        />

        {/* Categories Legend */}
        <div className="absolute right-[32px] top-[158px] w-[160px] h-[221px]">
          {/* All Categories Button */}
          <div 
            className="w-[150px] h-[44px] rounded-[30px] border flex items-center justify-center mb-4"
            style={{ 
              borderColor: colors.allCategoriesBorder,
              background: colors.allCategoriesBg 
            }}
          >
            <div 
              className="w-[15px] h-[15px] rounded-full mr-2"
              style={{ background: colors.allCategoriesBorder }}
            />
            <span 
              className="text-[14px] font-normal"
              style={{ color: colors.allCategoriesText }}
            >
              All Categories
            </span>
          </div>

          {/* Category Items */}
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={category.name} className="flex items-center w-full">
                <div 
                  className="w-[15px] h-[15px] rounded-full border-[1.5px] mr-2"
                  style={{ borderColor: category.color, background: 'transparent' }}
                />
                <span 
                  className="text-[12px] font-normal mr-2"
                  style={{ color: colors.textPrimary }}
                >
                  {category.name}
                </span>
                <span 
                  className="text-[14px] font-normal ml-auto"
                  style={{ color: colors.textSecondary }}
                >
                  {category.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="absolute left-[103px] top-[154px] w-[602px] h-[310px]">
          {/* Highlighted Background for Wednesday */}
          <div 
            className="absolute w-[80px] h-full rounded-[8px]"
            style={{ 
              background: colors.highlightBg,
              left: '170px',
              top: '0px'
            }}
          />

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
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barCategoryGap="20%"
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
                    fontFamily: 'Inter',
                    letterSpacing: '0.84px',
                    textTransform: 'uppercase'
                  }}
                />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 16, 
                    fill: colors.textSecondary,
                    fontFamily: 'Inter'
                  }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return value;
                  }}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Bar 
                  dataKey="smartphones" 
                  fill={colors.smartphones}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
                <Bar 
                  dataKey="headphones" 
                  fill={colors.headphones}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
                <Bar 
                  dataKey="cameras" 
                  fill={colors.cameras}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
                <Bar 
                  dataKey="wearables" 
                  fill={colors.wearables}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Y-axis Labels */}
        <div className="absolute left-[32px] top-[145px] w-[39px] h-[326px]">
          <div 
            className="absolute text-[16px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', bottom: '0px' }}
          >
            0
          </div>
          <div 
            className="absolute text-[16px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '257px' }}
          >
            50k
          </div>
          <div 
            className="absolute text-[16px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '206px' }}
          >
            100k
          </div>
          <div 
            className="absolute text-[16px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '154px' }}
          >
            200k
          </div>
          <div 
            className="absolute text-[16px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '103px' }}
          >
            500k
          </div>
          <div 
            className="absolute text-[16px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '51px' }}
          >
            1M
          </div>
          <div 
            className="absolute text-[16px] font-normal text-right"
            style={{ color: colors.textSecondary, right: '0px', top: '0px' }}
          >
            1.5M
          </div>
        </div>

        {/* Days Labels */}
        <div className="absolute left-[114px] top-[480px] w-[578px] flex justify-between">
          {(data.length > 0 ? data : mockData['Daily']).map((item) => (
            <span 
              key={item.name}
              className="text-[14px] font-normal uppercase tracking-[0.84px] text-center"
              style={{ color: colors.textSecondary, width: '36px' }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalSalesSummaryChart;
