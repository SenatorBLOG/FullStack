import React, { useState, useEffect } from 'react';
import { Chart3BlueContainer } from './Chart3StyleComponents';
import api from '../../api';

const MoodQualificationChart = () => {
  const [moodData, setMoodData] = useState({
    positive: { count: 0, percentage: 0 },
    neutral: { count: 0, percentage: 0 },
    negative: { count: 0, percentage: 0 },
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    try {
      const response = await api.get('/stats/mood');
      setMoodData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching mood data:', error);
      // Set default data if API fails
      setMoodData({
        positive: { count: 2113, percentage: 74 },
        neutral: { count: 45, percentage: 16 },
        negative: { count: 16, percentage: 10 },
        total: 2174
      });
      setLoading(false);
    }
  };

  // Colors from Figma design
  const moodColors = {
    positive: '#7FE47E',  // Green
    neutral: '#FFEB3A',   // Yellow
    negative: '#FF718B'   // Pink/Red
  };

  const MoodIcon = ({ type, size = 60 }) => {
    const iconStyle = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    };

    switch (type) {
      case 'positive':
        return (
          <div style={{ ...iconStyle, background: moodColors.positive }}>
            {/* Happy face */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              {/* Eyes */}
              <circle cx="14" cy="16" r="3" fill="#FFF"/>
              <circle cx="26" cy="16" r="3" fill="#FFF"/>
              {/* Smile */}
              <path d="M12 25C12 25 16 30 20 30C24 30 28 25 28 25" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      case 'neutral':
        return (
          <div style={{ ...iconStyle, background: moodColors.neutral }}>
            {/* Neutral face */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              {/* Eyes */}
              <circle cx="14" cy="16" r="3" fill="#FFF"/>
              <circle cx="26" cy="16" r="3" fill="#FFF"/>
              {/* Neutral line */}
              <line x1="14" y1="25" x2="26" y2="25" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      case 'negative':
        return (
          <div style={{ ...iconStyle, background: moodColors.negative }}>
            {/* Sad face */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              {/* Eyes */}
              <circle cx="14" cy="16" r="3" fill="#FFF"/>
              <circle cx="26" cy="16" r="3" fill="#FFF"/>
              {/* Frown */}
              <path d="M12 28C12 28 16 23 20 23C24 23 28 28 28 28" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Chart3BlueContainer 
        title="Mood tracking" 
        subtitle="Community"
        width="510px"
        height="358px"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center" style={{ color: '#1E1B39' }}>
            Loading...
          </div>
        </div>
      </Chart3BlueContainer>
    );
  }

  const maxWidth = 288; // Maximum bar width in pixels

  return (
    <Chart3BlueContainer 
      title="Mood tracking" 
      subtitle="Community"
      width="510px"
      height="358px"
    >
      {/* Horizontal bars container */}
      <div className="absolute left-[33px] top-[165px] w-[443px] h-[42px]">
        {/* Negative Bar */}
        <div 
          className="absolute rounded-[12.718px] top-0"
          style={{ 
            width: `${Math.max((moodData.negative.count / moodData.total) * maxWidth, 42)}px`,
            height: '42px',
            background: moodColors.negative,
            left: '0px'
          }}
        />
        
        {/* Neutral Bar */}
        <div 
          className="absolute rounded-[12.718px] top-0"
          style={{ 
            width: `${Math.max((moodData.neutral.count / moodData.total) * maxWidth, 42)}px`,
            height: '42px',
            background: moodColors.neutral,
            left: `${Math.max((moodData.negative.count / moodData.total) * maxWidth, 42) + 8}px`
          }}
        />
        
        {/* Positive Bar */}
        <div 
          className="absolute rounded-[12.718px] top-0"
          style={{ 
            width: `${Math.max((moodData.positive.count / moodData.total) * maxWidth, 42)}px`,
            height: '42px',
            background: moodColors.positive,
            left: `${Math.max((moodData.negative.count / moodData.total) * maxWidth, 42) + Math.max((moodData.neutral.count / moodData.total) * maxWidth, 42) + 16}px`
          }}
        />
      </div>

      {/* Mood statistics */}
      <div className="absolute left-[33px] top-[248px] w-[334px] h-[60px]">
        {/* Negative Stats */}
        <div className="absolute left-0 top-0">
          <MoodIcon type="negative" size={60} />
          <div 
            className="absolute left-[70px] top-[6px] text-[18px] font-bold leading-[18px]"
            style={{ color: '#1E1B39' }}
          >
            {moodData.negative.count}
          </div>
          <div 
            className="absolute left-[0px] top-[35px] text-[18px] font-normal leading-[20px]"
            style={{ color: '#615E83' }}
          >
            Negative
          </div>
        </div>

        {/* Neutral Stats */}
        <div className="absolute left-[137px] top-0">
          <MoodIcon type="neutral" size={60} />
          <div 
            className="absolute left-[70px] top-[6px] text-[18px] font-bold leading-[18px]"
            style={{ color: '#1E1B39' }}
          >
            {moodData.neutral.count}
          </div>
          <div 
            className="absolute left-[0px] top-[35px] text-[18px] font-normal leading-[20px]"
            style={{ color: '#615E83' }}
          >
            Neutral
          </div>
        </div>

        {/* Positive Stats */}
        <div className="absolute left-[256px] top-0">
          <MoodIcon type="positive" size={60} />
          <div 
            className="absolute left-[70px] top-[6px] text-[18px] font-bold leading-[18px]"
            style={{ color: '#1E1B39' }}
          >
            {moodData.positive.count.toLocaleString()}
          </div>
          <div 
            className="absolute left-[0px] top-[35px] text-[18px] font-normal leading-[20px]"
            style={{ color: '#615E83' }}
          >
            Positive
          </div>
        </div>
      </div>

      {/* Divider */}
      <div 
        className="absolute left-[33px] top-[106px] w-[443px] h-0"
        style={{ background: '#E5E5EF' }}
      />
    </Chart3BlueContainer>
  );
};

export default MoodQualificationChart;
