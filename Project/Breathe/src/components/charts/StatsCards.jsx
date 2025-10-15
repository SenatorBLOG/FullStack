import React, { useEffect, useMemo, useState } from 'react';
import api from '../../api';
import StatCard from './StatCard';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { Chart3Colors } from './Chart3StyleComponents';

const daysAgo = (n) => { const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() - n); return d; };
const buildDaysArray = (n) => { const arr=[]; for (let i=n-1;i>=0;i--){ const d=daysAgo(i); arr.push({ key: d.toISOString().slice(0,10), dateObj:d }); } return arr; };
const formatDuration = (minutes) => { if (minutes < 60) return `${minutes} min`; const h=Math.floor(minutes/60), m=minutes%60; return `${h}h ${m}m`; };
const safePct = (curr, prev) => { if (prev===0 && curr===0) return 0; if (prev===0) return 100; return ((curr-prev)/Math.abs(prev))*100; };

const weekdayShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// --- new helpers
const parseDateFromSession = (s) => {
  // try common names used in your backend
  const raw = s.sessionDate ?? s.date ?? s.createdAt ?? s.timestamp ?? s.session_date ?? s.session_date_iso;
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;
  d.setHours(0,0,0,0);
  return d;
};

const parseMinutesFromSession = (s) => {
  // try common fields: sessionLength (minutes), time, duration, length
  let v = s.sessionLength ?? s.length ?? s.duration ?? s.time ?? s.minutes ?? 0;
  if (v == null) v = 0;
  // if it's a string, try parse
  if (typeof v === 'string') {
    const num = Number(v);
    v = isNaN(num) ? 0 : num;
  }
  // heuristic: if value > 720 (12 hours), probably seconds -> convert to minutes
  if (v > 720) v = Math.round(v / 60);
  // if value looks like milliseconds (very large), convert
  if (v > 1000000) v = Math.round(v / 60000);
  return Math.round(v);
};

const parseMoodFromSession = (s) => {
  return s.moodAfter ?? s.mood ?? s.moodBefore ?? s.mood_before ?? null;
};

// --- component
const StatsCards = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await api.get('/sessions');
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : [];
        // quick log so you can see exactly what backend returns
        console.info('sessions fetched:', data.slice(0,10)); // show first 10
        setSessions(data);
      } catch(e){
        console.error('failed to fetch sessions', e);
        if (mounted) setSessions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const dayMap = useMemo(() => {
    const map = {};
    sessions.forEach(s => {
      const dObj = parseDateFromSession(s);
      if (!dObj) {
        // optionally log problematic entry for debug (comment out in prod)
        // console.warn('Skipping session with invalid date', s);
        return;
      }
      const key = dObj.toISOString().slice(0,10);
      if (!map[key]) map[key] = { minutes:0, sessions:0, moods:[] };
      const minutes = parseMinutesFromSession(s);
      map[key].minutes += minutes;
      map[key].sessions += 1;
      const mood = parseMoodFromSession(s);
      if (mood) map[key].moods.push(String(mood).toLowerCase());
    });
    return map;
  }, [sessions]);

  const last14 = useMemo(()=>buildDaysArray(14), []);
  const last7 = useMemo(()=> last14.slice(7), [last14]);
  const last28 = useMemo(()=>buildDaysArray(28), []);
  const last30 = useMemo(()=>buildDaysArray(30), []);

  const last7Data = useMemo(() => last7.map(d => ({
    key: d.key,
    minutes: dayMap[d.key]?.minutes || 0,
    sessions: dayMap[d.key]?.sessions || 0,
  })), [last7, dayMap]);

  const prev7Data = useMemo(() => last14.slice(0,7).map(d => ({
    key: d.key,
    minutes: dayMap[d.key]?.minutes || 0,
    sessions: dayMap[d.key]?.sessions || 0,
  })), [last14, dayMap]);

  const totalSessionsLast7 = useMemo(()=> last7Data.reduce((a,b)=>a+b.sessions,0), [last7Data]);
  const totalSessionsPrev7 = useMemo(()=> prev7Data.reduce((a,b)=>a+b.sessions,0), [prev7Data]);
  const totalMinutesLast7 = useMemo(()=> last7Data.reduce((a,b)=>a+b.minutes,0), [last7Data]);
  const totalMinutesPrev7 = useMemo(()=> prev7Data.reduce((a,b)=>a+b.minutes,0), [prev7Data]);

  const avgSessionLast7 = useMemo(()=> totalSessionsLast7 ? Math.round(totalMinutesLast7/Math.max(1,totalSessionsLast7)) : 0, [totalMinutesLast7, totalSessionsLast7]);
  const avgSessionPrev7 = useMemo(()=> totalSessionsPrev7 ? Math.round(totalMinutesPrev7/Math.max(1,totalSessionsPrev7)) : 0, [totalMinutesPrev7, totalSessionsPrev7]);

  const avgPct = useMemo(() => safePct(avgSessionLast7, avgSessionPrev7), [avgSessionLast7, avgSessionPrev7]);
  const sessionsPct = useMemo(() => safePct(totalSessionsLast7, totalSessionsPrev7), [totalSessionsLast7, totalSessionsPrev7]);

  const miniAvgData = useMemo(() => last7Data.map(d => ({ name:d.key, value: d.sessions? Math.round(d.minutes/Math.max(1,d.sessions)) : 0 })), [last7Data]);
  const miniSessionsData = useMemo(() => last7Data.map(d => ({ name:d.key, value: d.sessions })), [last7Data]);
  const miniConsistencyData = useMemo(() => last7Data.map(d => ({ name:d.key, value: d.sessions>0 ? 1 : 0 })), [last7Data]);

  const bestWeekday = useMemo(() => {
    const totals = Array(7).fill(0); const counts = Array(7).fill(0);
    last28.forEach(d => { const wd = d.dateObj.getDay(); totals[wd] += (dayMap[d.key]?.minutes||0); counts[wd]++; });
    const avgs = totals.map((t,i)=> Math.round(t/Math.max(1,counts[i])));
    let idx=0; for (let i=1;i<7;i++) if (avgs[i]>avgs[idx]) idx=i;
    const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return { idx, name: names[idx], avg: avgs[idx], averages: avgs };
  }, [last28, dayMap]);

  const moodTrend = useMemo(() => {
    const pos = new Set(['happy','excited','joy','good','calm','peaceful','relaxed','great','excellent','wonderful','amazing','joyful']);
    const neg = new Set(['sad','tired','angry','bad','stressed','anxious','frustrated','overwhelmed']);
    let p=0, u=0, n=0;
    last30.forEach(d => {
      const moods = dayMap[d.key]?.moods || [];
      moods.forEach(m => { if (pos.has(m)) p++; else if (neg.has(m)) n++; else u++; });
    });
    const tot = p + u + n; if (!tot) return { positive:0, neutral:100, negative:0, total:0 };
    return { positive: Math.round(p/tot*100), neutral: Math.round(u/tot*100), negative: Math.round(n/tot*100), total: tot };
  }, [last30, dayMap]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* ... остальная часть компонента без изменений (тот же JSX что у тебя был) */}
        {/* Avg session time */}
        <StatCard
          value={loading ? '—' : formatDuration(avgSessionLast7)}
          subValue={
            <span className={avgPct>0? 'text-emerald-600':'text-rose-600'}>
              {(avgPct>0? '+':'') + Math.round(avgPct) + '%'} vs prev 7d
            </span>
          }
          label="Avg session (last 7 days)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniAvgData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Line type="monotone" dataKey="value" stroke={Chart3Colors.primary || '#3A82F7'} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Total sessions */}
        <StatCard
          value={loading ? '—' : String(totalSessionsLast7)}
          subValue={
            <span className={sessionsPct>0? 'text-emerald-600':'text-rose-600'}>
              {(sessionsPct>0? '+':'') + Math.round(sessionsPct) + '%'} vs prev 7d
            </span>
          }
          label="Total sessions (last 7 days)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniSessionsData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Line type="monotone" dataKey="value" stroke={Chart3Colors.hover || '#04CE00'} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Consistency */}
        <StatCard
          value={loading ? '—' : `${Math.round((last7Data.filter(d=>d.sessions>0).length/Math.max(1,last7Data.length))*100)}%`}
          label="Consistency (days with a session, 7d)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniConsistencyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Line type="step" dataKey="value" stroke={Chart3Colors.secondary || '#2D5BFF'} strokeWidth={2} dot={{ r:2 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Best day */}
        <StatCard
          value={loading ? '—' : bestWeekday.name}
          label={`Best day • ${bestWeekday.avg} min avg (4 wks)`}
        >
          <div className="h-full flex flex-col justify-center gap-2">
            {bestWeekday.averages.map((avg, i) => {
              const maxA = Math.max(...bestWeekday.averages, 1);
              const pct = Math.min(1, avg / maxA);
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 text-[11px] text-slate-500">{weekdayShort[i]}</div>
                  <div className="flex-1 h-2 rounded bg-slate-800/40 overflow-hidden">
                    <div className="h-full" style={{ width: `${pct*100}%`, background: Chart3Colors.primary || '#3A82F7' }} />
                  </div>
                  <div className="w-9 text-right text-[11px] text-slate-500">{avg}m</div>
                </div>
              );
            })}
          </div>
        </StatCard>

        {/* Mood trend */}
        <StatCard
          value={loading ? '—' : (moodTrend.total ? `${moodTrend.positive}%` : '—')}
          label="Positive / Neutral / Negative (30d)"
        >
          <div className="h-full flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#04CE00' }} />
              <div className="flex-1 h-2.5 rounded bg-slate-800/40 overflow-hidden">
                <div className="h-full" style={{ width: `${moodTrend.positive}%`, background: '#04CE00' }} />
              </div>
              <div className="w-10 text-right text-[11px] text-slate-500">{moodTrend.positive}%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#7A8194' }} />
              <div className="flex-1 h-2.5 rounded bg-slate-800/40 overflow-hidden">
                <div className="h-full" style={{ width: `${moodTrend.neutral}%`, background: '#7A8194' }} />
              </div>
              <div className="w-10 text-right text-[11px] text-slate-500">{moodTrend.neutral}%</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#FF4D4F' }} />
              <div className="flex-1 h-2.5 rounded bg-slate-800/40 overflow-hidden">
                <div className="h-full" style={{ width: `${moodTrend.negative}%`, background: '#FF4D4F' }} />
              </div>
              <div className="w-10 text-right text-[11px] text-slate-500">{moodTrend.negative}%</div>
            </div>
          </div>
        </StatCard>

        {/* Heatmap */}
        <StatCard
          value={loading ? '—' : `${sessions.length} sessions`}
          label="Sessions heatmap (last 28 days)"
        >
          <div className="h-full grid grid-cols-4 grid-rows-7 gap-1.5">
            {(() => {
              const days = buildDaysArray(28);
              const weeks = [[],[],[],[]];
              for (let i=0;i<28;i++) weeks[Math.floor(i/7)].push(days[i]);
              const cells = weeks.map(w => w.map(d => ({ key:d.key, minutes: (dayMap[d.key]?.minutes || 0) })));
              const max = Math.max(1, ...cells.flat().map(c=>c.minutes));
              const out = [];
              for (let row=0; row<7; row++) {
                for (let col=0; col<4; col++) {
                  const cell = cells[col] && cells[col][row] ? cells[col][row] : { minutes:0 };
                  const intensity = Math.min(1, cell.minutes / max);
                  const bg = `rgba(45,91,255,${0.08 + intensity*0.86})`;
                  out.push(<div key={`${row}-${col}`} className="rounded" style={{ background: bg }} />);
                }
              }
              return out;
            })()}
          </div>
        </StatCard>
      </div>
    </div>
  );
};

export default StatsCards;
