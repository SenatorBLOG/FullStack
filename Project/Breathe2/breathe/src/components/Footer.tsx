import React from "react";
// import { GooglePlay } from "./GooglePlay";
// import { InstagramLink } from "./InstagramLink";
// import { ShareLink } from "./ShareLink";
// import logoImgMeditation11 from "./logo-img-meditation-1-1.png";
// import path from "./path.svg";
// import vector1 from "./vector-1.svg";

export const Footer = () => {
  return (
    <div className="relative w-[1440px] h-[65px]">
      <div className="absolute -top-0.5 left-0 w-[1440px] h-[67px] bg-[#090f20]" />

      <img
        className="absolute -top-0.5 left-0 w-[1440px] h-px object-cover"
        alt="Vector"
        // src={vector1}
      />

      <div className="inline-flex h-[66px] items-center justify-center gap-4 absolute -top-0.5 left-[499px]">
        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#70b8ff] text-sm tracking-[0] leading-[normal]">
          Goals &amp; Intentions
        </div>

        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#70b8ff] text-sm tracking-[0] leading-[normal]">
          Integrations &amp; Devices
        </div>

        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#70b8ff] text-sm tracking-[0] leading-[normal]">
          Supports
        </div>

        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#70b8ff] text-sm tracking-[0] leading-[normal]">
          Profile
        </div>

        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#70b8ff] text-sm tracking-[0] leading-[normal]">
          FAQ
        </div>
      </div>

      <img
        className="absolute -top-px left-7 w-[65px] h-[65px] aspect-[1] object-cover"
        alt="Logo img meditation"
        // src={logoImgMeditation11}
      />

      <div className="absolute top-1 left-[1209px] w-[117px] h-[46px]">
        {/* <InstagramLink
          className="!absolute !top-[21px] !left-0 !w-6 !h-6"
          color="#70B8FF"
        />
        <ShareLink
          className="!absolute !top-[21px] !left-[92px] !w-[25px] !h-[25px]"
          color="#70B8FF"
        /> */}
        <div className="absolute top-[21px] left-[calc(50.00%_-_28px)] w-6 h-6 bg-[#090f20]">
          <div className="relative w-[86.96%] h-[86.96%] top-[6.52%] left-[6.52%] flex">
            <div className="flex-1 w-[20.87px] relative bg-[url(/oval.svg)] bg-[100%_100%]">
              <img
                className="absolute w-[54.30%] h-[45.00%] top-[30.10%] left-[18.90%]"
                alt="Path"
                // src={path}
              />
            </div>
          </div>
        </div>

        <div className="absolute w-[19.66%] h-[50.00%] top-[45.65%] left-[51.28%] bg-[url(/union.svg)] bg-[100%_100%]" />

        <div className="absolute top-0 left-0 w-[86px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#98cbff] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
          Follow us
        </div>
      </div>

      {/* <GooglePlay
        className="!h-[48.00%] !absolute !left-[71.83%] !w-[8.50%] !top-[26.00%]"
        group="image.png"
        groupClassName="!h-[100.00%] !w-[100.00%]"
        type="black-white"
      /> */}
    </div>
  );
};
