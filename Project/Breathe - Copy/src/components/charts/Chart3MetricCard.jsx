import React from 'react';
import { Chart3BlueContainer } from './Chart3StyleComponents';
import HoverOverlay from './HoverOverlay';

export const Chart3MetricCard = ({
  title,
  subtitle,
  // visual
  value,
  change,
  changeType = 'neutral', // 'positive'|'negative'|'neutral'
  icon,
  // hover info (optional; defaults to title/value)
  hoverTitle,
  hoverValue,
  hoverInfo,
  width = '600px',
  height = '225px',
  children
}) => {
  const changeColor = changeType === 'positive' ? '#04CE00' : changeType === 'negative' ? '#FF4D4F' : '#9AA0B4';

  return (
    <Chart3BlueContainer title={title} subtitle={subtitle} width={width} height={height}>
      {/* HoverOverlay covers the whole card area and will swap content after hold */}
      <HoverOverlay
        title={hoverTitle ?? title}
        value={hoverValue ?? value}
        infoText={hoverInfo ?? ''}
      >
        {/* Card layout: reserve top area for value/change, bottom area for chart */}
        <div style={{
          paddingTop: 66,      // SAFE ZONE: avoid Chart3BlueContainer header (adjust if needed)
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 16,
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 8
        }}>
          {/* Top row: value & change on left, optional icon on right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '34px', fontWeight: 800, color: '#1E1B39', lineHeight: 1 }}>
                {value}
              </div>
              {change !== undefined && (
                <div style={{ marginTop: 6, fontSize: 13, color: changeColor }}>
                  {changeType === 'positive' ? '+' : ''}{change}{change !== undefined ? '%' : ''}
                </div>
              )}
            </div>

            {icon && (
              <div style={{ marginLeft: 12, alignSelf: 'center' }}>
                {icon}
              </div>
            )}
          </div>

          {/* Bottom slot for mini-graph or other content */}
          <div style={{
            height: '110px',                 // fixed slot height (consistent across cards)
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible'
          }}>
            {/* children should typically be a ResponsiveContainer or SVG sized to this area */}
            {children}
          </div>
        </div>
      </HoverOverlay>
    </Chart3BlueContainer>
  );
};

export default Chart3MetricCard;