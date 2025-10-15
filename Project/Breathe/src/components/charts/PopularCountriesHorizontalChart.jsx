import React, { useState, useEffect } from 'react';

const PopularCountriesHorizontalChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Design system colors matching Figma
  const colors = {
    primary: '#4A3AFF',      // USA
    secondary: '#C893FD',    // Canada  
    tertiary: '#93AAFD',     // UK
    quaternary: '#C6D2FD',   // Australia
    background: '#FFF',
    textPrimary: '#1E1B39',
    textSecondary: '#615E83',
    containerShadow: '0 2px 6px 0 rgba(13, 10, 44, 0.08)'
  };

  // Mock data for popular countries
  const mockData = [
    { 
      name: 'USA', 
      value: 175, 
      percentage: 87.5,  // 175/200 * 100
      color: colors.primary
    },
    { 
      name: 'Canada', 
      value: 130, 
      percentage: 65,    // 130/200 * 100
      color: colors.secondary
    },
    { 
      name: 'UK', 
      value: 98, 
      percentage: 49,    // 98/200 * 100
      color: colors.tertiary
    },
    { 
      name: 'Australia', 
      value: 50, 
      percentage: 25,    // 50/200 * 100
      color: colors.quaternary
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

        {/* Countries Labels */}
        <div className="absolute left-[33px] top-[102px] w-[58px] h-[131px]">
          {data.map((item, index) => (
            <div 
              key={item.name}
              className="absolute text-[14px] font-normal"
              style={{ 
                color: colors.textSecondary,
                top: `${index * 38}px`,
                height: '16px',
                lineHeight: '16px'
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="absolute left-[107px] top-[104px] w-[175px] h-[127px]">
          {data.map((item, index) => (
            <div 
              key={item.name} 
              className="absolute"
              style={{ 
                top: `${index * 38}px`,
                width: '175px',
                height: '12px'
              }}
            >
              {/* Bar */}
              <div 
                className="absolute top-0 left-0 h-full rounded-[4px] transition-all duration-700 ease-out"
                style={{ 
                  background: item.color,
                  width: `${item.percentage}%`,
                  transformOrigin: 'left center',
                  transform: loading ? 'scaleX(0)' : 'scaleX(1)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Percentage Labels */}
        <div className="absolute left-[107px] top-[257px] w-[196px] h-[16px] flex justify-between">
          <span 
            className="text-[14px] font-normal text-center"
            style={{ color: colors.textSecondary, width: '21px' }}
          >
            0%
          </span>
          <span 
            className="text-[14px] font-normal text-center"
            style={{ color: colors.textSecondary, width: '29px' }}
          >
            50%
          </span>
          <span 
            className="text-[14px] font-normal text-center"
            style={{ color: colors.textSecondary, width: '36px' }}
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

export default PopularCountriesHorizontalChart;
