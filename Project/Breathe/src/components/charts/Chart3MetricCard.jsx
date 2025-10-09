import React from 'react';
import { Chart3BlueContainer, Chart3Colors } from './Chart3StyleComponents';
import HoverOverlay from './HoverOverlay';

export const Chart3MetricCard = ({
  title,
  subtitle,
  value,
  change,
  changeType = 'neutral', // 'positive'|'negative'|'neutral'
  icon,
  hoverTitle,
  hoverValue,
  hoverInfo,
  width = '332px', // Default width, adjustable
  height = '225px', // Default height, adjustable
  children,
  valuePosition = { top: '24%', left: '70%' }, // Customizable position for value
  changePosition = { top: '100px', left: '20px' }, // Customizable position for change
  iconPosition = { top: '20px', right: '20px' }, // Customizable position for icon
  chartPosition = { bottom: '10px', left: '20px', width: 'calc(100% - 40px)', height: '110px' }, // Customizable chart area
}) => {
  const changeColor = changeType === 'positive' ? '#04CE00' : changeType === 'negative' ? '#FF4D4F' : '#9AA0B4';

  return (
    <Chart3BlueContainer title={title} subtitle={subtitle} width={width} height={height}>
      <HoverOverlay
        title={hoverTitle ?? title}
        value={hoverValue ?? value}
        infoText={hoverInfo ?? ''}
      >
        <div
          style={{
            position: 'relative',
            padding: '0', // Removed fixed padding for flexibility
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          {/* Value */}
          <div
            style={{
              position: 'absolute',
              ...valuePosition,
              fontSize: '30px',
              fontWeight: 800,
              color: Chart3Colors.textPrimary || '#1E1B39',
              lineHeight: 1,
            }}
          >
            {value}
          </div>

          {/* Change */}
          {change !== undefined && (
            <div
              style={{
                position: 'absolute',
                ...changePosition,
                fontSize: '13px',
                color: changeColor,
                marginTop: '6px',
              }}
            >
              {changeType === 'positive' ? '+' : changeType === 'negative' ? '' : ''}{change}{change !== undefined ? '%' : ''}
            </div>
          )}

          {/* Icon */}
          {icon && (
            <div
              style={{
                position: 'absolute',
                ...iconPosition,
                marginLeft: '12px',
                alignSelf: 'center',
              }}
            >
              {icon}
            </div>
          )}

          {/* Chart or Children Area */}
          <div
            style={{
              position: 'absolute',
              ...chartPosition,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            {children}
          </div>
        </div>
      </HoverOverlay>
    </Chart3BlueContainer>
  );
};

export default Chart3MetricCard;