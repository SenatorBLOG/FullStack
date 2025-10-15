import React, { useEffect, useMemo, useState } from 'react';
import api from '../../api';
import StatCard from './StatCard';

const MoodTrackingGrid = () => {
  const [loading, setLoading] = useState(true);
  const [moodStats, setMoodStats] = useState({ positive: {count:0, percentage:0}, neutral: {count:0, percentage:0}, negative: {count:0, percentage:0}, total: 0 });
  const [topMood, setTopMood] = useState({ label: '—', count: 0 });
  const [uniqueMoods, setUniqueMoods] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [moodRes, sessRes] = await Promise.all([
          api.get('/stats/mood'),
          api.get('/sessions')
        ]);
        if (!mounted) return;
        const moodData = moodRes.data || {};
        setMoodStats({
          positive: moodData.positive || { count: 0, percentage: 0 },
          neutral: moodData.neutral || { count: 0, percentage: 0 },
          negative: moodData.negative || { count: 0, percentage: 0 },
          total: moodData.total || 0
        });
        const rows = Array.isArray(sessRes.data) ? sessRes.data : [];
        const map = new Map();
        rows.forEach(r => {
          const m = (r.mood || '').toString().trim().toLowerCase();
          if (!m) return;
          map.set(m, (map.get(m) || 0) + 1);
        });
        setUniqueMoods(map.size);
        let top = { label: '—', count: 0 };
        map.forEach((count, label) => { if (count > top.count) top = { label, count }; });
        setTopMood(top);
      } catch (e) {
        if (!mounted) return;
        setMoodStats({ positive:{count:0,percentage:0}, neutral:{count:0,percentage:0}, negative:{count:0,percentage:0}, total:0 });
        setTopMood({ label: '—', count: 0 });
        setUniqueMoods(0);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const cards = useMemo(() => ([
    { value: loading ? '—' : `${moodStats.positive.percentage}%`, sub: `${moodStats.positive.count} entries`, label: 'Positive' },
    { value: loading ? '—' : `${moodStats.neutral.percentage}%`, sub: `${moodStats.neutral.count} entries`, label: 'Neutral' },
    { value: loading ? '—' : `${moodStats.negative.percentage}%`, sub: `${moodStats.negative.count} entries`, label: 'Negative' },
    { value: loading ? '—' : String(moodStats.total), label: 'Total mood entries' },
    { value: loading ? '—' : (topMood.label || '—'), sub: topMood.count ? `${topMood.count}×` : undefined, label: 'Most common mood' },
    { value: loading ? '—' : String(uniqueMoods), label: 'Unique moods' },
  ]), [loading, moodStats, topMood, uniqueMoods]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <StatCard key={i} value={c.value} subValue={c.sub} label={c.label} />
        ))}
      </div>
    </div>
  );
};

export default MoodTrackingGrid;
