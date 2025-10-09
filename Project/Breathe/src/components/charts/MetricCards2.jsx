import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Chart3Colors } from './Chart3StyleComponents';
import api from '../../api';
import Chart3MetricCard from './Chart3MetricCard'; // <- новый унифицированный
import HoverOverlay from './HoverOverlay';

// helpers (как у тебя)
const daysAgo = (n) => { const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() - n); return d; };
const formatDuration = (minutes) => { if (minutes < 60) return `${minutes}m`; const hours = Math.floor(minutes/60); return `${hours}h ${minutes%60}m`; };
const safePct = (curr, prev) => { if (prev === 0 && curr === 0) return 0; if (prev === 0) return 100; return ((curr - prev)/Math.abs(prev))*100; };
const aggByDay = (sessions) => { const map = {}; sessions.forEach(s => { const d = new Date(s.date); d.setHours(0,0,0,0); const key = d.toISOString().slice(0,10); if (!map[key]) map[key] = { minutes:0, sessions:0, cycles:0, moods:[] }; map[key].minutes += Math.round((s.time||0)/60); map[key].sessions += 1; map[key].cycles += (s.cycles||0); if (s.mood) map[key].moods.push(s.mood); }); return map; };
const buildDaysArray = (daysCount) => { const arr=[]; for (let i=daysCount-1;i>=0;i--){ const d=daysAgo(i); arr.push({ key: d.toISOString().slice(0,10), dateObj:d, label: d.toLocaleDateString(undefined,{month:'short',day:'numeric'}) }); } return arr; };

// main
const MetricCards = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try { const res = await api.get('/sessions'); if (!mounted) return; setSessions(res.data || []); }
      catch(e){ console.error(e); if (mounted) setSessions([]); }
      finally{ if (mounted) setLoading(false); }
    })();
    return () => { mounted = false; };
  }, []);

  const last14days = useMemo(() => buildDaysArray(14), []);
  const last7 = useMemo(() => last14days.slice(7), [last14days]);
  const last30days = useMemo(() => buildDaysArray(30), []);
  const dayMap = useMemo(() => aggByDay(sessions), [sessions]);

  // compute metrics
  const last7Data = useMemo(() => last7.map(d => { const v = dayMap[d.key] || { minutes:0, sessions:0 }; return { name:d.label, date:d.key, minutes: v.minutes, sessions: v.sessions }; }), [last7, dayMap]);
  const prev7Data = useMemo(() => last14days.slice(0,7).map(d => { const v = dayMap[d.key] || { minutes:0, sessions:0 }; return { name:d.label, date:d.key, minutes: v.minutes, sessions: v.sessions }; }), [last14days, dayMap]);

  const totalSessionsLast7 = useMemo(() => last7Data.reduce((a,b)=>a+b.sessions,0), [last7Data]);
  const totalSessionsPrev7 = useMemo(() => prev7Data.reduce((a,b)=>a+b.sessions,0), [prev7Data]);
  const totalMinutesLast7 = useMemo(() => last7Data.reduce((a,b)=>a+b.minutes,0), [last7Data]);
  const totalMinutesPrev7 = useMemo(() => prev7Data.reduce((a,b)=>a+b.minutes,0), [prev7Data]);

  const avgSessionLast7 = useMemo(() => totalSessionsLast7===0?0:Math.round(totalMinutesLast7/totalSessionsLast7), [totalMinutesLast7, totalSessionsLast7]);
  const avgSessionPrev7 = useMemo(() => totalSessionsPrev7===0?0:Math.round(totalMinutesPrev7/totalSessionsPrev7), [totalMinutesPrev7, totalSessionsPrev7]);

  const avgPct = useMemo(() => safePct(avgSessionLast7, avgSessionPrev7), [avgSessionLast7, avgSessionPrev7]);
  const sessionsPct = useMemo(() => safePct(totalSessionsLast7, totalSessionsPrev7), [totalSessionsLast7, totalSessionsPrev7]);

  // mini data (for small line charts)
  const miniAvgData = useMemo(() => last7Data.map(d => ({ name:d.name, value: d.sessions ? Math.round(d.minutes / Math.max(1,d.sessions)) : 0 })), [last7Data]);
  const miniSessionsData = useMemo(() => last7Data.map(d => ({ name:d.name, value: d.sessions })), [last7Data]);

  // consistency score (last 7)
  const consistencyLast7Pct = useMemo(() => {
    const daysWith = last7Data.reduce((acc,d)=> acc + (d.sessions>0?1:0), 0);
    return Math.round((daysWith / Math.max(1, last7Data.length)) * 100);
  }, [last7Data]);

  // mood trend (basic)
  const moodTrend = useMemo(() => {
    const mapPos = ['happy','excited','joy','good'];
    const mapNeg = ['sad','tired','angry','bad'];
    let pos=0, neu=0, neg=0, tot=0;
    last30days.forEach(d => {
      const e = dayMap[d.key];
      if (!e || !e.moods || e.moods.length===0) return;
      e.moods.forEach(m => {
        const mm = (m||'').toString().toLowerCase();
        if (mapPos.includes(mm)) pos++; else if (mapNeg.includes(mm)) neg++; else neu++;
        tot++;
      });
    });
    if (tot===0) return { positive:0, neutral:100, negative:0, total:0 };
    return { positive: Math.round(pos/tot*100), neutral: Math.round(neu/tot*100), negative: Math.round(neg/tot*100), total: tot };
  }, [last30days, dayMap]);

  // best weekday (avg minutes) last 28 days
  const bestWeekday = useMemo(() => {
    const days28 = buildDaysArray(28);
    const totals = Array(7).fill(0);
    const counts = Array(7).fill(0);
    days28.forEach(d => { const wk = new Date(d.dateObj).getDay(); const v = dayMap[d.key] ? dayMap[d.key].minutes : 0; totals[wk]+=v; counts[wk]++; });
    const avgs = totals.map((t,i)=> Math.round(t/Math.max(1, counts[i])));
    let idx = 0; for (let i=1;i<7;i++) if (avgs[i] > avgs[idx]) idx = i;
    const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return { idx, name: names[idx], avgMinutes: avgs[idx], averages: avgs };
  }, [dayMap]);

  if (loading) {
    return <div className="flex gap-3">Loading...</div>;
  }

  // Small helper for pct color rendering
  const renderPct = (pct) => {
    const color = pct > 0 ? '#04CE00' : pct < 0 ? '#FF4D4F' : '#9AA0B4';
    return <span style={{ color, fontWeight:700 }}>{Math.round(pct)}%</span>;
  };

  return (
    <div className="grid gap-4 w-full"
     style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {/* Avg session */}
      <Chart3MetricCard
        title="Session time"
        subtitle="Average"
        value={formatDuration(avgSessionLast7)}
        change={Math.round(avgPct)}
        changeType={avgPct>0 ? 'positive' : avgPct<0 ? 'negative' : 'neutral'}
        hoverInfo="Average duration per session (last 7 days)."
        width="332px" height="225px"
      >
        {/* children: mini chart sized to card's bottom slot */}
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniAvgData}>
              <Line type="monotone" dataKey="value" stroke={Chart3Colors.primary || '#FF718B'} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Chart3MetricCard>

      {/* Total sessions */}
      <Chart3MetricCard
        title="Total sessions"
        subtitle="Statistics"
        value={totalSessionsLast7}
        change={Math.round(sessionsPct)}
        changeType={sessionsPct>0 ? 'positive' : sessionsPct<0 ? 'negative' : 'neutral'}
        hoverInfo="Total sessions in last 7 days."
        width="332px" height="225px"
      >
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniSessionsData}>
              <Line type="monotone" dataKey="value" stroke={Chart3Colors.hover || '#04CE00'} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Chart3MetricCard>

      {/* Consistency */}
      <Chart3MetricCard
        title="Consistency"
        subtitle="Last 7 days"
        value={`${consistencyLast7Pct}%`}
        hoverInfo="Percent of days with at least one session."
        width="332px" height="225px"
      >
        <div style={{ width: '90%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7Data.map(d=>({ name:d.name, value: d.sessions>0 ? 1 : 0 }))}>
              <Line type="step" dataKey="value" stroke={Chart3Colors.secondary || '#2D5BFF'} strokeWidth={2} dot={{ r:2 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Chart3MetricCard>

      {/* Best day */}
      <Chart3MetricCard
        title="Best day"
        subtitle="Avg minutes (4 wks)"
        value={`${bestWeekday.name}`}
        hoverInfo="Weekday with highest average meditation minutes over last 4 weeks."
        width="332px" height="225px"
      >
        <div style={{ width: '70%', padding: 1, height:'150px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {bestWeekday.averages.map((avg, i) => {
              const maxA = Math.max(...bestWeekday.averages, 1);
              const pct = Math.round((avg/maxA)*100);
              const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][i];
              return (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:34, fontSize:12, color: Chart3Colors.textSecondary }}>{weekday}</div>
                  <div style={{ flex:1, height:10, background:'#0e1629', borderRadius:6, overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background: Chart3Colors.primary || '#FF718B' }} />
                  </div>
                  <div style={{ width:36, textAlign:'right', fontSize:12, color:'#7A8194' }}>{avg}m</div>
                </div>
              );
            })}
          </div>
        </div>
      </Chart3MetricCard>

      {/* Mood trend */}
      <Chart3MetricCard
        title="Mood trend"
        subtitle="Last 30 days"
        value={moodTrend.total ? `${moodTrend.positive}%` : '—'}
        hoverInfo="Distribution of positive / neutral / negative mood entries."
        width="332px" height="225px"
      >
        <div style={{ width:'100%', padding:6 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:10, height:10, background:'#04CE00', borderRadius:3 }} />
              <div style={{ flex:1, height:10, background:'#0b1220', borderRadius:6, overflow:'hidden' }}>
                <div style={{ width: `${moodTrend.positive}%`, height:'100%', background:'#04CE00' }} />
              </div>
              <div style={{ width:40, textAlign:'right', color:'#7A8194' }}>{moodTrend.positive}%</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:10, height:10, background:'#7A8194', borderRadius:3 }} />
              <div style={{ flex:1, height:10, background:'#0b1220', borderRadius:6, overflow:'hidden' }}>
                <div style={{ width: `${moodTrend.neutral}%`, height:'100%', background:'#7A8194' }} />
              </div>
              <div style={{ width:40, textAlign:'right', color:'#7A8194' }}>{moodTrend.neutral}%</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:10, height:10, background:'#FF4D4F', borderRadius:3 }} />
              <div style={{ flex:1, height:10, background:'#0b1220', borderRadius:6, overflow:'hidden' }}>
                <div style={{ width: `${moodTrend.negative}%`, height:'100%', background:'#FF4D4F' }} />
              </div>
              <div style={{ width:40, textAlign:'right', color:'#7A8194' }}>{moodTrend.negative}%</div>
            </div>
          </div>
        </div>
      </Chart3MetricCard>

      {/* Heatmap */}
      <Chart3MetricCard
        title="Heatmap"
        subtitle="Last 28 days"
        value={`${sessions.length}`}
        hoverInfo="Heatmap of minutes per day over last 4 weeks."
        width="332px" height="225px"
      >
        <div style={{ width:'100%', height:'100%', padding:6, boxSizing:'border-box' }}>
          <div style={{
            display:'grid',
            gridTemplateRows: 'repeat(7, 1fr)',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:6,
            height:'100%'
          }}>
            {/* build heatmap cells - same approach as earlier code */}
            {(() => {
              const days = buildDaysArray(28);
              const weeks = [[],[],[],[]];
              for (let i = 0; i < 28; i++) weeks[Math.floor(i/7)].push(days[i]);
              const cells = weeks.map(w => w.map(d => ({ key:d.key, minutes: (dayMap[d.key] ? dayMap[d.key].minutes : 0), label:d.label })));
              const max = Math.max(1, ...cells.flat().map(c=>c.minutes));
              const out = [];
              for (let row=0; row<7; row++) {
                for (let col=0; col<4; col++) {
                  const cell = cells[col] && cells[col][row] ? cells[col][row] : { minutes:0, label:'' };
                  const intensity = Math.min(1, cell.minutes / max);
                  const bg = `rgba(45,91,255,${0.08 + intensity*0.86})`;
                  out.push(
                    <div key={`${row}-${col}`} title={`${cell.label} • ${cell.minutes} min`} style={{ width:'100%', height:'100%', background: bg, borderRadius:6 }} />
                  );
                }
              }
              return out;
            })()}
          </div>
        </div>
      </Chart3MetricCard>
    </div>
  );
};

export default MetricCards;
