import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import api from '../api';
import { toast } from 'sonner';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Account created');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Sign up failed';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background and Overlay */}
      <div 
        className="absolute inset-0 w-full h-[960px] bg-cover bg-center border border-black shadow-lg"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/175745df7b1fa2da4d7f35faf06da9c88596d815?width=2880')",
        }}
      />
      <div className="absolute inset-0 w-full h-[960px] bg-[rgba(10,15,31,0.77)]" />

      {/* NavBar */}
      <div className="relative z-10">
        <NavBar />
      </div>

      {/* Main SignUp Container */}
      <div className="relative z-10 absolute left-[157px] top-[173px] w-[1100px] h-[748px]">
        <div className="absolute left-[54px] top-0 w-[1009px] min-h-[142px] flex flex-col gap-[75px] p-[15px] pt-0">
          
          {/* Header */}
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-[#70B8FF] text-[36px] font-normal leading-normal font-montserrat mb-2">
              Create an account to track<br />
              your meditation progress
            </h1>
            <p className="text-[#88AACC] text-[20px] font-normal leading-normal font-montserrat w-[955px]">
              Welcome to Breathe.
            </p>
          </div>

          {/* Email */}
          <div className="relative w-[554px] h-[74px]">
            <div className="absolute inset-0 border border-[#C1BBBB] bg-[rgba(255,255,255,0.04)]" />
            <div className="absolute left-1 top-[1px] w-[72px] h-0 bg-[#3A82F7]" />
            <label className="absolute left-[27px] top-[12px] text-[#70B8FF] text-[18px] font-normal font-roboto">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="absolute left-[27px] top-[39px] w-[245px] h-[21px] bg-transparent text-[#3A82F7] text-[18px] font-medium font-roboto border-none outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative w-[594px] h-[114px] flex flex-col gap-[10px] p-[10px]">
            <div className="relative w-[574px] h-[74px]">
              <div className="absolute inset-0 border border-[rgba(193,187,187,0.6)] bg-transparent" />
              <label className="absolute left-[19px] top-[12px] text-[#70B8FF] text-[18px] font-normal font-roboto">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******************"
                className="absolute left-[19px] top-[39px] w-[545px] h-[18px] bg-transparent text-[#3A82F7] text-[18px] font-medium font-roboto border-none outline-none placeholder-[#3A82F7]"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="relative w-[300px] h-[54px] flex gap-[33px]">
            <button 
              onClick={handleSignUp}
              className="w-[129px] h-[54px] bg-[#3A82F7] shadow-[0_4px_3px_0_rgba(0,0,0,0.25)] flex items-center justify-center hover:bg-[#2970E5] transition-colors"
            >
              <span className="text-white text-[18px] font-normal font-roboto">Sign Up</span>
            </button>
            <Link 
              to="/login" 
              className="w-[129px] h-[54px] border border-[#3A82F7] flex items-center justify-center hover:bg-[#3A82F7] transition-colors group"
            >
              <span className="text-[#3A82F7] text-[18px] font-normal font-roboto group-hover:text-white">Login</span>
            </Link>
          </div>

          {/* Social Sign Up */}
          <div className="relative w-[530px] h-[21px] flex items-center gap-[74px]">
            <span className="text-[#98CCFF] text-[18px] font-normal font-roboto">Or sign up with</span>
            <Link to="#" className="text-[#70B8FF] text-[18px] font-bold font-roboto hover:underline">
              Facebook
            </Link>
            <Link to="#" className="text-[#70B8FF] text-[18px] font-bold font-roboto hover:underline">
              LinkedIn
            </Link>
            <Link to="#" className="text-[#70B8FF] text-[18px] font-bold font-roboto hover:underline">
              Google
            </Link>
          </div>

          {error && <p className="text-red-500 text-[16px]">{error}</p>}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-0 top-[959px] w-full h-[65px]">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/70adf0aa2be2ed78dbc91b7d2350387bee86b5a2?width=2880" 
          alt="Footer"
          className="w-full h-[65px]"
        />
      </div>
    </div>
  );
}
