import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const SalesReportChart = () => {
  const [activeTab, setActiveTab] = useState('12 months');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Color palette matching the Figma design
  const colors = {
    productSales: '#962DFF',      // Primary purple line
    subscriptionSales: '#FF718B', // Pink/red line  
    otherSales: '#93AAFD',        // Light blue line
    background: '#FFFFFF',
    textPrimary: '#1E1B39',
    textSecondary: '#9291A5',
    gridLine: '#E5E5EF',
    containerShadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)',
    tabBackground: '#F8F8FF',
    tabActive: '#1E1B39',
    labelBackground: '#E5E5EF',
    labelBorder: '#E5E5EF'
  };

  const mockData = {
    '7 days': [
      { name: 'Day 1', productSales: 20000, subscriptionSales: 15000, otherSales: 25000 },
      { name: 'Day 2', productSales: 45000, subscriptionSales: 35000, otherSales: 40000 },
      { name: 'Day 3', productSales: 65000, subscriptionSales: 85000, otherSales: 55000 },
      { name: 'Day 4', productSales: 40000, subscriptionSales: 70000, otherSales: 45000 },
      { name: 'Day 5', productSales: 75000, subscriptionSales: 50000, otherSales: 65000 },
      { name: 'Day 6', productSales: 55000, subscriptionSales: 90000, otherSales: 50000 },
      { name: 'Day 7', productSales: 25000, subscriptionSales: 30000, otherSales: 35000 }
    ],
    '30 days': [
      { name: 'Week 1', productSales: 150000, subscriptionSales: 120000, otherSales: 180000 },
      { name: 'Week 2', productSales: 280000, subscriptionSales: 250000, otherSales: 220000 },
      { name: 'Week 3', productSales: 220000, subscriptionSales: 320000, otherSales: 260000 },
      { name: 'Week 4', productSales: 380000, subscriptionSales: 280000, otherSales: 310000 }
    ],
    '12 months': [
      { name: 'JAN', productSales: 150000, subscriptionSales: 120000, otherSales: 500000 },
      { name: 'FEB', productSales: 800000, subscriptionSales: 600000, otherSales: 450000 },
      { name: 'MAR', productSales: 1200000, subscriptionSales: 4500000, otherSales: 350000 },
      { name: 'APR', productSales: 700000, subscriptionSales: 3200000, otherSales: 280000 },
      { name: 'MAY', productSales: 200000, subscriptionSales: 1800000, otherSales: 520000 },
      { name: 'JUN', productSales: 180000, subscriptionSales: 800000, otherSales: 450000 },
      { name: 'JUL', productSales: 250000, subscriptionSales: 650000, otherSales: 380000 },
      { name: 'AUG', productSales: 480000, subscriptionSales: 1200000, otherSales: 420000 },
      { name: 'SEP', productSales: 420000, subscriptionSales: 2800000, otherSales: 380000 },
      { name: 'OCT', productSales: 380000, subscriptionSales: 2200000, otherSales: 350000 },
      { name: 'NOV', productSales: 150000, subscriptionSales: 1500000, otherSales: 320000 },
      { name: 'DEC', productSales: 80000, subscriptionSales: 400000, otherSales: 280000 }
    ]
  };

  const legends = [
    { name: 'Product sales', color: colors.productSales },
    { name: 'Subscription sales', color: colors.subscriptionSales },
    { name: 'Other sales', color: colors.otherSales }
  ];

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
      const total = payload.reduce((sum, entry) => sum + entry.value, 0);
      return (
        <div 
          className="rounded-[8px] px-[16px] py-[8px] text-[14px] font-normal"
          style={{ 
            background: '#1E1B39',
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
            Sales report
          </div>
        </div>

        {/* Legend Labels */}
        <div className="absolute left-[306px] top-[42px] flex gap-[16px]">
          {legends.map((legend, index) => (
            <div 
              key={legend.name}
              className="flex items-center gap-[6px] px-[12px] py-[8px] rounded-[8px] border"
              style={{ 
                borderColor: colors.labelBorder,
                background: 'transparent'
              }}
            >
              <div 
                className="w-[8px] h-[8px] rounded-full"
                style={{ background: legend.color }}
              />
              <span 
                className="text-[12px] font-normal"
                style={{ color: colors.textPrimary }}
              >
                {legend.name}
              </span>
            </div>
          ))}
        </div>

        {/* Tab Filters */}
        <div className="absolute right-[32px] top-[32px] w-[280px] h-[49px]">
          <div 
            className="w-full h-full rounded-[14.769px] relative"
            style={{ background: colors.tabBackground }}
          >
            {/* Active Tab Background */}
            <div 
              className="absolute h-[37px] rounded-[13px] transition-all duration-300"
              style={{ 
                background: colors.tabActive,
                width: '100px',
                top: '6px',
                left: activeTab === '7 days' ? '6px' : activeTab === '30 days' ? '93px' : '171px'
              }}
            />
            
            {/* Tab Labels */}
            <div className="flex items-center h-full px-[24px] justify-between">
              <button
                onClick={() => setActiveTab('7 days')}
                className={`text-[14px] font-normal transition-colors ${
                  activeTab === '7 days' ? 'text-white' : 'text-[#9291A5]'
                }`}
              >
                7 days
              </button>
              <button
                onClick={() => setActiveTab('30 days')}
                className={`text-[14px] font-normal transition-colors ${
                  activeTab === '30 days' ? 'text-white' : 'text-[#9291A5]'
                }`}
              >
                30 days
              </button>
              <button
                onClick={() => setActiveTab('12 months')}
                className={`text-[14px] font-normal transition-colors ${
                  activeTab === '12 months' ? 'text-white' : 'text-[#9291A5]'
                }`}
              >
                12 months
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="absolute left-[32px] top-[109px] w-[980px] h-[1px]"
          style={{ background: colors.gridLine }}
        />

        {/* Chart Area */}
        <div className="absolute left-[89px] top-[158px] w-[923px] h-[307px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-[16px]" style={{ color: colors.textSecondary }}>
                Loading...
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
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
                  tick={{ 
                    fontSize: 16, 
                    fill: colors.textSecondary,
                    fontFamily: 'Inter'
                  }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Line 
                  type="monotone"
                  dataKey="productSales" 
                  stroke={colors.productSales}
                  strokeWidth={3}
                  strokeDasharray="11 13"
                  dot={false}
                  activeDot={{ r: 4, fill: colors.productSales, stroke: '#FFFFFF', strokeWidth: 2 }}
                />
                
                <Line 
                  type="monotone"
                  dataKey="subscriptionSales" 
                  stroke={colors.subscriptionSales}
                  strokeWidth={3}
                  strokeDasharray="11 13"
                  dot={false}
                  activeDot={{ r: 4, fill: colors.subscriptionSales, stroke: '#FFFFFF', strokeWidth: 2 }}
                />
                
                <Line 
                  type="monotone"
                  dataKey="otherSales" 
                  stroke={colors.otherSales}
                  strokeWidth={3}
                  strokeDasharray="11 13"
                  dot={false}
                  activeDot={{ r: 4, fill: colors.otherSales, stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Month Labels */}
        <div className="absolute left-[89px] top-[489px] w-[931px] flex justify-between">
          {(data.length > 0 ? data : mockData['12 months']).map((item) => (
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

export default SalesReportChart;
