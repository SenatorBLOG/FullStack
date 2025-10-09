import React from 'react';
import WeeklyActivityChart from '../components/charts/WeeklyActivityChart';
import AnnualProgressChart from '../components/charts/AnnualProgressChart';
import MetricCards from '../components/charts/MetricCards';
import MetricCards2 from '../components/charts/MetricCards2';
import MoodQualificationChart from '../components/charts/MoodQualificationChart';
import MonthlyActivityChart from '../components/charts/MonthlyActivityChart';
import NavBar from '../components/NavBar';
import { Footer } from '../components/footer';

export default function StatsPage() {
  return (
    <div className=" w-full min-h-screen ">
      <NavBar />
      {/* Main Content Container matching Figma design */}
      <div
        className="inline-flex px-[37px] pt-0 pb-[42px] flex-col items-center absolute left-[181px] top-[125px]"
        style={{ width: '1100px', height: '2820px' }}
      >
        <div
          className="flex w-[1009px] px-0 py-[15px] flex-col items-start gap-[75px] absolute left-[54px] top-0"
          style={{ height: '2778px' }}
        >

          {/* How it works section */}
          <div className="flex flex-col justify-center items-start relative">
            <div
              className="text-center font-montserrat text-[36px] font-normal leading-normal relative mb-6"
              style={{ color: '#70B8FF' }}
            >
              How it works?
            </div>
            <div
              className="font-montserrat text-[20px] font-normal leading-normal relative max-w-[900px]"
              style={{ color: '#88AACC' }}
            >
              Breathe guides you through calming breathing exercises with a visual cue — a softly expanding and contracting circle. Just follow its rhythm: inhale as it grows, exhale as it shrinks. In a few minutes, you'll feel more relaxed, focused, and balanced.
            </div>
          </div>

          {/* Weekly Activity Chart (Chart 3 - Main blue chart) */}
          <WeeklyActivityChart />

          {/* Annual Progress Chart (Chart 9 - Stacked bars with line) */}
          <AnnualProgressChart />

          {/* Three Metric Cards Row (Charts 6, 5, 4) */}
          {/* <MetricCards /> */}
          <MetricCards2/>
          


          {/* Bottom Row with two charts */}
          <div className="flex items-start gap-[6px] w-full">
            {/* Mood Qualification Chart (Chart 6 - Horizontal bars) */}
            <MoodQualificationChart />

            {/* Monthly Activity Pie Chart (Chart 10 - Donut chart) */}
            <MonthlyActivityChart />
          </div>

        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
