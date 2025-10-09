import React, { useState, useEffect, useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Chart3BlueContainer, Chart3Colors, Chart3Dropdown } from './Chart3StyleComponents';
import api from '../../api';

/**
 * AnnualProgressChart
 * - default view: "Last 12 months"
 * - alternative view: "Yearly summary"
 * - optional prop currentSession = { time, cycles, startedAt } для отображения live-индикации
 */
const AnnualProgressChart = ({ currentSession = null }) => {
  const [rawSessions, setRawSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('Last 12 months'); // default
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);
  

  async function fetchSessions() {
    setLoading(true);
    try {
      const res = await api.get('/sessions'); // ожидаем [{date, time, cycles, ...}]
      // normalize dates to ISO
      const sessions = (res.data || []).map(s => ({ ...s, date: new Date(s.date) }));
      setRawSessions(sessions);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  }

  // ---- helpers ----
  const monthsLabels = (d) => {
    const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = String(d.getFullYear()).slice(-2);
    return `${M[d.getMonth()]} ${year}`;
  };

  // Build last 12 months array (objects with key 'YYYY-MM')
  const last12Months = useMemo(() => {
    const arr = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}`;
      arr.push({ dateObj: d, key, label: monthsLabels(d), minutes: 0, sessions: 0, cycles: 0 });
    }
    return arr;
  }, []);

  // aggregate for "Last 12 months"
  const monthlyData = useMemo(() => {
    if (!rawSessions.length) return last12Months.map(m => ({ name: m.label, totalMinutes: 0, sessions: 0, cycles:0 }));
    const map = Object.fromEntries(last12Months.map(m => [m.key, { ...m }]));
    rawSessions.forEach(s => {
      const d = new Date(s.date);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      if (map[key]) {
        map[key].minutes += Math.round((s.time || 0) / 60); // минуты
        map[key].sessions += 1;
        map[key].cycles += (s.cycles || 0);
      }
    });
    // convert to stacked segments for visual style
    return Object.values(map).map((m, idx) => {
      const total = m.minutes;
      // split into 4 segments (visual; last segment = remainder)
      const seg1 = Math.floor(total * 0.25);
      const seg2 = Math.floor(total * 0.25);
      const seg3 = Math.floor(total * 0.25);
      const seg4 = total - seg1 - seg2 - seg3;
      return {
        name: m.label,
        year: m.dateObj.getFullYear(),
        month: m.dateObj.getMonth(),
        totalMinutes: total,
        sessions: m.sessions,
        cycles: m.cycles,
        segment1: seg1,
        segment2: seg2,
        segment3: seg3,
        segment4: seg4,
        lineValue: m.sessions // можно заменить на другой показатель
      };
    });
  }, [rawSessions, last12Months]);

  // aggregate for "Yearly summary" (group all sessions by year)
  const yearlyData = useMemo(() => {
    if (!rawSessions.length) return [];
    const map = {};
    rawSessions.forEach(s => {
      const y = new Date(s.date).getFullYear();
      if (!map[y]) map[y] = { year: y, minutes: 0, sessions: 0, cycles: 0 };
      map[y].minutes += Math.round((s.time || 0) / 60);
      map[y].sessions += 1;
      map[y].cycles += (s.cycles || 0);
    });
    return Object.values(map).sort((a,b)=>a.year-b.year).map((item, idx) => {
      const total = item.minutes;
      const seg1 = Math.floor(total * 0.25);
      const seg2 = Math.floor(total * 0.25);
      const seg3 = Math.floor(total * 0.25);
      const seg4 = total - seg1 - seg2 - seg3;
      return {
        name: String(item.year),
        year: item.year,
        totalMinutes: total,
        sessions: item.sessions,
        cycles: item.cycles,
        segment1: seg1,
        segment2: seg2,
        segment3: seg3,
        segment4: seg4,
        lineValue: item.sessions
      };
    });
  }, [rawSessions]);

  // choose data based on view
  const data = view === 'Yearly summary' ? yearlyData : monthlyData;

  // dynamic Y max
  const maxRaw = data.length ? Math.max(...data.map(d=>d.totalMinutes || 0)) : 10;
  const base = Math.max(6, maxRaw);
  const step = Math.ceil(base / 3) || 1;
  const yMax = step * 3;

  // Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0].payload;
    return (
      <div style={{
        background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        color: '#12294E', fontSize: 13
      }}>
        <div style={{fontWeight:700}}>{p.name}</div>
        <div style={{opacity:0.85}}>{p.totalMinutes} min • {p.sessions} sessions</div>
      </div>
    );
  };
    const barColors = [
    Chart3Colors.segment1, 
    Chart3Colors.segment2, 
    Chart3Colors.segment3, 
    Chart3Colors.segment4
  ];
  const lineColor = Chart3Colors.linePrimary; // например "#FF718B"
  const gridColor = Chart3Colors.gridLine || '#E5E5EF';
  const textColor = Chart3Colors.textSecondary;

  // nice formatting for y-axis ticks
  const formatTick = val => (val >= 1000 ? `${(val/1000).toFixed(1)}k` : val);

  // render
  return (
    <Chart3BlueContainer title={ view === 'Yearly summary' ? 'Yearly meditation' : 'Last 12 months' } subtitle="Statistics" width="1009px" height="384px">
      {/* Dropdown Selector */}
      <div className="absolute right-[65px] top-[38px]">
        <Chart3Dropdown
          value={view}
          onChange={(v) => setView(v)}
          options={['Last 12 months', 'Yearly summary']}
          className="w-[239px] h-[35px] bg-[#F8F8FF]"
        />
      </div>

      {/* Optional live session card (Start Stage) */}
      {currentSession && (
        <div style={{
          position: 'absolute', left: 142, top: 96, padding: '10px 14px', borderRadius: 12,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.04)', color: '#fff'
        }}>
          <div style={{fontSize:12, opacity:0.9}}>Live session</div>
          <div style={{fontSize:16, fontWeight:700}}>{Math.floor((currentSession.time||0)/60)}:{String((currentSession.time||0)%60).padStart(2,'0')} min</div>
          <div style={{fontSize:12, opacity:0.85}}>{currentSession.cycles || 0} cycles</div>
        </div>
      )}

      {/* Chart area */}
      <div className="absolute left-[45px] top-[150px] w-[900px] h-[210px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{top:0, right:0, left:0, bottom:0}}
            onMouseMove={(e) => {
              if (e && typeof e.activeTooltipIndex === 'number') setHoveredIndex(e.activeTooltipIndex);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <XAxis dataKey="name" axisLine={false} tickLine={false}
              tick={{ fontSize: 16, fill: Chart3Colors.textPrimary, fontFamily: 'Montserrat', dy:8, }} interval={0} />
            <YAxis axisLine={false} tickLine={false} domain={[0, yMax]}
              tick={{ fontSize: 20, fill: Chart3Colors.textPrimary, fontFamily: 'Montserrat' }}
              tickFormatter={formatTick} ticks={[0, step, step*2, step*3]} />
            <Tooltip content={<CustomTooltip />} />

            {/* stacked bars (4 segments) */}
            <Bar dataKey="segment1" stackId="a" fill={barColors[0]} radius={[0,0,6,6]} />
            <Bar dataKey="segment2" stackId="a" fill={barColors[1]} />
            <Bar dataKey="segment3" stackId="a" fill={barColors[2]} />
            <Bar dataKey="segment4" stackId="a" fill={barColors[3]} radius={[6,6,0,0]} />


            {/* overlay line (sessions count) */}
            <Line type="monotone" dataKey="lineValue" stroke={Chart3Colors.linePrimary} strokeWidth={2} dot={{ r:4 }} activeDot={{ r:6 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* grid lines */}
      <div className="absolute left-[142px] top-[151px] w-[801px] h-[161px] pointer-events-none">
        <div style={{position:'absolute', width:'100%', height:0, top:'161px', background:'#E5E5EF'}} />
        <div style={{position:'absolute', width:'100%', height:0, top:'106px', background:'#E5E5EF'}} />
        <div style={{position:'absolute', width:'100%', height:0, top:'53px', background:'#E5E5EF'}} />
        <div style={{position:'absolute', width:'100%', height:0, top:'0px', background:'#E5E5EF'}} />
      </div>

      {/* divider */}
      <div className="absolute left-[65px] top-[106px] w-[878px] h-0" style={{ background: '#E5E5EF' }} />

      {/* decorative gradient area under line (optional) */}
      <div className="absolute left-[115px] top-[156px] w-[1000px] h-[154px] pointer-events-none">
        <svg width="1100" height="154" viewBox="0 0 1000 154" className="absolute inset-0">
          <defs>
            <linearGradient id="areaGradientChart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={Chart3Colors.primary} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={Chart3Colors.primary} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 60 C100 70, 200 40, 300 90 C400 120, 500 60, 600 110 C650 120, 700 90, 744 80 L744 154 L0 154 Z" fill="url(#areaGradientChart)" opacity="0.6" />
        </svg>
      </div>
    </Chart3BlueContainer>
  );
};

export default AnnualProgressChart;
