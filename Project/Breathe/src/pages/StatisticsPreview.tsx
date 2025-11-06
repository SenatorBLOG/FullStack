// src/pages/StatisticsPreview.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function StatisticsPreview() {
  return (
  <div className="relative w-full min-h-screen bg-[#001F3F]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/public/Background_img_Meditation.jpg')`,
          filter: 'brightness(0.6)'
        }}
      />
    <NavBar />
    
    <div className="relative z-10 flex flex-col min-h-screen"> 
      <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Statistics</h1>
<p className="text-muted">Log in to see your personal achievements. Below is an example of what you will get:</p>

      {/* demo cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 rounded">🔥 Total sessions: <strong>42</strong></div>
        <div className="p-4 bg-white/5 rounded">⏱ Avg session: <strong>18 min</strong></div>
        <div className="p-4 bg-white/5 rounded">⭐ Best day: <strong>Wednesday</strong></div>
      </div>

      {/* small demo chart or static image */}
      <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-700 rounded flex items-center justify-center text-sm">
        Demo chart (you can put a picture / canvas here)
</div>

      <div className="pt-6">
        <Link to="/signup" className="px-6 py-3 rounded bg-[#3A82F7] text-white">Create an account to see your details</Link>
        <Link to="/login" className="ml-4 px-6 py-3 rounded bg-white/10 text-white">Log in</Link>
      </div>
        </section>     
      
      </div>
  </div>
    
  );
}