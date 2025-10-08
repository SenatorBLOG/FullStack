import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="w-full h-20 bg-[#1A2A4F] px-4 py-2 flex items-center justify-center gap-4">
      {/* Logo Section */}
      <div className="flex items-center flex-1">
        <Link to="/" className="text-[#BCDDFF] text-2xl font-medium font-poppins">
          Breathe
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center gap-4 px-4">
        <Link to="/" className="text-[#70B8FF] text-[17px] font-normal hover:text-[#98CCFF] transition-colors font-inter">
          Home
        </Link>
        <Link to="/sessions" className="text-[#70B8FF] text-[17px] font-normal hover:text-[#98CCFF] transition-colors font-inter">
          Your Sessions
        </Link>
        <Link to="/statistics" className="text-[#70B8FF] text-[17px] font-normal hover:text-[#98CCFF] transition-colors font-inter">
          Statistics
        </Link>
        <Link to="/faq" className="text-[#70B8FF] text-[17px] font-normal hover:text-[#98CCFF] transition-colors font-inter">
          FAQ
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3 py-3">
        <Link 
          to="/login" 
          className="w-[150px] h-[38px] flex items-center justify-center rounded-[30px] bg-[#98CCFF] text-black text-sm font-normal hover:bg-[#85B8E6] transition-colors font-inter"
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className="w-[150px] h-[38px] flex items-center justify-center rounded-[30px] bg-[#3A82F7] text-[#E5F2FF] text-sm font-normal hover:bg-[#2970E5] transition-colors font-inter"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
