import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Chart3BlueContainer, Chart3Colors, Chart3MetricCard } from './Chart3StyleComponents';
import api from '../../api'; // твой axios instance
import HoverOverlay from './HoverOverlay';

// --- helper utilities ---
const daysAgo = (n) => {
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - n);
  return d;
};
const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
const safePct = (curr, prev) => {
  if (prev === 0 && curr === 0) return 0;
  if (prev === 0) return 100;
  return ((curr - prev) / Math.abs(prev)) * 100;
};
// aggregate sessions by date string YYYY-MM-DD
const aggByDay = (sessions) => {
  const map = {};
  sessions.forEach(s => {
    const d = new Date(s.date);
    d.setHours(0,0,0,0);
    const key = d.toISOString().slice(0,10);
    if (!map[key]) map[key] = { minutes: 0, sessions: 0, cycles: 0, moods: [] };
    map[key].minutes += Math.round((s.time || 0) / 60);
    map[key].sessions += 1;
    map[key].cycles += (s.cycles || 0);
    if (s.mood) map[key].moods.push(s.mood);
  });
  return map;
};
const buildDaysArray = (daysCount) => {
  const arr = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = daysAgo(i);
    const key = d.toISOString().slice(0,10);
    arr.push({ key, dateObj: d, label: d.toLocaleDateString(undefined, {month:'short', day:'numeric'}) });
  }
  return arr;
};
const calcCurrentStreak = (dayMap) => {
  let streak = 0; let i = 0;
  while (true) {
    const key = daysAgo(i).toISOString().slice(0,10);
    if (dayMap[key] && dayMap[key].sessions > 0) { streak++; i++; } else break;
  }
  return streak;
};
const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// --- component ---
const MetricCards = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/sessions');
        if (!mounted) return;
        setSessions(res.data || []);
      } catch (err) {
        console.error('Error fetching sessions for MetricCards:', err);
        if (mounted) setSessions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // base arrays
  const last14days = useMemo(() => buildDaysArray(14), []);
  const last28days = useMemo(() => buildDaysArray(28), []);
  const last30days = useMemo(() => buildDaysArray(30), []);
  const dayMap = useMemo(() => aggByDay(sessions), [sessions]);

  // last7 / prev7
  const last7 = useMemo(() => last14days.slice(7).map(d => {
    const v = dayMap[d.key] || { minutes:0, sessions:0 };
    return { name: d.label, date: d.key, minutes: v.minutes, sessions: v.sessions };
  }), [last14days, dayMap]);
  const prev7 = useMemo(() => last14days.slice(0,7).map(d => {
    const v = dayMap[d.key] || { minutes:0, sessions:0 };
    return { name: d.label, date: d.key, minutes: v.minutes, sessions: v.sessions };
  }), [last14days, dayMap]);

  // base metrics
  const totalSessionsLast7 = useMemo(() => last7.reduce((a,b)=>a+b.sessions,0), [last7]);
  const totalSessionsPrev7 = useMemo(() => prev7.reduce((a,b)=>a+b.sessions,0), [prev7]);
  const totalMinutesLast7 = useMemo(() => last7.reduce((a,b)=>a+b.minutes,0), [last7]);
  const totalMinutesPrev7 = useMemo(() => prev7.reduce((a,b)=>a+b.minutes,0), [prev7]);
  const avgSessionLast7 = useMemo(() => totalSessionsLast7 === 0 ? 0 : Math.round((totalMinutesLast7 / totalSessionsLast7)), [totalMinutesLast7, totalSessionsLast7]);
  const avgSessionPrev7 = useMemo(() => totalSessionsPrev7 === 0 ? 0 : Math.round((totalMinutesPrev7 / totalSessionsPrev7)), [totalMinutesPrev7, totalSessionsPrev7]);
  const avgPct = useMemo(() => safePct(avgSessionLast7, avgSessionPrev7), [avgSessionLast7, avgSessionPrev7]);
  const sessionsPct = useMemo(() => safePct(totalSessionsLast7, totalSessionsPrev7), [totalSessionsLast7, totalSessionsPrev7]);
  const currentStreak = useMemo(() => calcCurrentStreak(dayMap), [dayMap]);
  const prevStreak = useMemo(() => {
    if (currentStreak === 0) return 0;
    const dayBeforeStart = daysAgo(currentStreak).toISOString().slice(0,10);
    let s = 0, i = 0;
    while (true) {
      const key = new Date(new Date(dayBeforeStart).getTime() - (i*24*60*60*1000)).toISOString().slice(0,10);
      if (dayMap[key] && dayMap[key].sessions > 0) { s++; i++; } else break;
    }
    return s;
  }, [dayMap, currentStreak]);
  const streakPct = useMemo(() => safePct(currentStreak, prevStreak), [currentStreak, prevStreak]);

  // mini data
  const miniAvgData = last7.map(d => ({ name: d.name, value: d.sessions === 0 ? 0 : Math.round(d.minutes / Math.max(1, d.sessions)) }));
  const miniSessionsData = last7.map(d => ({ name: d.name, value: d.sessions }));
  const miniStreakData = last7.map(d => ({ name: d.name, value: (dayMap[d.date] && dayMap[d.date].sessions > 0) ? 1 : 0 }));

  // ---------- NEW STATS ----------

  // 1) Consistency Score (last 7 days)
  const consistencyLast7Pct = useMemo(() => {
    const daysWithSession = last7.reduce((acc, d) => acc + (d.sessions > 0 ? 1 : 0), 0);
    return Math.round((daysWithSession / Math.max(1, last7.length)) * 100);
  }, [last7]);

  // 2) Best day of week (use last 28 days, average minutes per weekday)
  const bestWeekday = useMemo(() => {
    const totals = Array(7).fill(0);
    const counts = Array(7).fill(0);
    last28days.forEach(d => {
      const wk = new Date(d.dateObj).getDay();
      const v = dayMap[d.key] ? dayMap[d.key].minutes : 0;
      totals[wk] += v;
      counts[wk] += 1; // every weekday appears counts times (4)
    });
    const averages = totals.map((t, i) => Math.round(t / Math.max(1, counts[i])));
    let maxIdx = 0;
    for (let i=1;i<7;i++) if (averages[i] > averages[maxIdx]) maxIdx = i;
    return { idx: maxIdx, name: weekdayNames[maxIdx], avgMinutes: averages[maxIdx], averages };
  }, [last28days, dayMap]);

  // 3) Mood trend (last 30 days) -> percentage positive/neutral/negative
  const moodTrend = useMemo(() => {
    // categories: positive: happy, excited; neutral: neutral; negative: sad, tired, angry
    const mapPositive = ['happy','excited','joy','good'];
    const mapNegative = ['sad','tired','angry','bad'];
    const counts = { positive:0, neutral:0, negative:0, total:0 };
    last30days.forEach(d => {
      const entry = dayMap[d.key];
      if (entry && entry.moods && entry.moods.length) {
        entry.moods.forEach(m => {
          const mLower = (m||'').toString().toLowerCase();
          if (mapPositive.includes(mLower)) counts.positive++;
          else if (mapNegative.includes(mLower)) counts.negative++;
          else counts.neutral++;
          counts.total++;
        });
      }
    });
    // If there are no mood entries - default to neutral 100%
    if (counts.total === 0) return { positive:0, neutral:100, negative:0, total:0 };
    return {
      positive: Math.round((counts.positive / counts.total) * 100),
      neutral: Math.round((counts.neutral / counts.total) * 100),
      negative: Math.round((counts.negative / counts.total) * 100),
      total: counts.total
    };
  }, [last30days, dayMap]);

  // 4) Sessions heatmap (last 28 days) -> grid 7x4 (rows = weekday)
  const heatmap = useMemo(() => {
    const days = last28days; // old->new (4 weeks)
    // group into 4 columns (weeks)
    const weeks = [[],[],[],[]];
    for (let i=0;i<28;i++) {
      const w = Math.floor(i/7);
      weeks[w].push(days[i]);
    }
    // compute value per cell (minutes)
    const cells = weeks.map(week => week.map(d => {
      const v = dayMap[d.key] ? dayMap[d.key].minutes : 0;
      return { key: d.key, minutes: v, label: d.label, dateObj: d.dateObj };
    }));
    // max for color scaling
    const max = Math.max(1, ...cells.flat().map(c=>c.minutes));
    return { weeks: cells, max };
  }, [last28days, dayMap]);

  // render helpers
  const renderPct = (pct) => {
    const sign = pct > 0 ? '+' : pct < 0 ? '' : '';
    const color = pct > 0 ? '#04CE00' : pct < 0 ? '#FF4D4F' : '#9AA0B4';
    return <span style={{ color, fontWeight: 600 }}>{sign}{Math.round(pct)}%</span>;
  };
  const bigNumberStyle = { fontSize: '36px', fontWeight: 800, color: '#70b8ff', lineHeight: 1 };

  if (loading) {
    return (
      <div className="flex flex-wrap gap-[6px]">
        {[1,2,3,4,5,6].map(i => (
          <Chart3BlueContainer key={i} title="Loading..." subtitle="Statistics" width="332px" height="225px">
            <div className="flex items-center justify-center h-full text-gray-400">Loading...</div>
          </Chart3BlueContainer>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-[12px]">
      {/* Avg Session */}
      <Chart3MetricCard title="Avg session time" subtitle="Statistics" width="332px" height="225px">
        <HoverOverlay
          title="Average session time"
          value={formatDuration(avgSessionLast7)}
          infoText="This metric shows the average duration of your meditation sessions over the last 7 days."
        >
          <div className="absolute right-[40px] top-[80px] w-[143px] h-[103px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniAvgData}>
                <Line type="monotone" dataKey="value" stroke={Chart3Colors.primary || '#FF718B'} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute left-[66px] bottom-[30px]">
            <div style={bigNumberStyle}>{formatDuration(avgSessionLast7)}</div>
            <div style={{ marginTop: 6, color: '#7A8194' }}>{renderPct(avgPct)} vs prev 7d</div>
          </div>
        </HoverOverlay>
      </Chart3MetricCard>

      {/* Total Sessions */}
      <Chart3MetricCard title="Total sessions" subtitle="Statistics" width="332px" height="225px">
        <HoverOverlay
          title="Total sessions"
          value={totalSessionsLast7 + ' sessions'}
          infoText="The total number of meditation sessions in the last 7 days."
        >
          <div className="absolute right-[40px] top-[80px] w-[143px] h-[103px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniSessionsData}>
                <Line type="monotone" dataKey="value" stroke={Chart3Colors.hover || '#04CE00'} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute left-[66px] bottom-[30px]">
            <div style={bigNumberStyle}>{totalSessionsLast7}</div>
            <div style={{ marginTop: 6, color: '#7A8194' }}>{renderPct(sessionsPct)} vs prev 7d</div>
          </div>
        </HoverOverlay>
      </Chart3MetricCard>

      {/* Consistency Score (new) */}
      <Chart3MetricCard title="Consistency" subtitle="Last 7 days" width="332px" height="225px">
        <HoverOverlay
          title="Consistency score"
          value={`${consistencyLast7Pct}%`}
          infoText="Percent of days with at least one session in the last 7 days."
        >
          <div className="absolute right-[26px] top-[100px] w-[140px] h-[90px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniStreakData}>
                <Line type="monotone" dataKey="value" stroke={Chart3Colors.hover || '#387DED'} strokeWidth={2} dot={{ r: 5 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute left-[66px] bottom-[33px]">
            <div className="text-[44px] font-bold leading-[52px] mb-2" style={bigNumberStyle}>{consistencyLast7Pct}%</div>
            <div style={{ color: '#7A8194' }}>Longest: <span style={{ fontWeight:700, color:'#70b8ff' }}>{/* compute longest streak */}</span></div>
          </div>
        </HoverOverlay>
      </Chart3MetricCard>

      {/* Best day of week */}
      <Chart3MetricCard title="Best day" subtitle="Average minutes (last 4 weeks)" width="332px" height="225px">
        <HoverOverlay
          title="Best day of week"
          value={`${bestWeekday.name} • ${bestWeekday.avgMinutes}m`}
          infoText={`This is the weekday where you typically meditate the most (avg minutes over the last 4 weeks).`}
        >
          <div className="absolute right-[20px] top-[44px] w-[160px] h-[110px] px-2">
            {/* show small horizontal bars for all weekdays */}
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {bestWeekday.averages.map((avg, i) => {
                const pct = Math.round((avg / Math.max(1, Math.max(...bestWeekday.averages))) * 100);
                return (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:34, fontSize:12, color:Chart3Colors.textSecondary }}>{weekdayNames[i]}</div>
                    <div style={{ flex:1, height:8, background:'#0e1629', borderRadius:6, overflow:'hidden' }}>
                      <div style={{ width:`${pct}%`, height:'100%', background: Chart3Colors.primary || '#FF718B' }} />
                    </div>
                    <div style={{ width:36, textAlign:'right', fontSize:12, color:'#7A8194' }}>{avg}m</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute left-[33px] bottom-[33px]">
            <div className="text-[28px] font-bold leading-[34px] mb-1" style={{ color:'#1E1B39' }}>{bestWeekday.name}</div>
            <div style={{ color:'#7A8194' }}>{bestWeekday.avgMinutes} min average</div>
          </div>
        </HoverOverlay>
      </Chart3MetricCard>

      {/* Mood trend (new) */}
      <Chart3MetricCard title="Mood trend" subtitle="Last 30 days" width="332px" height="225px">
        <HoverOverlay
          title="Mood trend"
          value={`${moodTrend.total > 0 ? `${moodTrend.positive}%` : '—'}`}
          infoText="Distribution of recorded moods in the last 30 days (positive / neutral / negative)."
        >
          <div className="absolute right-[20px] top-[44px] w-[160px] h-[110px] px-2 flex flex-col justify-center">
            {/* simple bars */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <div style={{ width:10, height:10, background:'#04CE00', borderRadius:3 }} />
              <div style={{ flex:1, height:10, background:'#101827', borderRadius:6, overflow:'hidden' }}>
                <div style={{ width: `${moodTrend.positive}%`, height:'100%', background:'#04CE00' }} />
              </div>
              <div style={{ width:36, textAlign:'right', color:'#7A8194' }}>{moodTrend.positive}%</div>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <div style={{ width:10, height:10, background:'#7A8194', borderRadius:3 }} />
              <div style={{ flex:1, height:10, background:'#101827', borderRadius:6, overflow:'hidden' }}>
                <div style={{ width: `${moodTrend.neutral}%`, height:'100%', background:'#7A8194' }} />
              </div>
              <div style={{ width:36, textAlign:'right', color:'#7A8194' }}>{moodTrend.neutral}%</div>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:10, height:10, background:'#FF4D4F', borderRadius:3 }} />
              <div style={{ flex:1, height:10, background:'#101827', borderRadius:6, overflow:'hidden' }}>
                <div style={{ width: `${moodTrend.negative}%`, height:'100%', background:'#FF4D4F' }} />
              </div>
              <div style={{ width:36, textAlign:'right', color:'#7A8194' }}>{moodTrend.negative}%</div>
            </div>
          </div>

          <div className="absolute left-[33px] bottom-[33px]">
            <div style={{ fontSize: '20px', fontWeight:700, color:'#1E1B39' }}>{moodTrend.total > 0 ? `${moodTrend.total} entries` : 'No data'}</div>
            <div style={{ color:'#7A8194', marginTop:6 }}>Positive / Neutral / Negative</div>
          </div>
        </HoverOverlay>
      </Chart3MetricCard>

      {/* Sessions heatmap (new) */}
      <Chart3MetricCard title="Sessions heatmap" subtitle="Last 28 days" width="332px" height="225px">
        <HoverOverlay
          title="Sessions heatmap"
          value={`${sessions.length} total`}
          infoText="Heatmap of minutes per day over the last 4 weeks (darker = more minutes)."
        >
          <div className="absolute right-[20px] top-[28px] w-[180px] h-[150px] p-2" style={{ display:'grid', gridTemplateRows:'repeat(7,1fr)', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
            {/* grid rows: 7 (weekdays), columns: 4 weeks */}
            {/* We want vertical rows = weekdays; our 'heatmap.weeks' is weeks[weekIdx][dayIdx] where dayIdx 0..6 */}
            {/** Render by row: weekday 0..6, for each week 0..3 render square */}
            {Array.from({ length: 7 }).map((_, rowIdx) => (
              Array.from({ length: 4 }).map((__, colIdx) => {
                const cell = heatmap.weeks[colIdx] && heatmap.weeks[colIdx][rowIdx] ? heatmap.weeks[colIdx][rowIdx] : { minutes: 0 };
                const intensity = Math.min(1, cell.minutes / Math.max(1, heatmap.max));
                const bg = `rgba(45,91,255,${0.1 + intensity * 0.85})`; // from faint to solid
                return (
                  <div key={`${rowIdx}-${colIdx}`} title={`${cell.label} • ${cell.minutes} min`} style={{
                    width: '100%',
                    height: '100%',
                    background: bg,
                    borderRadius: 6
                  }} />
                );
              })
            ))}
          </div>

          <div className="absolute left-[33px] bottom-[30px]">
            <div style={{ fontSize: '20px', fontWeight:700, color:'#1E1B39' }}>Heatmap</div>
            <div style={{ color:'#7A8194', marginTop:6 }}>Darker = more minutes</div>
          </div>
        </HoverOverlay>
      </Chart3MetricCard>
    </div>
  );
};

export default MetricCards;
