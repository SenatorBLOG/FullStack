import React, { useEffect, useRef, useState } from 'react';
import { Chart3BlueContainer } from './Chart3StyleComponents'; // либо ./Chart3BlueContainer если у тебя отдельный файл
import api from '../../api';

/**
 * MoodQualificationChart
 * - fetches /sessions and aggregates field `mood` (case-insensitive)
 * - renders horizontal segmented bar (one segment per mood)
 * - shows emoji + count under each segment
 * - simple hover overlay with label + percent (no external tooltip lib)
 *
 * CONFIG:
 *  - CONTAINER_WIDTH/HEIGHT: change props to Chart3BlueContainer (default below)
 *  - MIN_SEGMENT_PX: minimal visible segment width (px) even if count === 0
 *  - EMOJI_MAP / COLOR_MAP: tune emoji/colors for moods
 */

const MIN_SEGMENT_PX = 8;           // visible width for zero-value segments
const CONTAINER_WIDTH = '50%';    // default container size (keeps it compact)
const CONTAINER_HEIGHT = '30%';   // default container size (keeps it compact)

const EMOJI_MAP = {
  sad: '😢',
  happy: '😊',
  tired: '😴',
  neutral: '😐',
  excited: '🤩',
  // other labels will fallback to 🙂
};

const COLOR_MAP = {
  sad: '#f94144',
  happy: '#90be6d',
  tired: '#f3722c',
  neutral: '#4d908e',
  excited: '#43aa8b'
};

// deterministic fallback color generator
const fallbackColor = (label, idx) => {
  const k = (label || '').toString().toLowerCase();
  let h = 0;
  for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) | 0;
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 68% 56%)`;
};

const MoodQualificationChart = ({ width = CONTAINER_WIDTH, height = CONTAINER_HEIGHT }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]); // [{ label, count }]
  const [total, setTotal] = useState(0);

  const barRef = useRef(null);
  const [barPx, setBarPx] = useState(400); // fallback px until measured
  const [hover, setHover] = useState(null); // { label, percent, leftPercent }

  // fetch sessions and aggregate by mood
  useEffect(() => {
    load();
    // measure bar width on resize
    const ro = new ResizeObserver(() => {
      if (barRef.current) setBarPx(barRef.current.clientWidth);
    });
    if (barRef.current) {
      ro.observe(barRef.current);
      setBarPx(barRef.current.clientWidth);
    }
    window.addEventListener('resize', () => { if (barRef.current) setBarPx(barRef.current.clientWidth); });
    return () => {
      try { ro.disconnect(); } catch(e) {}
      window.removeEventListener('resize', () => {});
    };
  }, []);

  async function load() {
    setLoading(true);
    try {
      // fetch sessions and aggregate mood counts (case-insensitive)
      const res = await api.get('/sessions');
      const rows = Array.isArray(res?.data) ? res.data : [];
      const map = {};
      rows.forEach(r => {
        const m = (r.mood || '').toString().trim();
        const key = m.length ? m.toLowerCase() : 'unknown';
        map[key] = (map[key] || 0) + 1;
      });
      // convert to array preserving insertion order of object keys (stable)
      const arr = Object.keys(map).map(k => ({ label: k, count: map[k] }));
      // If no moods found, preserve a small demo set
      if (!arr.length) {
        arr.push({ label: 'neutral', count: 0 }, { label: 'happy', count: 0 });
      }
      const tot = arr.reduce((s, it) => s + (it.count || 0), 0);
      setItems(arr);
      setTotal(tot);
    } catch (err) {
      console.error('Failed to load sessions for mood chart:', err);
      // fallback demo
      const demo = [
        { label: 'sad', count: 16 },
        { label: 'happy', count: 2113 },
        { label: 'tired', count: 5 },
        { label: 'neutral', count: 45 },
        { label: 'excited', count: 12 }
      ];
      setItems(demo);
      setTotal(demo.reduce((s,i)=>s+i.count,0));
    } finally {
      setLoading(false);
      // measure after next paint
      setTimeout(() => { if (barRef.current) setBarPx(barRef.current.clientWidth); }, 50);
    }
  }

  if (loading) {
    return (
      <Chart3BlueContainer title="Mood tracking" subtitle="Community" width={width} height={height}>
        <div style={{ padding: 12, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#70B8FF' }}>
          Loading...
        </div>
      </Chart3BlueContainer>
    );
  }

  // compute raw percents
  const rawPercents = items.map(it => (total > 0 ? (it.count / total) * 100 : 0));

  // convert min px to min percent
  const minPercent = Math.max( (MIN_SEGMENT_PX / Math.max(1, barPx)) * 100, 0.7 ); // at least 0.7%

  // adjust percents so each >= minPercent, but sum = 100
  const computeAdjustedPercents = (raw, minP) => {
    const adjusted = new Array(raw.length).fill(0);
    let smallCount = 0;
    let largeSum = 0;
    for (let i=0;i<raw.length;i++){
      if (raw[i] < minP) { adjusted[i] = minP; smallCount++; }
      else { largeSum += raw[i]; }
    }
    const remain = 100 - smallCount * minP;
    if (remain <= 0 || largeSum === 0) {
      // distribute evenly
      const even = 100 / raw.length;
      return raw.map(() => even);
    }
    // distribute proportionally to raw among large items
    for (let i=0;i<raw.length;i++){
      if (raw[i] >= minP) {
        adjusted[i] = Math.max(minP, (raw[i] / largeSum) * remain);
      }
    }
    // final normalization to exactly 100 (fix rounding)
    const sum = adjusted.reduce((s,v)=>s+v,0);
    return adjusted.map(v => v / sum * 100);
  };

  const adjustedPercents = computeAdjustedPercents(rawPercents, minPercent);

  // compute left cumulative percents and segments
  let curLeft = 0;
  const segments = items.map((it, idx) => {
    const pct = Math.round(adjustedPercents[idx] * 10) / 10; // one decimal
    const seg = { label: it.label, count: it.count, percent: pct, leftPercent: curLeft + pct / 2, widthPercent: pct, color: COLOR_MAP[it.label.toLowerCase()] || fallbackColor(it.label, idx) };
    curLeft += pct;
    return seg;
  });

  // hover handlers: set simple {label, percent, leftPercent}
  const onSegEnter = (seg) => setHover({ label: seg.label, percent: seg.percent, leftPercent: seg.leftPercent });
  const onSegLeave = () => setHover(null);
  const onIconEnter = (label) => {
    const s = segments.find(x => x.label === label);
    if (s) setHover({ label: s.label, percent: s.percent, leftPercent: s.leftPercent });
  };
  const onIconLeave = () => setHover(null);

  // helpers
  const displayLabel = (l) => (''+l).length ? l : 'unknown';
  const displayEmoji = (label) => {
    const e = EMOJI_MAP[label.toLowerCase()];
    return e || '🙂';
  };

  return (
    <Chart3BlueContainer title="Mood tracking" subtitle="Community" width={width} height={height}>
      <div style={{ padding: 12, boxSizing: 'border-box', height: '0%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* bar */}
        <div>
          <div ref={barRef} onMouseLeave={onSegLeave} style={{ position: 'relative', height: 28, borderRadius: 12, overflow: 'hidden', background: '#0b1220' }}>
            {segments.map((s, i) => (
              <div
                key={s.label + i}
                onMouseEnter={() => onSegEnter(s)}
                onMouseMove={() => onSegEnter(s)}
                onMouseLeave={onSegLeave}
                title={`${displayLabel(s.label)} — ${s.percent}% (${s.count})`}
                style={{
                  position: 'absolute',
                  left: `${Math.max(0, (s.leftPercent - s.widthPercent / 2))}%`,
                  width: `${s.widthPercent}%`,
                  top: 0,
                  bottom: 0,
                  background: s.color,
                  cursor: 'pointer',
                  transition: 'transform 120ms ease'
                }}
              />
            ))}

            {/* hover box */}
            {hover && typeof hover.leftPercent === 'number' && (
              <div style={{
                position: 'absolute',
                left: `${Math.max(3, Math.min(97, hover.leftPercent))}%`,
                bottom: '100%',
                transform: 'translateX(-50%) translateY(-8px)',
                pointerEvents: 'none'
              }}>
                <div style={{ background: 'rgba(2,6,23,0.95)', color: '#fff', padding: '6px 8px', borderRadius: 8, fontSize: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.28)' }}>
                  <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{displayLabel(hover.label)}</div>
                  <div style={{ opacity: 0.9 }}>{Math.round(hover.percent)}%</div>
                </div>
              </div>
            )}
          </div>

          {/* percents row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13, color: '#70B8FF' }}>
            {segments.map((s, i) => <div key={s.label + '-pct'} style={{ textAlign: 'center', flex: 1 }}>{Math.round(s.percent)}%</div>)}
          </div>
        </div>

        {/* emojis + counts row */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 6 }}>
          {items.map((it, idx) => {
            const label = it.label;
            const color = COLOR_MAP[label.toLowerCase()] || fallbackColor(label, idx);
            return (
              <div
                key={label + idx}
                onMouseEnter={() => onIconEnter(label)}
                onMouseLeave={onIconLeave}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 64, cursor: 'default' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 20, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  <span>{displayEmoji(label)}</span>
                </div>
                <div style={{ marginTop: 8, fontWeight: 700, color: '#70B8FF' }}>{(it.count || 0).toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Chart3BlueContainer>
  );
};

export default MoodQualificationChart;
