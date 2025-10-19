import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const WeeklySalesChart = () => {
  const [activeTab, setActiveTab] = useState('Weekly');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Color palette matching the Figma design
  const colors = {
    primary: '#962DFF',      // Smartphones - Primary purple
    secondary: '#4A3AFF',    // Headphones - Blue purple  
    tertiary: '#E0C6FD',     // Cameras - Light purple
    quaternary: '#93AAFD',   // Wearables - Light blue
    background: '#FFFFFF',
    textPrimary: '#1E1B39',
    textSecondary: '#9291A5',
    gridLine: '#E5E5EF',
    containerShadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)',
    tabBackground: '#F8F8FF',
    tabActive: '#1E1B39'
  };

  const categories = [
    { name: 'Smartphones', color: colors.primary, percentage: '37%' },
    { name: 'Headphones', color: colors.secondary, percentage: '23%' },
    { name: 'Cameras', color: colors.tertiary, percentage: '29%' },
    { name: 'Wearables', color: colors.quaternary, percentage: '21%' }
  ];

  const mockData = {
    Weekly: [
      { name: 'MON', smartphones: 250000, headphones: 200000, cameras: 350000, wearables: 180000 },
      { name: 'TUE', smartphones: 80000, headphones: 150000, cameras: 20000, wearables: 120000 },
      { name: 'WED', smartphones: 600000, headphones: 550000, cameras: 200000, wearables: 100000 },
      { name: 'THU', smartphones: 80000, headphones: 70000, cameras: 150000, wearables: 30000 },
      { name: 'FRI', smartphones: 10000, headphones: 15000, cameras: 8000, wearables: 25000 },
      { name: 'SAT', smartphones: 320000, headphones: 140000, cameras: 120000, wearables: 40000 },
      { name: 'SUN', smartphones: 500000, headphones: 180000, cameras: 100000, wearables: 50000 }
    ],
    Daily: [
      { name: '1', smartphones: 180000, headphones: 160000, cameras: 280000, wearables: 140000 },
      { name: '2', smartphones: 60000, headphones: 120000, cameras: 15000, wearables: 90000 },
      { name: '3', smartphones: 480000, headphones: 440000, cameras: 160000, wearables: 80000 }
    ],
    Monthly: [
      { name: 'JAN', smartphones: 1200000, headphones: 950000, cameras: 1400000, wearables: 760000 },
      { name: 'FEB', smartphones: 890000, headphones: 740000, cameras: 980000, wearables: 580000 },
      { name: 'MAR', smartphones: 1450000, headphones: 1200000, cameras: 1650000, wearables: 920000 }
    ]
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(mockData[activeTab] || []);
      setLoading(false);
    }, 300);
  }, [activeTab]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="rounded-[8px] px-[13px] py-[8px] text-[16px] font-normal text-center"
          style={{ 
            background: '#1E1B39',
            color: '#FFFFFF'
          }}
        >
          {`${(payload[0].value / 1000).toFixed(0)}k`}
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
        <div className="absolute right-[32px] top-[32px] w-[239px] h-[49px]">
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
                left: activeTab === 'Daily' ? '6px' : activeTab === 'Weekly' ? '74px' : '153px'
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
          className="absolute left-[32px] top-[109px] w-[980px] h-[1px]"
          style={{ background: colors.gridLine }}
        />

        {/* Category Legend */}
        <div className="absolute right-[32px] top-[158px] w-[160px]">
          {/* All Categories Button */}
          <div 
            className="w-[150px] h-[44px] rounded-[30px] border mb-[24px] flex items-center px-[16px]"
            style={{ 
              borderColor: colors.secondary,
              background: 'transparent'
            }}
          >
            <div 
              className="w-[15px] h-[15px] rounded-full mr-[8px]"
              style={{ background: colors.secondary }}
            />
            <span 
              className="text-[14px] font-normal"
              style={{ color: colors.secondary }}
            >
              All Categories
            </span>
          </div>

          {/* Category List */}
          <div className="space-y-[24px]">
            {categories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-[15px] h-[15px] rounded-full mr-[8px] border-[1.5px]"
                    style={{ 
                      borderColor: category.color,
                      background: 'transparent'
                    }}
                  />
                  <span 
                    className="text-[12px] font-normal"
                    style={{ color: colors.textPrimary }}
                  >
                    {category.name}
                  </span>
                </div>
                <span 
                  className="text-[14px] font-normal"
                  style={{ color: colors.textSecondary }}
                >
                  - {category.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="absolute left-[89px] top-[158px] w-[634px] h-[307px]">
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
                    fontFamily: 'Inter'
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
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Bar 
                  dataKey="smartphones" 
                  fill={colors.primary}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
                <Bar 
                  dataKey="headphones" 
                  fill={colors.secondary}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
                <Bar 
                  dataKey="cameras" 
                  fill={colors.tertiary}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
                <Bar 
                  dataKey="wearables" 
                  fill={colors.quaternary}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Highlighted Background (for Wednesday) */}
        <div 
          className="absolute left-[259px] top-[158px] w-[80px] h-[310px] rounded-[8px]"
          style={{ background: '#F7F7FB' }}
        />

        {/* Day Labels */}
        <div className="absolute left-[114px] top-[480px] w-[578px] flex justify-between">
          {(data.length > 0 ? data : mockData.Weekly).map((item) => (
            <span 
              key={item.name}
              className="text-[14px] font-normal uppercase tracking-[0.84px]"
              style={{ color: colors.textSecondary }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklySalesChart;
