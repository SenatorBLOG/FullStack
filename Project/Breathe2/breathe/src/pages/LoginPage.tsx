import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function LoginPage() {
  const [email, setEmail] = useState('mikhail.senatorov@gmail.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-[960px] bg-cover bg-center border border-black shadow-lg"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/175745df7b1fa2da4d7f35faf06da9c88596d815?width=2880')",
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-[960px] bg-[rgba(10,15,31,0.77)]" />

      {/* Navigation Bar */}
      <div className="relative z-10">
        <NavBar />
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 absolute left-[157px] top-[173px] w-[1100px] h-[748px]">
        <div className="absolute left-[54px] top-0 w-[1009px] min-h-[142px] flex flex-col gap-[75px] p-[15px] pt-0">
          
          {/* Header Section */}
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-[#70B8FF] text-[36px] font-normal leading-normal font-montserrat mb-2">
              Login to your account to keep<br />
              Meditation progress
            </h1>
            <p className="text-[#88AACC] text-[20px] font-normal leading-normal font-montserrat w-[955px]">
              Welcome to Breathe.
            </p>
          </div>

          {/* Email Section */}
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

          {/* Password Section */}
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

          {/* Remember Me & Forgot Password Section */}
          <div className="relative w-[554px] h-[21px] flex justify-between items-center">
            <div className="flex items-center gap-[10px]">
              <div className="relative">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-[13px] h-[13px] border border-[#E5E5E5] appearance-none checked:bg-[#3A82F7] checked:border-[#3A82F7]"
                />
              </div>
              <label htmlFor="remember-me" className="text-[#3A82F7] text-[18px] font-normal font-roboto">
                Remember Me
              </label>
            </div>
            <Link to="/forgot-password" className="text-[#3A82F7] text-[18px] font-normal font-roboto hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Buttons */}
          <div className="relative w-[212px] h-[54px] flex gap-[33px]">
            <button className="w-[129px] h-[54px] bg-[#3A82F7] shadow-[0_4px_3px_0_rgba(0,0,0,0.25)] flex items-center justify-center hover:bg-[#2970E5] transition-colors">
              <span className="text-white text-[18px] font-normal font-roboto">Login</span>
            </button>
            <Link 
              to="/signup" 
              className="w-[129px] h-[54px] border border-[#3A82F7] flex items-center justify-center hover:bg-[#3A82F7] hover:text-white transition-colors"
            >
              <span className="text-[#3A82F7] text-[18px] font-normal font-roboto hover:text-white">Sign Up</span>
            </Link>
          </div>

          {/* Social Login Section */}
          <div className="relative w-[530px] h-[21px] flex items-center gap-[74px]">
            <span className="text-[#98CCFF] text-[18px] font-normal font-roboto">Or login with</span>
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

        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-0 top-[959px] w-full h-[65px]">
        <div className="w-full h-[67px] bg-[#090F20] relative -top-0.5" />
        
        {/* Footer Top Line */}
        <div className="absolute -top-0.5 left-0 w-full h-px bg-[#98CCFF]" />

        {/* Footer Menu */}
        <div className="absolute -top-0.5 left-[499px] w-[464px] h-[66px] flex items-center justify-center gap-4">
          <Link to="/goals" className="text-[#70B8FF] text-[14px] font-normal font-inter hover:text-[#98CCFF] transition-colors">
            Goals & Intentions
          </Link>
          <Link to="/integrations" className="text-[#70B8FF] text-[14px] font-normal font-inter hover:text-[#98CCFF] transition-colors">
            Integrations & Devices
          </Link>
          <Link to="/support" className="text-[#70B8FF] text-[14px] font-normal font-inter hover:text-[#98CCFF] transition-colors">
            Supports
          </Link>
          <Link to="/profile" className="text-[#70B8FF] text-[14px] font-normal font-inter hover:text-[#98CCFF] transition-colors">
            Profile
          </Link>
          <Link to="/faq" className="text-[#70B8FF] text-[14px] font-normal font-inter hover:text-[#98CCFF] transition-colors">
            FAQ
          </Link>
        </div>

        {/* Footer Logo */}
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/2f0b018a06bfb1fd79dc194bdc7ccf43154311f4?width=130"
          alt="Breathe Logo"
          className="absolute -top-px left-7 w-[65px] h-[65px] aspect-square"
        />

        {/* Social Media Links */}
        <div className="absolute top-1 left-[1209px] w-[117px] h-[46px]">
          <div className="absolute top-[21px] left-0 w-6 h-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_instagram)">
                <path d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#70B8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          
          <div className="absolute top-[21px] left-[30px] w-6 h-6 bg-[#090F20] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <g clipPath="url(#clip0_telegram)">
                <path d="M11 21.4348C16.7629 21.4348 21.4347 16.763 21.4347 11C21.4347 5.23706 16.7629 0.565247 11 0.565247C5.237 0.565247 0.565186 5.23706 0.565186 11C0.565186 16.763 5.237 21.4348 11 21.4348Z" fill="#70B8FF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5.28855 10.8899C8.3305 9.56455 10.3589 8.69081 11.3739 8.26866C14.2717 7.06335 14.8739 6.85397 15.2663 6.84706C15.3527 6.84554 15.5457 6.86693 15.6707 6.96838C15.7763 7.05404 15.8053 7.16975 15.8192 7.25096C15.8331 7.33218 15.8504 7.51719 15.8367 7.66175C15.6796 9.31173 15.0001 13.3158 14.6544 15.1638C14.5082 15.9458 14.2202 16.208 13.9413 16.2336C13.3354 16.2894 12.8752 15.8332 12.2883 15.4484C11.3699 14.8464 10.8511 14.4717 9.95961 13.8842C8.92937 13.2053 9.59723 12.8321 10.1844 12.2223C10.338 12.0627 13.0079 9.63425 13.0596 9.41395C13.0661 9.3864 13.0721 9.28369 13.011 9.22946C12.95 9.17523 12.86 9.19378 12.795 9.20853C12.7029 9.22943 11.2357 10.1992 8.39355 12.1177C7.9771 12.4037 7.5999 12.543 7.26194 12.5357C6.88936 12.5277 6.17267 12.3251 5.63989 12.1519C4.98641 11.9394 4.46704 11.8271 4.51227 11.4664C4.53582 11.2785 4.79458 11.0863 5.28855 10.8899Z" fill="#090F20"/>
              </g>
            </svg>
          </div>

          <div className="absolute top-[21px] left-[60px] w-[23px] h-[23px]">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.61618 12.2361L0 0H6.82462L12.1433 7.56273L17.8255 0.0340512H21.5841L13.9606 10.1468L23 23H16.1957L10.4367 14.8214L4.28831 22.9773H0.5093L8.61618 12.2361ZM17.1875 20.7329L4.18463 2.26713H5.83209L18.8186 20.7329H17.1875Z" fill="#70B8FF"/>
            </svg>
          </div>

          <div className="absolute top-[21px] left-[92px] w-[25px] h-[25px]">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M18.75 22.9166C17.8819 22.9166 17.1441 22.6128 16.5365 22.0052C15.9288 21.3975 15.625 20.6597 15.625 19.7916C15.625 19.6701 15.6337 19.5443 15.651 19.414C15.6684 19.2838 15.6944 19.1666 15.7292 19.0625L8.38542 14.7916C8.09028 15.0521 7.76042 15.2561 7.39583 15.4036C7.03125 15.5512 6.64931 15.625 6.25 15.625C5.38194 15.625 4.6441 15.3212 4.03646 14.7135C3.42882 14.1059 3.125 13.368 3.125 12.5C3.125 11.6319 3.42882 10.8941 4.03646 10.2864C4.6441 9.6788 5.38194 9.37498 6.25 9.37498C6.64931 9.37498 7.03125 9.44876 7.39583 9.59633C7.76042 9.7439 8.09028 9.9479 8.38542 10.2083L15.7292 5.93748C15.6944 5.83331 15.6684 5.71613 15.651 5.58592C15.6337 5.45571 15.625 5.32984 15.625 5.20831C15.625 4.34026 15.9288 3.60241 16.5365 2.99477C17.1441 2.38713 17.8819 2.08331 18.75 2.08331C19.6181 2.08331 20.3559 2.38713 20.9635 2.99477C21.5712 3.60241 21.875 4.34026 21.875 5.20831C21.875 6.07637 21.5712 6.81422 20.9635 7.42185C20.3559 8.02949 19.6181 8.33331 18.75 8.33331C18.3507 8.33331 17.9688 8.25953 17.6042 8.11196C17.2396 7.96439 16.9097 7.7604 16.6146 7.49998L9.27083 11.7708C9.30556 11.875 9.3316 11.9922 9.34896 12.1224C9.36632 12.2526 9.375 12.3785 9.375 12.5C9.375 12.6215 9.36632 12.7474 9.34896 12.8776C9.3316 13.0078 9.30556 13.125 9.27083 13.2291L16.6146 17.5C16.9097 17.2396 17.2396 17.0356 17.6042 16.888C17.9688 16.7404 18.3507 16.6666 18.75 16.6666C19.6181 16.6666 20.3559 16.9705 20.9635 17.5781C21.5712 18.1857 21.875 18.9236 21.875 19.7916C21.875 20.6597 21.5712 21.3975 20.9635 22.0052C20.3559 22.6128 19.6181 22.9166 18.75 22.9166Z" fill="#70B8FF"/>
            </svg>
          </div>

          <div className="absolute top-0 left-0 text-[#98CCFF] text-[12px] font-medium font-montserrat">
            Follow us
          </div>
        </div>
      </div>
    </div>
  );
}
