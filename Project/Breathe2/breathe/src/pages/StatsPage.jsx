import React from 'react';

export default function StatsPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-[960px] bg-cover bg-center border border-black shadow-lg"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/175745df7b1fa2da4d7f35faf06da9c88596d815?width=2880')",
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-[960px] bg-[rgba(10,15,31,0.77)]" />

      {/* Navbar */}
      <div className="relative z-10 w-full h-20 bg-[#1A2A4F] px-20 py-2 flex items-center justify-center gap-4">
        <div className="flex items-center flex-1">
          <span className="text-[#BCDDFF] text-2xl font-medium font-poppins">Breathe</span>
        </div>
        <div className="flex items-center gap-5 px-4">
          <a href="/" className="text-[#70B8FF] text-[17px] font-normal font-inter">Home</a>
          <a href="/sessions" className="text-[#70B8FF] text-[17px] font-normal font-inter">Your Sessions</a>
          <a href="/statistics" className="text-[#70B8FF] text-[17px] font-normal font-inter">Statistics</a>
          <a href="/faq" className="text-[#70B8FF] text-[17px] font-normal font-inter">FAQ</a>
        </div>
        <div className="flex items-center gap-3 py-3">
          <button className="w-[150px] h-[38px] flex items-center justify-center rounded-[30px] bg-[#98CCFF] text-black text-sm font-normal font-inter">
            Logout
          </button>
          <button className="w-[150px] h-[38px] flex items-center justify-center rounded-[30px] bg-[#3A82F7] gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#98CCFF"/>
            </svg>
            <span className="text-[#C5E2FF] text-sm font-normal font-inter">Profile</span>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 left-[181px] top-[125px] w-[1100px] px-[54px] py-0 pb-[42px]">
        <div className="flex flex-col items-start gap-[75px] w-[1009px] p-[15px] pt-0">
          
          {/* How it works section */}
          <div className="flex flex-col justify-center items-start">
            <h2 className="text-[#70B8FF] text-center text-[36px] font-normal leading-normal font-montserrat mb-4">
              How it works?
            </h2>
            <p className="text-[#88AACC] text-[20px] font-normal leading-normal font-montserrat max-w-[800px]">
              Breathe guides you through calming breathing exercises with a visual cue — a softly expanding and contracting circle. Just follow its rhythm: inhale as it grows, exhale as it shrinks. In a few minutes, you'll feel more relaxed, focused, and balanced.
            </p>
          </div>

          {/* Activity Chart (Chart 3 - Main Style) */}
          <div className="w-[1009px] h-[425px] relative">
            {/* Container with blue theme */}
            <div className="w-[1009px] h-[425px] flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] shadow-[0_2px_6px_0_rgba(13,10,44,0.08)] absolute left-0 top-0"></div>
            
            {/* Card Info */}
            <div className="w-[313px] h-[54px] flex-shrink-0 absolute left-[66px] top-[33px]">
              <div className="w-[127px] h-[21px] flex-shrink-0 text-[#98CCFF] font-inter text-[18px] font-normal leading-[20px] absolute left-0 top-0">
                Activity
              </div>
              <div className="w-[313px] h-[29px] flex-shrink-0 text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-0 top-[25px]">
                Average views
              </div>
            </div>

            {/* Dropdown Selector */}
            <div className="flex w-[239px] h-[41px] px-4 py-[10px] justify-end items-center gap-6 flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] absolute left-[705px] top-[39px]">
              <div className="flex w-[55px] h-[20px] flex-col justify-center flex-shrink-0 text-[#BDDEFF] font-inter text-[14px] font-normal leading-[16px]">
                Weekly
              </div>
              <div className="w-[10px] h-[5px] flex-shrink-0 relative">
                <div className="w-[1px] h-[7px] rotate-[-45deg] rounded-[5px] bg-[#D9D9D9] absolute left-0 top-0"></div>
                <div className="w-[1px] h-[7px] rounded-[5px] bg-[#D9D9D9] absolute left-[4px] top-0"></div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[877px] h-0 bg-[#CFCFCF] absolute left-[66px] top-[110px]"></div>

            {/* Y-axis Labels */}
            <div className="w-[34px] h-[200px] flex-shrink-0 absolute left-[66px] top-[158px]">
              <div className="w-[34px] h-[17px] flex-shrink-0 text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0">3k</div>
              <div className="w-[34px] h-[17px] flex-shrink-0 text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-[61px]">2k</div>
              <div className="w-[30px] h-[17px] flex-shrink-0 text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-[4px] top-[122px]">1k</div>
              <div className="w-[18px] h-[17px] flex-shrink-0 text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-[16px] top-[184px]">0</div>
            </div>

            {/* Chart Grid Lines */}
            <div className="w-[786px] h-[190px] flex-shrink-0 absolute left-[157px] top-[167px]">
              <div className="w-[786px] h-0 bg-[#CFCFCF] absolute left-0 top-0"></div>
              <div className="w-[786px] h-0 bg-[#CFCFCF] absolute left-0 top-[63px]"></div>
              <div className="w-[786px] h-0 bg-[#CFCFCF] absolute left-0 top-[125px]"></div>
              <div className="w-[786px] h-0 bg-[#CFCFCF] absolute left-0 top-[190px]"></div>
            </div>

            {/* Chart Bars */}
            <div className="w-[788px] h-[157px] flex-shrink-0 absolute left-[155px] top-[200px]">
              <div className="w-[52px] h-[107px] flex-shrink-0 rounded-t-[7px] bg-[#BDDEFF] absolute left-0 top-[50px]"></div>
              <div className="w-[52px] h-[48px] flex-shrink-0 rounded-t-[7px] bg-[#BDDEFF] absolute left-[123px] top-[109px]"></div>
              <div className="w-[52px] h-[113px] flex-shrink-0 rounded-t-[7px] bg-[#BDDEFF] absolute left-[246px] top-[43px]"></div>
              <div className="w-[52px] h-[68px] flex-shrink-0 rounded-t-[7px] bg-[#BDDEFF] absolute left-[368px] top-[89px]"></div>
              <div className="w-[52px] h-[157px] flex-shrink-0 rounded-t-[7px] bg-[#3A82F7] absolute left-[491px] top-0"></div>
              <div className="w-[52px] h-[37px] flex-shrink-0 rounded-t-[7px] bg-[#BDDEFF] absolute left-[614px] top-[120px]"></div>
              <div className="w-[52px] h-[98px] flex-shrink-0 rounded-t-[7px] bg-[#BDDEFF] absolute left-[737px] top-[59px]"></div>
            </div>

            {/* X-axis Labels */}
            <div className="w-[793px] h-[15px] flex-shrink-0 absolute left-[152px] top-[376px]">
              <div className="w-[57px] h-[15px] flex-shrink-0 text-[#BDDEFF] text-center font-inter text-[12px] font-normal leading-[14px] absolute left-0 top-0">MON</div>
              <div className="w-[47px] h-[15px] flex-shrink-0 text-[#BDDEFF] text-center font-inter text-[12px] font-normal leading-[14px] absolute left-[128px] top-0">TUE</div>
              <div className="w-[55px] h-[15px] flex-shrink-0 text-[#BDDEFF] text-center font-inter text-[12px] font-normal leading-[14px] absolute left-[246px] top-0">WED</div>
              <div className="w-[51px] h-[15px] flex-shrink-0 text-[#BDDEFF] text-center font-inter text-[12px] font-normal leading-[14px] absolute left-[371px] top-0">THU</div>
              <div className="w-[36px] h-[15px] flex-shrink-0 text-[#BDDEFF] text-center font-inter text-[12px] font-normal leading-[14px] absolute left-[502px] top-0">FRI</div>
              <div className="w-[56px] h-[15px] flex-shrink-0 text-[#BDDEFF] text-center font-inter text-[12px] font-normal leading-[14px] absolute left-[615px] top-0">SAT</div>
              <div className="w-[56px] h-[15px] flex-shrink-0 text-[#BDDEFF] text-center font-inter text-[12px] font-normal leading-[14px] absolute left-[737px] top-0">SUN</div>
            </div>

            {/* Hover Tooltip */}
            <div className="w-[135px] h-[44px] flex-shrink-0 absolute left-[604px] top-[149px]">
              <div className="w-[135px] h-[38px] rounded-[8px] bg-[#D9D9D9] absolute left-0 top-0"></div>
              <div className="w-[83px] h-[19px] flex-shrink-0 text-[#12294E] text-center font-inter text-[16px] font-normal leading-[18px] absolute left-[26px] top-[8px]">
                2,313
              </div>
            </div>
          </div>

          {/* Sales Statistics Chart - Updated to match Chart 3 style */}
          <div className="w-[1009px] h-[384px] relative">
            <div className="w-[1009px] h-[384px] flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] shadow-[0_2px_6px_0_rgba(13,10,44,0.08)] absolute left-0 top-0"></div>
            
            {/* Card Info */}
            <div className="w-[301px] h-[52px] flex-shrink-0 absolute left-[65px] top-[32px]">
              <div className="w-[156px] text-[#98CCFF] font-inter text-[18px] font-normal leading-[20px] absolute left-0 top-0">
                Statistics
              </div>
              <div className="w-[301px] text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-0 top-[24px]">
                Sales statistic
              </div>
            </div>

            {/* Dropdown */}
            <div className="flex w-[239px] h-[40px] px-4 py-[10px] justify-end items-center gap-6 flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] absolute left-[704px] top-[38px]">
              <div className="flex w-[55px] h-[20px] flex-col justify-center flex-shrink-0 text-[#BDDEFF] font-inter text-[14px] font-normal leading-[16px]">
                Annual
              </div>
              <div className="w-[10px] h-[5px] flex-shrink-0 relative">
                <div className="w-[1px] h-[7px] rotate-[-45deg] rounded-[5px] bg-[#D9D9D9] absolute left-0 top-0"></div>
                <div className="w-[1px] h-[7px] rounded-[5px] bg-[#D9D9D9] absolute left-[4px] top-0"></div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[878px] h-0 bg-[#CFCFCF] absolute left-[65px] top-[106px]"></div>

            {/* Years */}
            <div className="w-[801px] h-[16px] flex-shrink-0 absolute left-[143px] top-[328px]">
              <div className="w-[64px] text-[#BDDEFF] text-center font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0">2017</div>
              <div className="w-[64px] text-[#BDDEFF] text-center font-inter text-[14px] font-normal leading-[16px] absolute left-[147px] top-0">2018</div>
              <div className="w-[65px] text-[#BDDEFF] text-center font-inter text-[14px] font-normal leading-[16px] absolute left-[293px] top-0">2019</div>
              <div className="w-[69px] text-[#BDDEFF] text-center font-inter text-[14px] font-normal leading-[16px] absolute left-[438px] top-0">2020</div>
              <div className="w-[68px] text-[#BDDEFF] text-center font-inter text-[14px] font-normal leading-[16px] absolute left-[585px] top-0">2021</div>
              <div className="w-[68px] text-[#BDDEFF] text-center font-inter text-[14px] font-normal leading-[16px] absolute left-[732px] top-0">2022</div>
            </div>

            {/* Y-axis amounts */}
            <div className="w-[44px] h-[169px] flex-shrink-0 absolute left-[65px] top-[144px]">
              <div className="w-[44px] text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0">3M</div>
              <div className="w-[42px] text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-[2px] top-[52px]">2M</div>
              <div className="w-[38px] text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-[6px] top-[105px]">1M</div>
              <div className="w-[18px] text-[#BDDEFF] text-right font-inter text-[14px] font-normal leading-[16px] absolute left-[26px] top-[153px]">0</div>
            </div>

            {/* Grid lines */}
            <div className="w-[801px] h-[161px] flex-shrink-0 absolute left-[142px] top-[151px]">
              <div className="w-[801px] h-0 bg-[#CFCFCF] absolute left-0 top-0"></div>
              <div className="w-[801px] h-0 bg-[#CFCFCF] absolute left-0 top-[53px]"></div>
              <div className="w-[801px] h-0 bg-[#CFCFCF] absolute left-0 top-[106px]"></div>
              <div className="w-[801px] h-0 bg-[#CFCFCF] absolute left-0 top-[161px]"></div>
            </div>

            {/* Stacked bars with blue theme colors */}
            <div className="w-[800px] h-[169px] flex-shrink-0 absolute left-[142px] top-[142px]">
              {/* Bar 1 */}
              <div className="w-[67px] h-[135px] flex-shrink-0 absolute left-0 top-[34px]">
                <div className="w-[67px] h-[34px] flex-shrink-0 rounded-t-[10px] bg-[#3A82F7] absolute left-0 top-0"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#5A9AFF] absolute left-0 top-[34px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#7AB5FF] absolute left-0 top-[67px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#9AC8FF] absolute left-0 top-[101px]"></div>
              </div>
              {/* Bar 2 */}
              <div className="w-[67px] h-[101px] flex-shrink-0 absolute left-[147px] top-[67px]">
                <div className="w-[67px] h-[34px] flex-shrink-0 rounded-t-[10px] bg-[#5A9AFF] absolute left-0 top-0"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#7AB5FF] absolute left-0 top-[34px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#9AC8FF] absolute left-0 top-[67px]"></div>
              </div>
              {/* Bar 3 (highest) */}
              <div className="w-[67px] h-[169px] flex-shrink-0 absolute left-[293px] top-0">
                <div className="w-[67px] h-[34px] flex-shrink-0 rounded-t-[10px] bg-[#1A6EE6] absolute left-0 top-0"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#3A82F7] absolute left-0 top-[34px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#5A9AFF] absolute left-0 top-[67px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#7AB5FF] absolute left-0 top-[101px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#9AC8FF] absolute left-0 top-[135px]"></div>
              </div>
              {/* Bar 4 */}
              <div className="w-[67px] h-[101px] flex-shrink-0 absolute left-[440px] top-[67px]">
                <div className="w-[67px] h-[34px] flex-shrink-0 rounded-t-[10px] bg-[#5A9AFF] absolute left-0 top-0"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#7AB5FF] absolute left-0 top-[34px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#9AC8FF] absolute left-0 top-[67px]"></div>
              </div>
              {/* Bar 5 */}
              <div className="w-[67px] h-[101px] flex-shrink-0 absolute left-[587px] top-[67px]">
                <div className="w-[67px] h-[34px] flex-shrink-0 rounded-t-[10px] bg-[#5A9AFF] absolute left-0 top-0"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#7AB5FF] absolute left-0 top-[34px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#9AC8FF] absolute left-0 top-[67px]"></div>
              </div>
              {/* Bar 6 */}
              <div className="w-[67px] h-[101px] flex-shrink-0 absolute left-[734px] top-[67px]">
                <div className="w-[67px] h-[34px] flex-shrink-0 rounded-t-[10px] bg-[#5A9AFF] absolute left-0 top-0"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#7AB5FF] absolute left-0 top-[34px]"></div>
                <div className="w-[67px] h-[34px] flex-shrink-0 bg-[#9AC8FF] absolute left-0 top-[67px]"></div>
              </div>
            </div>

            {/* Trend line using blue colors */}
            <svg className="w-[744px] h-[154px] flex-shrink-0 absolute left-[170px] top-[156px]" width="748" height="157" viewBox="0 0 748 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.7" d="M206.679 38.0851C111.562 90.3065 34.1439 62.1343 7.32422 38.3031V156.43H741.68V72.4301C732.616 74.7998 711.775 95.2929 669.45 77.199C600.265 43.5245 541.843 69.1689 524.418 77.199C506.994 85.2291 449.083 105.952 405.01 59.3256C360.936 12.6995 330.7 5.70572 314.813 5.18765C298.926 4.66958 270.74 1.04311 206.679 38.0851Z" fill="url(#paint0_linear_blue)"/>
              <path d="M7.32422 38.3031C34.1439 62.1343 111.562 90.3065 206.679 38.0851C270.74 1.04311 298.926 4.66958 314.813 5.18765C330.7 5.70572 360.936 12.6995 405.01 59.3256C449.083 105.952 506.994 85.2291 524.418 77.199C541.843 69.1689 600.265 43.5245 669.45 77.199C711.775 95.2929 732.616 74.7998 741.68 72.4301" stroke="#3A82F7" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="7.32422" cy="38.3031" r="4" fill="#3A82F7" stroke="white" strokeWidth="2"/>
              <circle cx="155.395" cy="59.8794" r="4" fill="#3A82F7" stroke="white" strokeWidth="2"/>
              <circle cx="300.806" cy="5.354" r="4" fill="#3A82F7" stroke="white" strokeWidth="2"/>
              <circle cx="447.547" cy="85.9326" r="4" fill="#3A82F7" stroke="white" strokeWidth="2"/>
              <circle cx="594.289" cy="60.8862" r="4" fill="#3A82F7" stroke="white" strokeWidth="2"/>
              <circle cx="741.029" cy="72.7703" r="4" fill="#3A82F7" stroke="white" strokeWidth="2"/>
              <defs>
                <linearGradient id="paint0_linear_blue" x1="374.502" y1="4.854" x2="374.502" y2="156.43" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B5D7FF"/>
                  <stop offset="1" stopColor="#E3F2FF" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Three Statistics Cards - Updated to match Chart 3 style */}
          <div className="flex items-start gap-[6px]">
            {/* Visit Duration Card */}
            <div className="w-[332px] h-[225px] relative">
              <div className="w-[332px] h-[225px] flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] shadow-[0_2px_6px_0_rgba(13,10,44,0.08)] absolute left-0 top-0"></div>
              
              <div className="w-[119px] h-[44px] flex-shrink-0 absolute left-[33px] top-[32px]">
                <div className="text-[#98CCFF] font-inter text-[14px] font-normal leading-[16px] absolute left-[1px] top-0 w-[62px] h-[16px]">
                  Statistics
                </div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-bold leading-[24px] absolute left-0 top-[20px] w-[119px] h-[24px]">
                  Visit duration
                </div>
              </div>

              <svg className="w-[143px] h-[103px] flex-shrink-0 stroke-[3px] stroke-[#3A82F7] absolute left-[157px] top-[90px]" width="147" height="107" viewBox="0 0 147 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.91309 105.186L19.1523 90.0151L25.7036 62.4324L35.0127 73.4657L64.3194 47.9516L74.3181 2.09521L90.1782 65.1908L113.624 2.09521L120.519 76.5686L129.828 45.1933L144.999 70.0177" stroke="#3A82F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <div className="w-[133px] h-[72px] flex-shrink-0 absolute left-[33px] top-[99px]">
                <div className="text-[#BDDEFF] font-inter text-[44px] font-bold leading-[52px] absolute left-0 top-0 w-[133px] h-[52px]">
                  5m 8s
                </div>
                <div className="w-[65px] h-[16px] flex-shrink-0 absolute left-0 top-[56px]">
                  <div className="text-[#3A82F7] font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0 w-[46px] h-[16px]">
                    -7.69%
                  </div>
                  <svg className="w-[15px] h-[10px] flex-shrink-0 fill-[#3A82F7] absolute left-[51px] top-[3px]" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.72834 5.13278C10.5213 4.33867 11.2798 3.57792 12.0391 2.8168C12.689 2.16691 13.3389 1.51802 13.9887 0.870125C14.2013 0.659036 14.4578 0.593798 14.7469 0.678908C15.0359 0.764019 15.208 0.969109 15.2718 1.25893C15.3333 1.54089 15.2257 1.77222 15.0284 1.97132C14.1271 2.87216 13.2265 3.77326 12.3267 4.67461C11.6595 5.3415 10.9919 6.00801 10.3237 6.67415C9.95743 7.03784 9.53337 7.03971 9.16856 6.67977C8.66164 6.17986 8.1581 5.67619 7.65794 5.16878C7.60132 5.11179 7.5657 5.03417 7.52558 4.97418L3.31279 9.19073C3.37278 9.19448 3.43052 9.20085 3.48864 9.20122C3.97606 9.20122 4.46348 9.19635 4.95089 9.20422C5.27296 9.2091 5.51555 9.36545 5.6479 9.65827C5.77425 9.93797 5.73226 10.2094 5.53542 10.4479C5.46481 10.5363 5.37484 10.6072 5.27245 10.6554C5.17007 10.7035 5.058 10.7274 4.94489 10.7253C3.77809 10.728 2.60829 10.7302 1.43999 10.7242C0.998684 10.722 0.672113 10.3868 0.670613 9.94622C0.666864 8.78392 0.666864 7.62161 0.670613 6.45931C0.670613 6.01763 1.01668 5.67194 1.43586 5.67569C1.85504 5.67944 2.17824 6.00939 2.18573 6.45219C2.19286 6.92686 2.18761 7.4019 2.18761 7.87695V8.07379L2.25585 8.11803C2.29827 8.05122 2.34565 7.98767 2.39757 7.92794C3.88932 6.43344 5.3822 4.94007 6.87619 3.44782C7.265 3.05976 7.68531 3.05901 8.07262 3.44444C8.58128 3.95086 9.08907 4.4589 9.59599 4.96856C9.63948 5.01243 9.67435 5.06642 9.72834 5.13278Z" fill="#3A82F7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Visits Card */}
            <div className="w-[332px] h-[225px] relative">
              <div className="w-[332px] h-[225px] flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] shadow-[0_2px_6px_0_rgba(13,10,44,0.08)] absolute left-0 top-0"></div>

              <div className="w-[96px] h-[44px] flex-shrink-0 absolute left-[33px] top-[32px]">
                <div className="text-[#98CCFF] font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0 w-[62px] h-[16px]">
                  Statistics
                </div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-bold leading-[24px] absolute left-0 top-[20px] w-[96px] h-[24px]">
                  Total visits
                </div>
              </div>

              <svg className="w-[145px] h-[117px] flex-shrink-0 stroke-[3px] stroke-[#3A82F7] absolute left-[155px] top-[76px]" width="149" height="121" viewBox="0 0 149 121" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.11719 119.186L21.8838 108.041L28.1917 89.957L37.2337 98.3681L63.9393 2.27026L79.0794 73.9757L93.5887 41.5926L113.986 89.957L124.079 75.2374L132.07 80.9149L147 47.6907" stroke="#3A82F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <div className="w-[111px] h-[72px] flex-shrink-0 absolute left-[33px] top-[99px]">
                <div className="text-[#BDDEFF] font-inter text-[44px] font-bold leading-[52px] absolute left-0 top-0 w-[111px] h-[52px]">
                  325k
                </div>
                <div className="w-[77px] h-[16px] flex-shrink-0 absolute left-0 top-[56px]">
                  <div className="text-[#3A82F7] font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0 w-[58px] h-[16px]">
                    +18.34%
                  </div>
                  <svg className="w-[15px] h-[10px] flex-shrink-0 fill-[#3A82F7] absolute left-[62px] top-[3px]" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.19158 6.23782C5.39859 7.03194 4.64009 7.79269 3.88085 8.55381C3.23096 9.2037 2.58107 9.85259 1.93117 10.5005C1.71859 10.7116 1.46213 10.7768 1.17305 10.6917C0.883976 10.6066 0.71188 10.4015 0.648141 10.1117C0.586651 9.82972 0.694258 9.59838 0.891475 9.39929C1.79282 8.49844 2.69342 7.59734 3.59327 6.69599C4.26041 6.02911 4.92805 5.36259 5.59618 4.69646C5.9625 4.33277 6.38655 4.33089 6.75136 4.69083C7.25828 5.19075 7.76182 5.69441 8.26198 6.20183C8.3186 6.25882 8.35422 6.33643 8.39434 6.39642L12.6071 2.17988C12.5471 2.17613 12.4894 2.16976 12.4313 2.16938C11.9439 2.16938 11.4564 2.17426 10.969 2.16638C10.647 2.16151 10.4044 2.00516 10.272 1.71233C10.1457 1.43263 10.1877 1.16118 10.3845 0.922716C10.4551 0.834337 10.5451 0.763357 10.6475 0.715251C10.7499 0.667146 10.8619 0.643201 10.975 0.645263C12.1418 0.642638 13.3116 0.640389 14.4799 0.646388C14.9212 0.648637 15.2478 0.983831 15.2493 1.42438C15.2531 2.58669 15.2531 3.74899 15.2493 4.91129C15.2493 5.35297 14.9032 5.69866 14.4841 5.69491C14.0649 5.69116 13.7417 5.36122 13.7342 4.91842C13.7271 4.44375 13.7323 3.9687 13.7323 3.49366V3.29682L13.6641 3.25257C13.6216 3.31939 13.5743 3.38293 13.5223 3.44267C12.0306 4.93717 10.5377 6.43054 9.04373 7.92279C8.65492 8.31085 8.23461 8.3116 7.8473 7.92616C7.33864 7.41975 6.83085 6.91171 6.32394 6.40204C6.28044 6.35818 6.24557 6.30419 6.19158 6.23782Z" fill="#3A82F7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Realtime Users Card */}
            <div className="w-[332px] h-[225px] relative">
              <div className="w-[332px] h-[225px] flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] shadow-[0_2px_6px_0_rgba(13,10,44,0.08)] absolute left-0 top-0"></div>

              <div className="w-[131px] h-[44px] flex-shrink-0 absolute left-[33px] top-[32px]">
                <div className="text-[#98CCFF] font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0 w-[62px] h-[16px]">
                  Statistics
                </div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-bold leading-[24px] absolute left-0 top-[20px] w-[131px] h-[24px]">
                  Realtime users
                </div>
              </div>

              <svg className="w-[143px] h-[101px] flex-shrink-0 stroke-[3px] stroke-[#3A82F7] absolute left-[154px] top-[81px]" width="147" height="105" viewBox="0 0 147 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.86475 103.041L19.1079 86.2183L26.4675 67.2931L37.4021 93.9987L44.7619 81.3819L52.5422 2.10645L72.5188 79.6998L87.0281 53.8354L114.785 103.041L123.407 90.6344L128.664 70.0269L144.855 53.8354" stroke="#3A82F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <div className="w-[87px] h-[72px] flex-shrink-0 absolute left-[33px] top-[99px]">
                <div className="text-[#BDDEFF] font-inter text-[44px] font-bold leading-[52px] absolute left-0 top-0 w-[87px] h-[52px]">
                  635
                </div>
                <div className="w-[74px] h-[16px] flex-shrink-0 absolute left-0 top-[56px]">
                  <div className="text-[#3A82F7] font-inter text-[14px] font-normal leading-[16px] absolute left-0 top-0 w-[55px] h-[16px]">
                    +21.01%
                  </div>
                  <svg className="w-[15px] h-[10px] flex-shrink-0 fill-[#3A82F7] absolute left-[59px] top-[3px]" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.92107 6.23782C5.12808 7.03194 4.36959 7.79269 3.61034 8.55381C2.96045 9.2037 2.31056 9.85259 1.66067 10.5005C1.44808 10.7116 1.19162 10.7768 0.902544 10.6917C0.613468 10.6066 0.441372 10.4015 0.377633 10.1117C0.316143 9.82972 0.42375 9.59838 0.620967 9.39929C1.52232 8.49844 2.42291 7.59734 3.32276 6.69599C3.9899 6.02911 4.65754 5.36259 5.32568 4.69646C5.69199 4.33277 6.11604 4.33089 6.48086 4.69083C6.98777 5.19075 7.49131 5.69441 7.99148 6.20183C8.04809 6.25882 8.08371 6.33643 8.12383 6.39642L12.3366 2.17988C12.2766 2.17613 12.2189 2.16976 12.1608 2.16938C11.6734 2.16938 11.1859 2.17426 10.6985 2.16638C10.3764 2.16151 10.1339 2.00516 10.0015 1.71233C9.87516 1.43263 9.91715 1.16118 10.114 0.922716C10.1846 0.834337 10.2746 0.763357 10.377 0.715251C10.4793 0.667146 10.5914 0.643201 10.7045 0.645263C11.8713 0.642638 13.0411 0.640389 14.2094 0.646388C14.6507 0.648637 14.9773 0.983831 14.9788 1.42438C14.9825 2.58669 14.9825 3.74899 14.9788 4.91129C14.9788 5.35297 14.6327 5.69866 14.2136 5.69491C13.7944 5.69116 13.4712 5.36122 13.4637 4.91842C13.4566 4.44375 13.4618 3.9687 13.4618 3.49366V3.29682L13.3936 3.25257C13.3511 3.31939 13.3038 3.38293 13.2518 3.44267C11.7601 4.93717 10.2672 6.43054 8.77322 7.92279C8.38441 8.31085 7.96411 8.3116 7.5768 7.92616C7.06813 7.41975 6.56034 6.91171 6.05343 6.40204C6.00993 6.35818 5.97507 6.30419 5.92107 6.23782Z" fill="#3A82F7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Qualification Chart - Updated to match Chart 3 style */}
          <div className="w-[510px] h-[358px] relative">
            <div className="w-[510px] h-[358px] flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] shadow-[0_2px_6px_0_rgba(13,10,44,0.08)] absolute left-0 top-0"></div>
            
            <div className="w-[230px] h-[52px] flex-shrink-0 absolute left-[33px] top-[32px]">
              <div className="text-[#98CCFF] font-inter text-[18px] font-normal leading-[20px] absolute left-0 top-0 w-[97px] h-[20px]">
                Community
              </div>
              <div className="text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-0 top-[24px] w-[230px] h-[28px]">
                Reviews qualification
              </div>
            </div>

            <div className="w-[443px] h-0 bg-[#CFCFCF] absolute left-[33px] top-[106px]"></div>

            {/* Horizontal bars with blue theme */}
            <div className="w-[443px] h-[42px] flex-shrink-0 absolute left-[33px] top-[165px]">
              <div className="w-[42px] h-[42px] rotate-[-90deg] flex-shrink-0 rounded-[13px] bg-[#3A82F7] absolute left-0 top-0"></div>
              <div className="w-[97px] h-[42px] rotate-[-90deg] flex-shrink-0 rounded-[13px] bg-[#5A9AFF] absolute left-[50px] top-0"></div>
              <div className="w-[288px] h-[42px] rotate-[-90deg] flex-shrink-0 rounded-[13px] bg-[#7AB5FF] absolute left-[155px] top-0"></div>
            </div>

            {/* Stats with blue emojis */}
            <div className="w-[334px] h-[60px] flex-shrink-0 absolute left-[33px] top-[248px]">
              {/* Negative */}
              <div className="absolute left-0 top-0">
                <div className="w-[25px] h-[25px] rounded-full bg-[#3A82F7] flex items-center justify-center absolute left-0 top-[35px]">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#1A6EE6] relative">
                    <div className="w-[3px] h-[3px] rounded-full bg-white absolute left-[2px] top-[2px]"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-white absolute left-[7px] top-[2px]"></div>
                    <div className="w-[6px] h-[2px] bg-white absolute left-[3px] top-[8px] rounded-[1px]"></div>
                  </div>
                </div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-normal absolute left-[32px] top-[35px]">16</div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-normal absolute left-0 top-0">Negative</div>
              </div>

              {/* Neutral */}
              <div className="absolute left-[137px] top-0">
                <div className="w-[25px] h-[25px] rounded-full bg-[#5A9AFF] flex items-center justify-center absolute left-0 top-[35px]">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#3A82F7] relative">
                    <div className="w-[3px] h-[3px] rounded-full bg-white absolute left-[2px] top-[2px]"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-white absolute left-[7px] top-[2px]"></div>
                    <div className="w-[4px] h-[1px] bg-white absolute left-[4px] top-[8px]"></div>
                  </div>
                </div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-normal absolute left-[32px] top-[35px]">45</div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-normal absolute left-0 top-0">Neutral</div>
              </div>

              {/* Positive */}
              <div className="absolute left-[256px] top-0">
                <div className="w-[25px] h-[25px] rounded-full bg-[#7AB5FF] flex items-center justify-center absolute left-0 top-[35px]">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#5A9AFF] relative">
                    <div className="w-[3px] h-[3px] rounded-full bg-white absolute left-[2px] top-[2px]"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-white absolute left-[7px] top-[2px]"></div>
                    <div className="w-[4px] h-[2px] bg-white absolute left-[4px] top-[7px] rounded-[1px] transform rotate-[20deg]"></div>
                  </div>
                </div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-normal absolute left-[32px] top-[35px]">2,113</div>
                <div className="text-[#BDDEFF] font-inter text-[18px] font-normal absolute left-0 top-0">Positive</div>
              </div>
            </div>
          </div>

          {/* Monthly Activity Chart - Updated to match Chart 3 style */}
          <div className="w-[510px] h-[841px] relative">
            <div className="w-[510px] h-[841px] flex-shrink-0 rounded-[20px] bg-[rgba(84,164,244,0.13)] shadow-[0_2px_6px_0_rgba(13,10,44,0.08)] absolute left-0 top-0"></div>
            
            <div className="w-[175px] h-[52px] flex-shrink-0 absolute left-[32px] top-[32px]">
              <div className="text-[#98CCFF] font-inter text-[18px] font-normal leading-[20px] absolute left-0 top-0 w-[79px] h-[20px]">
                Statistics
              </div>
              <div className="text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-0 top-[24px] w-[175px] h-[28px]">
                Monthly activity
              </div>
            </div>

            <div className="w-[446px] h-0 bg-[#CFCFCF] absolute left-[32px] top-[108px]"></div>

            {/* Pie chart with blue theme */}
            <div className="w-[367px] h-[379px] flex-shrink-0 absolute left-[71px] top-[144px]">
              <div className="w-[322px] h-[322px] flex-shrink-0 absolute left-0 top-0">
                <svg className="w-[322px] h-[322px] rounded-full" width="322" height="322" viewBox="0 0 322 322" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M322 161C322 249.678 249.678 322 161 322C72.3217 322 0 249.678 0 161C0 72.3217 72.3217 0 161 0C249.678 0 322 72.3217 322 161Z" fill="#9AC8FF"/>
                  <path d="M322 161C322 184.5 315.5 206.5 305 226L161 161V0C249.678 0 322 72.3217 322 161Z" fill="#7AB5FF"/>
                  <path d="M305 226C295 245.5 280.5 262 263 275L161 161L305 226Z" fill="#5A9AFF"/>
                  <path d="M263 275C245.5 287.5 225 296 203 301L161 161L263 275Z" fill="#3A82F7"/>
                  <path d="M203 301C182 306 159 307 137 304L161 161L203 301Z" fill="#1A6EE6"/>
                </svg>
                <div className="text-white font-inter text-[22px] font-bold leading-[28px] absolute left-[77px] top-[46px] w-[41px] h-[28px]">
                  11%
                </div>
                <div className="text-white font-inter text-[22px] font-bold leading-[28px] absolute left-[263px] top-[68px] w-[48px] h-[28px]">
                  24%
                </div>
                <div className="text-white font-inter text-[22px] font-bold leading-[28px] absolute left-[256px] top-[264px] w-[48px] h-[28px]">
                  26%
                </div>
                <div className="text-white font-inter text-[22px] font-bold leading-[28px] absolute left-[36px] top-[242px] w-[48px] h-[28px]">
                  39%
                </div>
              </div>
            </div>

            {/* Chart center info */}
            <div className="w-[124px] h-[74px] flex-shrink-0 absolute left-[198px] top-[308px]">
              <div className="text-[#BDDEFF] font-inter text-[44px] font-bold leading-[52px] absolute left-[17px] top-0 w-[91px] h-[52px]">
                1.05
              </div>
              <div className="text-[#98CCFF] text-center font-inter text-[18px] font-normal leading-[32px] absolute left-0 top-[42px] w-[124px] h-[32px]">
                Average range
              </div>
            </div>

            {/* Legend with blue theme */}
            <div className="w-[351px] h-[202px] flex-shrink-0 absolute left-[79px] top-[583px]">
              <div className="w-[351px] h-[28px] flex-shrink-0 absolute left-0 top-0">
                <div className="w-[14px] h-[14px] flex-shrink-0 rounded-full bg-[#1A6EE6] absolute left-0 top-[7px]"></div>
                <div className="text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-[30px] top-0 w-[106px] h-[28px]">
                  Approved
                </div>
                <div className="text-[#98CCFF] text-right font-inter text-[18px] font-normal leading-[20px] absolute left-[320px] top-[4px] w-[31px] h-[20px]">
                  410
                </div>
              </div>
              <div className="w-[351px] h-[28px] flex-shrink-0 absolute left-0 top-[58px]">
                <div className="w-[14px] h-[14px] flex-shrink-0 rounded-[14px] bg-[#3A82F7] absolute left-0 top-[7px]"></div>
                <div className="text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-[30px] top-0 w-[89px] h-[28px]">
                  Pending
                </div>
                <div className="text-[#98CCFF] text-right font-inter text-[18px] font-normal leading-[20px] absolute left-[320px] top-[2px] w-[31px] h-[20px]">
                  142
                </div>
              </div>
              <div className="w-[351px] h-[28px] flex-shrink-0 absolute left-0 top-[116px]">
                <div className="w-[14px] h-[14px] flex-shrink-0 rounded-full bg-[#5A9AFF] absolute left-0 top-[7px]"></div>
                <div className="text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-[30px] top-0 w-[143px] h-[28px]">
                  Under review
                </div>
                <div className="text-[#98CCFF] text-right font-inter text-[18px] font-normal leading-[20px] absolute left-[316px] top-[5px] w-[35px] h-[20px]">
                  340
                </div>
              </div>
              <div className="w-[351px] h-[28px] flex-shrink-0 absolute left-0 top-[174px]">
                <div className="w-[14px] h-[14px] flex-shrink-0 rounded-[14px] bg-[#7AB5FF] absolute left-0 top-[7px]"></div>
                <div className="text-[#BDDEFF] font-inter text-[22px] font-bold leading-[28px] absolute left-[30px] top-0 w-[96px] h-[28px]">
                  Rejected
                </div>
                <div className="text-[#98CCFF] text-right font-inter text-[18px] font-normal leading-[20px] absolute left-[317px] top-[5px] w-[34px] h-[20px]">
                  590
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-0 top-[959px] w-full h-[65px]">
        <div className="w-full h-[67px] flex-shrink-0 bg-[#090F20] absolute left-0 top-[-2px]"></div>
        <svg className="w-full h-0 flex-shrink-0 stroke-[#98CCFF] absolute left-0 top-[-2px]" width="1440" height="2" viewBox="0 0 1440 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H1440" stroke="#98CCFF"/>
        </svg>
        
        <div className="inline-flex h-[66px] justify-center items-center gap-4 flex-shrink-0 absolute left-[499px] top-[-2px] w-[464px]">
          <div className="text-[#70B8FF] font-inter text-[14px] font-normal">Goals & Intentions</div>
          <div className="text-[#70B8FF] font-inter text-[14px] font-normal">Integrations & Devices</div>
          <div className="text-[#70B8FF] font-inter text-[14px] font-normal">Supports</div>
          <div className="text-[#70B8FF] font-inter text-[14px] font-normal">Profile</div>
          <div className="text-[#70B8FF] font-inter text-[14px] font-normal">FAQ</div>
        </div>

        <img className="w-[65px] h-[65px] flex-shrink-0 absolute left-[28px] top-[-1px]" src="https://api.builder.io/api/v1/image/assets/TEMP/2f0b018a06bfb1fd79dc194bdc7ccf43154311f4?width=130" alt="" />
        
        <div className="w-[117px] h-[46px] flex-shrink-0 absolute left-[1209px] top-[4px]">
          <div className="text-[#98CCFF] font-montserrat text-[12px] font-medium absolute left-0 top-0">Follow us</div>
          
          <svg className="w-[24px] h-[24px] flex-shrink-0 absolute left-0 top-[21px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#70B8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <div className="flex w-[24px] h-[24px] justify-center items-center flex-shrink-0 bg-[#090F20] absolute left-[30px] top-[21px]">
            <svg className="w-[21px] h-[21px] flex-shrink-0" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="10.4348" fill="url(#paint0_linear)"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M5.28879 10.8899C8.33074 9.56455 10.3592 8.69081 11.3741 8.26866C14.272 7.06335 14.8741 6.85397 15.2666 6.84706C15.3529 6.84554 15.5459 6.86693 15.6709 6.96838C15.7765 7.05404 15.8056 7.16975 15.8195 7.25096C15.8334 7.33218 15.8507 7.51719 15.8369 7.66175C15.6799 9.31173 15.0004 13.3158 14.6547 15.1638C14.5084 15.9458 14.2204 16.208 13.9416 16.2336C13.3356 16.2894 12.8755 15.8332 12.2885 15.4484C11.3702 14.8464 10.8513 14.4717 9.95985 13.8842C8.92961 13.2053 9.59748 12.8321 10.1846 12.2223C10.3383 12.0627 13.0082 9.63425 13.0598 9.41395C13.0663 9.3864 13.0723 9.28369 13.0113 9.22946C12.9503 9.17523 12.8602 9.19378 12.7952 9.20853C12.7031 9.22943 11.236 10.1992 8.39379 12.1177C7.97735 12.4037 7.60014 12.543 7.26218 12.5357C6.8896 12.5277 6.17292 12.3251 5.64014 12.1519C4.98666 11.9394 4.46729 11.8271 4.51251 11.4664C4.53607 11.2785 4.79483 11.0863 5.28879 10.8899Z" fill="#090F20"/>
              <defs>
                <linearGradient id="paint0_linear" x1="11" y1="0.565217" x2="11" y2="21.28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#70B8FF"/>
                  <stop offset="1" stopColor="#70B8FF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <svg className="w-[23px] h-[23px] flex-shrink-0 absolute left-[60px] top-[21px]" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.61618 12.2361L0 0H6.82462L12.1433 7.56273L17.8255 0.0340512H21.5841L13.9606 10.1468L23 23H16.1957L10.4367 14.8214L4.28831 22.9773H0.5093L8.61618 12.2361ZM17.1875 20.7329L4.18463 2.26713H5.83209L18.8186 20.7329H17.1875Z" fill="#70B8FF"/>
          </svg>
          
          <svg className="w-[25px] h-[25px] flex-shrink-0 absolute left-[92px] top-[21px]" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.75 22.9166C17.8819 22.9166 17.1441 22.6128 16.5365 22.0052C15.9288 21.3975 15.625 20.6597 15.625 19.7916C15.625 19.6701 15.6337 19.5443 15.651 19.414C15.6684 19.2838 15.6944 19.1666 15.7292 19.0625L8.38542 14.7916C8.09028 15.0521 7.76042 15.2561 7.39583 15.4036C7.03125 15.5512 6.64931 15.625 6.25 15.625C5.38194 15.625 4.6441 15.3212 4.03646 14.7135C3.42882 14.1059 3.125 13.368 3.125 12.5C3.125 11.6319 3.42882 10.8941 4.03646 10.2864C4.6441 9.6788 5.38194 9.37498 6.25 9.37498C6.64931 9.37498 7.03125 9.44876 7.39583 9.59633C7.76042 9.7439 8.09028 9.9479 8.38542 10.2083L15.7292 5.93748C15.6944 5.83331 15.6684 5.71613 15.651 5.58592C15.6337 5.45571 15.625 5.32984 15.625 5.20831C15.625 4.34026 15.9288 3.60241 16.5365 2.99477C17.1441 2.38713 17.8819 2.08331 18.75 2.08331C19.6181 2.08331 20.3559 2.38713 20.9635 2.99477C21.5712 3.60241 21.875 4.34026 21.875 5.20831C21.875 6.07637 21.5712 6.81422 20.9635 7.42185C20.3559 8.02949 19.6181 8.33331 18.75 8.33331C18.3507 8.33331 17.9688 8.25953 17.6042 8.11196C17.2396 7.96439 16.9097 7.7604 16.6146 7.49998L9.27083 11.7708C9.30556 11.875 9.3316 11.9922 9.34896 12.1224C9.36632 12.2526 9.375 12.3785 9.375 12.5C9.375 12.6215 9.36632 12.7474 9.34896 12.8776C9.3316 13.0078 9.30556 13.125 9.27083 13.2291L16.6146 17.5C16.9097 17.2396 17.2396 17.0356 17.6042 16.888C17.9688 16.7404 18.3507 16.6666 18.75 16.6666C19.6181 16.6666 20.3559 16.9705 20.9635 17.5781C21.5712 18.1857 21.875 18.9236 21.875 19.7916C21.875 20.6597 21.5712 21.3975 20.9635 22.0052C20.3559 22.6128 19.6181 22.9166 18.75 22.9166ZM18.75 6.24998C19.0451 6.24998 19.2925 6.15015 19.4922 5.9505C19.6918 5.75085 19.7917 5.50345 19.7917 5.20831C19.7917 4.91317 19.6918 4.66578 19.4922 4.46613C19.2925 4.26647 19.0451 4.16665 18.75 4.16665C18.4549 4.16665 18.2075 4.26647 18.0078 4.46613C17.8082 4.66578 17.7083 4.91317 17.7083 5.20831C17.7083 5.50345 17.8082 5.75085 18.0078 5.9505C18.2075 6.15015 18.4549 6.24998 18.75 6.24998ZM6.25 13.5416C6.54514 13.5416 6.79253 13.4418 6.99219 13.2422C7.19184 13.0425 7.29167 12.7951 7.29167 12.5C7.29167 12.2048 7.19184 11.9574 6.99219 11.7578C6.79253 11.5581 6.54514 11.4583 6.25 11.4583C5.95486 11.4583 5.70747 11.5581 5.50781 11.7578C5.30816 11.9574 5.20833 12.2048 5.20833 12.5C5.20833 12.7951 5.30816 13.0425 5.50781 13.2422C5.70747 13.4418 5.95486 13.5416 6.25 13.5416ZM18.75 20.8333C19.0451 20.8333 19.2925 20.7335 19.4922 20.5338C19.6918 20.3342 19.7917 20.0868 19.7917 19.7916C19.7917 19.4965 19.6918 19.2491 19.4922 19.0495C19.2925 18.8498 19.0451 18.75 18.75 18.75C18.4549 18.75 18.2075 18.8498 18.0078 19.0495C17.8082 19.2491 17.7083 19.4965 17.7083 19.7916C17.7083 20.0868 17.8082 20.3342 18.0078 20.5338C18.2075 20.7335 18.4549 20.8333 18.75 20.8333Z" fill="#70B8FF"/>
          </svg>
        </div>

        <svg className="w-[122px] h-[31px] flex-shrink-0 absolute left-[1019px] top-[13px]" width="153" height="39" viewBox="0 0 153 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M147.333 39H5.66667C2.55142 39 0 36.805 0 34.125V4.875C0 2.19497 2.55142 0 5.66667 0H147.333C150.449 0 153 2.19497 153 4.875V34.125C153 36.805 150.449 39 147.333 39Z" fill="#1A2A4F"/>
          <path d="M10.9763 7.35033C10.6433 7.65014 10.4507 8.11693 10.4507 8.72143V30.2836C10.4507 30.8881 10.6433 31.3548 10.9763 31.6546L11.0584 31.7205L25.1033 19.6426V19.3575L11.0584 7.27965L10.9763 7.35033Z" fill="#70B8FF"/>
          <path d="M31.4796 23.6706L26.8032 19.6426V19.3574L31.4853 15.3295L31.5901 15.3819L37.135 18.096C38.7174 18.8663 38.7174 20.1338 37.135 20.9089L31.5901 23.6182L31.4796 23.6706Z" fill="#70B8FF"/>
          <path d="M30.7401 24.3682L25.9532 20.25L11.8262 32.4046C12.3518 32.8799 13.2088 32.9372 14.1835 32.4619L30.7401 24.3682Z" fill="#70B8FF"/>
          <path d="M30.7401 14.6318L14.1835 6.53813C13.2088 6.06769 12.3518 6.12497 11.8262 6.60028L25.9532 18.75L30.7401 14.6318Z" fill="#70B8FF"/>
          <path d="M53.7399 9.9877C53.7399 10.8018 53.4565 11.4539 52.8984 11.9401C52.2566 12.5166 51.4208 12.8067 50.3965 12.8067C49.4176 12.8067 48.5818 12.5117 47.8961 11.9304C47.209 11.3405 46.8662 10.6166 46.8662 9.75005C46.8662 8.88351 47.209 8.15958 47.8961 7.57458C48.5818 6.98836 49.4176 6.69342 50.3965 6.69342C50.8839 6.69342 51.3485 6.77995 51.792 6.94083C52.234 7.10292 52.5938 7.3223 52.8545 7.59286L52.2623 8.10717C51.8075 7.64527 51.1885 7.41736 50.3965 7.41736C49.6825 7.41736 49.0635 7.63186 48.5379 8.06451C48.018 8.49839 47.7573 9.06023 47.7573 9.75005C47.7573 10.4399 48.018 11.0066 48.5379 11.4405C49.0635 11.8682 49.6825 12.0876 50.3965 12.0876C51.1545 12.0876 51.792 11.8682 52.2949 11.4356C52.6264 11.1492 52.8148 10.7543 52.8644 10.2497H50.3965V9.5453H53.6889C53.7285 9.69764 53.7399 9.84511 53.7399 9.9877Z" fill="#70B8FF"/>
          <path d="M58.9632 7.5453H55.8706V9.3978H58.6586V10.1022H55.8706V11.9547H58.9632V12.6726H54.9951V6.82745H58.9632V7.5453Z" fill="#70B8FF"/>
          <path d="M62.6494 12.6726H61.7739V7.5453H59.877V6.82745H64.5477V7.5453H62.6494V12.6726Z" fill="#70B8FF"/>
          <path d="M67.9277 12.6726V6.82745H68.8018V12.6726H67.9277Z" fill="#70B8FF"/>
          <path d="M72.6762 12.6726H71.8078V7.5453H69.9038V6.82745H74.5802V7.5453H72.6762V12.6726Z" fill="#70B8FF"/>
          <path d="M83.4233 11.9206C82.7532 12.5117 81.9231 12.8067 80.9328 12.8067C79.9369 12.8067 79.1067 12.5117 78.4366 11.9206C77.768 11.3308 77.4351 10.6068 77.4351 9.75005C77.4351 8.89326 77.768 8.16933 78.4366 7.57945C79.1067 6.98836 79.9369 6.69342 80.9328 6.69342C81.9174 6.69342 82.7476 6.98836 83.4176 7.58433C84.092 8.17908 84.4249 8.89814 84.4249 9.75005C84.4249 10.6068 84.092 11.3308 83.4233 11.9206ZM79.0841 11.4307C79.5884 11.8682 80.2018 12.0876 80.9328 12.0876C81.6581 12.0876 82.2772 11.8682 82.7759 11.4307C83.2788 10.9932 83.5338 10.4313 83.5338 9.75005C83.5338 9.06876 83.2788 8.50692 82.7759 8.06939C82.2772 7.63186 81.6581 7.41248 80.9328 7.41248C80.2018 7.41248 79.5884 7.63186 79.0841 8.06939C78.5811 8.50692 78.3261 9.06876 78.3261 9.75005C78.3261 10.4313 78.5811 10.9932 79.0841 11.4307Z" fill="#70B8FF"/>
          <path d="M85.6533 12.6726V6.82745H86.7158L90.0195 11.3734H90.0577L90.0195 10.2497V6.82745H90.8936V12.6726H89.9812L86.5217 7.90239H86.4835L86.5217 9.03095V12.6726H85.6533Z" fill="#70B8FF"/>
        </svg>
      </div>
    </div>
  );
}
