// MonthlyActivityChart.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Chart3Dropdown } from './Chart3StyleComponents';
import api from '../../api';

// === Цвета для пирога ===
const PIE_COLORS = [
  '#4A3AFF',  // Фиолетовый
  '#962DFF',  // Тёмно-фиолетовый
  '#E0C6FD',  // Светло-фиолетовый
  '#C6D2FD',  // Голубой
];

const MonthlyActivityChart = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('Last 12 months');

  // ======== Fetch sessions ========
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/sessions');
        if (!mounted) return;

        const raw = Array.isArray(res.data) ? res.data : [];

        // Преобразуем сессии в данные для пирога
        const normalized = raw.map(item => {
          const minutes = Number(item.minutes ?? item.sessionLength ?? (item.time ? item.time / 60 : 0)) || 0;
          let name = 'Extended';
          if (minutes <= 5) name = 'Short';
          else if (minutes <= 15) name = 'Medium';
          else if (minutes <= 30) name = 'Long';

          return { name, value: 1 }; // value = кол-во сессий
        });


        setSessions(normalized);
      } catch (e) {
        if (!mounted) return;
        setSessions([]);
        console.error('Error fetching sessions:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  // ======== Общая сумма ========
  const total = useMemo(() => sessions.reduce((s, d) => s + (Number(d.value) || 0), 0), [sessions]);

  // ======== Среднее время сессии ========
  const avgMinutes = useMemo(() => {
    if (!total) return 0;
    const est = sessions.reduce((sum, item) => {
      const label = (item.name || '').toLowerCase();
      const avg = label.includes('short') ? 2.5
                : label.includes('medium') ? 10
                : label.includes('long') && !label.includes('extended') ? 22.5
                : 45;
      return sum + (Number(item.value || 0) * avg);
    }, 0);
    return Math.round((est / total) * 10) / 10;
  }, [sessions, total]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-[#0F1E33] to-[#1A2F4D] backdrop-blur-sm border border-white/10 p-6 min-h-[380px] flex items-center justify-center">
        <div className="text-[#AEE6FF] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0F1E33] to-[#1A2F4D] backdrop-blur-sm border border-white/10 p-6 shadow-2xl">
      {/* Заголовок + Дропдаун */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#AEE6FF]">Session duration</h3>
          <p className="text-sm text-[#88AACC] mt-1">Total sessions: <span className="font-semibold">{total}</span></p>
        </div>
        <Chart3Dropdown
          value={period}
          onChange={setPeriod}
          options={['Last 7 days', 'Last 30 days', 'Last 12 months', 'All time']}
          className="w-52"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Пирог */}
        <div className="relative w-full aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sessions}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="85%"
                startAngle={90}
                endAngle={-270}
                paddingAngle={3}
                cornerRadius={12}
              >
                {sessions.map((_, i) => (
                  <Cell
                    key={i}
                    fill={PIE_COLORS[i % PIE_COLORS.length]}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={3}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Центр */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-[#70B8FF] to-[#3A82F7] bg-clip-text text-transparent">
              {avgMinutes}
            </div>
            <div className="text-sm text-[#88AACC] mt-1">Avg minutes</div>
          </div>
        </div>

        {/* Легенда */}
        <div className="space-y-3">
          {sessions.map((item, i) => {
            const pct = total ? Math.round((Number(item.value || 0) / total) * 100) : 0;
            return (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-5 h-5 rounded-full shadow-lg"
                    style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <div>
                    <div className="text-[#AEE6FF] font-medium">{item.name}</div>
                    <div className="text-xs text-[#88AACC]">{Number(item.value || 0)} sessions</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#70B8FF]">{pct}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlyActivityChart;
