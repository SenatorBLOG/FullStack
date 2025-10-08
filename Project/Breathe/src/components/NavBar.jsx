import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const handlehomeClick = () => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    
    <nav
      className="sticky top-0 z-50 w-full h-20 bg-[#1A2A4F]/95 backdrop-blur-sm border-b border-[#2B3E6E]/50 
                 px-6 flex items-center justify-between shadow-md transition-all duration-300"
    >
      {/* Logo Section */}
      <div className="flex items-center flex-1">
        <Link
          to="/"
          onClick={handlehomeClick}
          className="text-[#BCDDFF] text-2xl font-medium font-poppins tracking-wide hover:text-[#D5E9FF] transition-colors"
        >
          Breathe
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center gap-6 px-4">
        <Link
          to="/"
          onClick={handlehomeClick}
          className="text-[#9CCBFF] text-[17px] font-normal hover:text-[#D1E5FF] transition-colors font-inter"
        >
          Home
        </Link>
        <Link
          to="/sessions"
          className="text-[#9CCBFF] text-[17px] font-normal hover:text-[#D1E5FF] transition-colors font-inter"
        >
          Your Sessions
        </Link>
        <Link
          to="/statistics"
          className="text-[#9CCBFF] text-[17px] font-normal hover:text-[#D1E5FF] transition-colors font-inter"
        >
          Statistics
        </Link>
        <Link
          to="/faq"
          className="text-[#9CCBFF] text-[17px] font-normal hover:text-[#D1E5FF] transition-colors font-inter"
        >
          FAQ
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="w-[130px] h-[38px] flex items-center justify-center rounded-[30px] 
                     bg-[#98CCFF] text-black text-sm font-medium hover:bg-[#85B8E6] transition-colors font-inter"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="w-[130px] h-[38px] flex items-center justify-center rounded-[30px] 
                     bg-[#3A82F7] text-[#E5F2FF] text-sm font-medium hover:bg-[#2970E5] transition-colors font-inter"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
