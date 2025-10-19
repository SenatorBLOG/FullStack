// src/pages/StatisticsPreview.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function StatisticsPreview() {
  return (
    <div className="w-full min-h-screen">
    <NavBar />
    <div className="max-w-4xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Статистика</h1>
      <p className="text-muted">Войдите, чтобы увидеть персональные достижения. Ниже — пример того, что вы получите:</p>

      {/* demo cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 rounded">🔥 Total sessions: <strong>42</strong></div>
        <div className="p-4 bg-white/5 rounded">⏱ Avg session: <strong>18 min</strong></div>
        <div className="p-4 bg-white/5 rounded">⭐ Best day: <strong>Wednesday</strong></div>
      </div>

      {/* small demo chart or static image */}
      <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-700 rounded flex items-center justify-center text-sm">
        Демо-график (здесь можно поставить картинку / canvas)
      </div>

      <div className="pt-6">
        <Link to="/signup" className="px-6 py-3 rounded bg-[#3A82F7] text-white">Создать аккаунт — увидеть свои данные</Link>
        <Link to="/login" className="ml-4 px-6 py-3 rounded bg-white/10 text-white">Войти</Link>
      </div>
      </div>
    </div>
  );
}
