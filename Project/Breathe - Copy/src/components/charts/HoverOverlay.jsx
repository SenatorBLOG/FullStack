import React, { useState, useEffect } from 'react';

const HoverOverlay = ({ title, value, infoText, children }) => {
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    let timer;
    if (hovered) {
      timer = setTimeout(() => setShowInfo(true), 2000); // 2 сек
    } else {
      clearTimeout(timer);
      setShowInfo(false);
    }
    return () => clearTimeout(timer);
  }, [hovered]);

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Основное содержимое (график + цифры) */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${showInfo ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>

      {/* Overlay с инфо, показываем title + value + текст */}
      {showInfo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e1629] border border-[#24345d] rounded-2xl p-4 text-center text-[#a5bafc] text-sm shadow-[0_0_15px_#1f9eff33] animate-fadeIn z-10">
          <h3 className="text-[22px] text-[#70B8FF] font-semibold mb-2">{title}</h3>
          <p className="text-[24px] font-bold text-[#bad8fd] tracking-wide">{value}</p>
          <p className="mt-2 text-[#bad8fd]">{infoText}</p>
        </div>
      )}
    </div>
  );
};

export default HoverOverlay;
