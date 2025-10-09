import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Chart3BlueContainer, Chart3Colors, Chart3Dropdown } from './Chart3StyleComponents';
import api from '../../api';

const ActivityChart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('Weekly');
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchData(period);
  }, [period]);

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const endpoint =
        type === 'Weekly'
          ? '/stats/weekly'
          : type === 'Monthly'
          ? '/stats/monthly'
          : '/stats/yearly';
      const response = await api.get(endpoint);
      const mapped = response.data.map((item, index) => ({
        name:
          type === 'Weekly'
            ? item.day
            : type === 'Monthly'
            ? item.day || index + 1
            : item.month,
        value: item.minutes,
        active: index === new Date().getDay(),
      }));
      setData(mapped);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const maxValue = Math.max(...data.map(d => d.value), 10);
  const step = Math.ceil(maxValue / 3);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div
          className="rounded-md px-4 py-2 text-[16px] font-normal text-center"
          style={{
            background: '#D9D9D9',
            color: '#12294E',
          }}
        >
          {d.value} min
        </div>
      );
    }
    return null;
  };

  return (
    <Chart3BlueContainer
      title={`${period} Meditation`}
      subtitle="Activity"
      width="1009px"
      height="425px"
    >
      {/* Dropdown */}
      <div className="absolute right-[66px] top-[39px]">
        <Chart3Dropdown
          value={period}
          onChange={setPeriod}
          options={['Weekly', 'Monthly', 'Yearly']}
          className="w-[239px] h-[35px]"
        />
      </div>

      {/* Chart */}
      <div className="absolute left-[65px] top-[150px] w-[900px] h-[210px]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
              onMouseMove={(d) => {
                if (d && d.activeTooltipIndex !== undefined) {
                  setHoveredIndex(d.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* 🔹 Сетка координат */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.1)"
              />

              {/* 🔹 Оси */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 17,
                  fill: Chart3Colors.textPrimary,
                  fontFamily: 'Montserrat',
                  dx: 0,
                  dy: 20,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, maxValue]}
                ticks={[0, step, step * 2, step * 3]}
                tick={{
                  fontSize: 20,
                  fill: Chart3Colors.textPrimary,
                  fontFamily: 'Montserrat',
                  textAnchor: 'start',
                  dx: -30, // ← сдвигаем левее
                }}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* 🔹 График */}
              <Bar dataKey="value" radius={[7, 7, 0, 0]} isAnimationActive={false}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      hoveredIndex === index
                        ? Chart3Colors.hover || '#70B8FF'
                        : entry.active
                        ? Chart3Colors.primary
                        : Chart3Colors.secondary
                    }
                    stroke="none"
                    fillOpacity={1}
                  />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Chart3BlueContainer>
  );
};

export default ActivityChart;
