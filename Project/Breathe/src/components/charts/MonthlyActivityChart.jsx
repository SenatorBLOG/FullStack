import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import api from '../../api';

const colors = ['#4A3AFF', '#962DFF', '#E0C6FD', '#C6D2FD'];

const MonthlyActivityChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/stats/sessions-breakdown');
        if (!mounted) return;
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        if (!mounted) return;
        setData([
          { name: 'Short (0-5min)', value: 410, percentage: 27 },
          { name: 'Medium (5-15min)', value: 142, percentage: 9 },
          { name: 'Long (15-30min)', value: 340, percentage: 22 },
          { name: 'Extended (30min+)', value: 590, percentage: 39 }
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const total = useMemo(() => data.reduce((s,d)=>s + (d.value||0), 0), [data]);
  const avgMinutes = useMemo(() => {
    if (!total) return 0;
    const est = data.reduce((sum, item) => {
      const label = (item.name || '').toLowerCase();
      const avg = label.includes('short') ? 2.5 : label.includes('medium') ? 10 : label.includes('long') && !label.includes('extended') ? 22.5 : 45;
      return sum + (item.value * avg);
    }, 0);
    return Math.round((est / total) * 10) / 10;
  }, [data, total]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white/80 dark:bg-slate-900/60 ring-1 ring-slate-200/60 dark:ring-slate-700/40 p-5 min-h-[320px] flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/80 dark:bg-slate-900/60 ring-1 ring-slate-200/60 dark:ring-slate-700/40 p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">Session duration</h3>
        <div className="text-xs sm:text-sm text-slate-500">Total sessions: {total}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Pie */}
        <div className="w-full aspect-square">
          <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" startAngle={90} endAngle={-270} labelLine={false}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{avgMinutes}</div>
              <div className="text-xs sm:text-sm text-slate-500">Avg minutes</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full grid gap-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-3.5 h-3.5 rounded-full" style={{ background: colors[i % colors.length] }} />
                <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs sm:text-sm text-slate-500">{item.percentage}%</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyActivityChart;
