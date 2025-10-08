import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StatsPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sessions');
      setSessions(res.data);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  const totalStats = {
    totalSessions: sessions.length,
    totalMinutes: sessions.reduce((acc, sess) => acc + Math.floor(sess.time / 60), 0),
    streak: calculateStreak(sessions),
  };

  const calculateStreak = (sessions) => {
    if (sessions.length === 0) return 0;
    sessions.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 1;
    let currentDate = new Date(sessions[0].date);
    for (let i = 1; i < sessions.length; i++) {
      const prevDate = new Date(sessions[i].date);
      if (Math.floor(currentDate - prevDate) / (1000 * 60 * 60 * 24) === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    return streak;
  };

  // Подготовка данных для графиков
  const weeklyActivityData = [
    { day: 'MON', views: 1000 },
    { day: 'TUE', views: 1200 },
    { day: 'WED', views: 1400 },
    { day: 'THU', views: 1600 },
    { day: 'FRI', views: 1800 },
    { day: 'SAT', views: 2000 },
    { day: 'SUN', views: 2200 },
  ]; // Замени на реальные данные из sessions (e.g., группировка по дням недели)

  const annualSalesData = [
    { year: '2017', sales: 1000000 },
    { year: '2018', sales: 1500000 },
    { year: '2019', sales: 2000000 },
    { year: '2020', sales: 2500000 },
    { year: '2021', sales: 3000000 },
    { year: '2022', sales: 3500000 },
  ]; // Группировка по годам из sessions

  const reviewsData = [
    { name: 'Approved', value: 410 },
    { name: 'Pending', value: 142 },
    { name: 'Under review', value: 340 },
    { name: 'Rejected', value: 590 },
  ]; // Кастомизировать под твои данные

  const monthlyActivityData = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 200 },
    { month: 'Mar', value: 300 },
    { month: 'Apr', value: 400 },
    { month: 'May', value: 500 },
    { month: 'Jun', value: 600 },
  ]; // Группировка по месяцам

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center border border-black shadow-lg"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/175745df7b1fa2da4d7f35faf06da9c88596d815?width=2880')",
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-[rgba(10,15,31,0.77)]" />

      {/* Navbar */}
      {/* Твой код навбара... */}

      {/* Main Content Container */}
      <div className="relative z-10 left-[181px] top-[125px] w-[1100px] px-[54px] py-0 pb-[42px]">
        <div className="flex flex-col items-start gap-[75px] w-[1009px] p-[15px] pt-0">
          
          {/* Activity Chart (Bar Chart with Recharts) */}
          <ResponsiveContainer width="100%" height={425}>
            <BarChart data={weeklyActivityData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#BDDEFF" />
            </BarChart>
          </ResponsiveContainer>

          {/* Sales Statistics (Line Chart with Recharts) */}
          <ResponsiveContainer width="100%" height={384}>
            <LineChart data={annualSalesData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3A82F7" />
            </LineChart>
          </ResponsiveContainer>

          {/* Reviews Qualification (Pie Chart with Recharts) */}
          <ResponsiveContainer width="50%" height={358}>
            <PieChart>
              <Pie data={reviewsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#3A82F7" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Monthly Activity (Stacked Bar Chart with Recharts) */}
          <ResponsiveContainer width="50%" height={841}>
            <BarChart data={monthlyActivityData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="month" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" stackId="a" fill="#3A82F7" />
            </BarChart>
          </ResponsiveContainer>

          {/* Session History */}
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between">
                  <p>{formatDate(session.date)}</p>
                  <p>{Math.floor(session.time / 60)} min, {session.cycles} cycles</p>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>

      {/* Footer */}
      {/* Твой код футера... */}
    </div>
  );
}