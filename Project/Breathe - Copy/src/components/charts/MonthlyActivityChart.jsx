import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Chart3BlueContainer } from './Chart3StyleComponents';
import api from '../../api';

const MonthlyActivityChart = () => {
  const [sessionBreakdown, setSessionBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerValue, setCenterValue] = useState('1.05');
  const [centerLabel, setCenterLabel] = useState('Average range');

  useEffect(() => {
    fetchSessionBreakdown();
  }, []);

  const fetchSessionBreakdown = async () => {
    try {
      const response = await api.get('/stats/sessions-breakdown');
      const data = response.data.map((item, index) => ({
        ...item,
        id: index
      }));
      setSessionBreakdown(data);
      
      // Calculate average session length for center display
      const totalSessions = data.reduce((sum, item) => sum + item.value, 0);
      const weightedSum = data.reduce((sum, item, index) => {
        // Estimate average minutes for each category
        const avgMinutes = index === 0 ? 2.5 : index === 1 ? 10 : index === 2 ? 22.5 : 45;
        return sum + (item.value * avgMinutes);
      }, 0);
      const avgSessionLength = totalSessions > 0 ? (weightedSum / totalSessions) : 0;
      setCenterValue(avgSessionLength.toFixed(1));
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching session breakdown:', error);
      // Set default data if API fails
      setSessionBreakdown([
        { name: 'Short (0-5min)', value: 410, percentage: 27, id: 0 },
        { name: 'Medium (5-15min)', value: 142, percentage: 9, id: 1 },
        { name: 'Long (15-30min)', value: 340, percentage: 22, id: 2 },
        { name: 'Extended (30min+)', value: 590, percentage: 39, id: 3 }
      ]);
      setLoading(false);
    }
  };

  // Colors matching Figma Chart 10 (purple gradient scheme)
  const pieColors = ['#4A3AFF', '#962DFF', '#E0C6FD', '#C6D2FD'];

  // Custom label component for pie chart percentages
  const renderLabel = (entry) => {
    return `${entry.percentage}%`;
  };

  if (loading) {
    return (
      <Chart3BlueContainer 
        title="Session duration" 
        subtitle="Statistics"
        width="510px"
        height="841px"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center" style={{ color: '#1E1B39' }}>
            Loading...
          </div>
        </div>
      </Chart3BlueContainer>
    );
  }

  return (
    <Chart3BlueContainer 
      title="Session duration" 
      subtitle="Statistics"
      width="510px"
      height="841px"
    >
      {/* Pie Chart */}
      <div className="absolute left-[71px] top-[144px] w-[367px] h-[379px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sessionBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={160}
              dataKey="value"
              labelLine={false}
              label={({ percentage }) => `${percentage}%`}
            >
              {sessionBreakdown.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={pieColors[index % pieColors.length]} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Info */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div 
            className="text-[44px] font-bold leading-[52px]"
            style={{ color: '#1E1B39' }}
          >
            {centerValue}
          </div>
          <div 
            className="text-[18px] font-normal leading-[32px]"
            style={{ color: '#9291A5' }}
          >
            {centerLabel}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute left-[79px] top-[583px] w-[351px] h-[202px]">
        {sessionBreakdown.map((item, index) => (
          <div key={index} className="absolute w-full h-[28px]" style={{ top: `${index * 58}px` }}>
            {/* Color Indicator */}
            <div 
              className="absolute w-[14px] h-[14px] rounded-full top-[7px]"
              style={{ background: pieColors[index], left: '0px' }}
            />
            
            {/* Label */}
            <div 
              className="absolute text-[22px] font-bold leading-[28px] left-[30px] top-0"
              style={{ color: '#615E83' }}
            >
              {item.name.split(' ')[0]}
            </div>
            
            {/* Value */}
            <div 
              className="absolute text-[18px] font-normal leading-[20px] text-right top-[4px]"
              style={{ color: '#9291A5', right: '0px' }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div 
        className="absolute left-[32px] top-[108px] w-[446px] h-0"
        style={{ background: '#E5E5EF' }}
      />
    </Chart3BlueContainer>
  );
};

export default MonthlyActivityChart;
