import React from 'react';
import NavBar from '../components/NavBar';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#001F3F]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/175745df7b1fa2da4d7f35faf06da9c88596d815?width=2880')",
          filter: 'brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 w-full h-full bg-[rgba(10,15,31,0.77)]" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center text-center py-12 px-4 sm:py-16 md:py-20 lg:py-24">
          <h1 className="text-xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal leading-tight text-[#70B8FF] font-montserrat mb-4 tracking-wide">
            Breathe Better
          </h1>
          <p className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-[#88AACC] font-montserrat max-w-3xl">
            Meditation for Sleep & Relaxation
          </p>
        </header>

        {/* Navigation Bar */}
        <NavBar className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* How It Works Section */}
        <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#70B8FF] font-montserrat mb-8 text-center">
              How it works?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-[#88AACC] font-montserrat mb-12 text-center max-w-3xl mx-auto">
              Breathe guides you through calming breathing exercises with a visual cue — a softly expanding and contracting circle. Just follow its rhythm: inhale as it grows, exhale as it shrinks. In a few minutes, you'll feel more relaxed, focused, and balanced.
            </p>

            {/* Steps Container - Use Grid for Responsivity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-[rgba(10,15,31,0.5)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-contain"
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2d49e06b7862677ddb2ffa75a99468b68357436e?width=417"
                  alt="Step 1 illustration"
                />
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-[#70B8FF] font-montserrat mb-2">
                    Step 1 — Feel the breath
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#88AACC] font-montserrat">
                    Press "Start" and follow the pulsating ball. Inhale and the balloon swells, exhale and deflates. A simple practice that instantly calms down.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-6 bg-[rgba(10,15,31,0.5)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-contain"
                  src="https://api.builder.io/api/v1/image/assets/TEMP/fb639542c27074a95f38ce51ccc8936a067f44eb?width=447"
                  alt="Step 2 illustration"
                />
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-[#70B8FF] font-montserrat mb-2">
                    Step 2 — A Short Daily Habit
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#88AACC] font-montserrat">
                    3-5 minutes a day is enough to notice the effect. Short meditations for the morning, a break at work and before going to bed will help integrate breathing into everyday life.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-[rgba(10,15,31,0.5)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-contain"
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3c59d7f1a5a7ccf168ab9278098042b64c9e1932?width=417"
                  alt="Step 3 illustration"
                />
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-[#70B8FF] font-montserrat mb-2">
                    Step 3 — Monitor the progress
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#88AACC] font-montserrat">
                    The app has a session tracker, reminders, and achievements. You see how your health is changing, and you remain motivated to continue.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-6 bg-[rgba(10,15,31,0.5)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-contain"
                  src="https://api.builder.io/api/v1/image/assets/TEMP/97d62cb83e1c132dc5fc8107e9525aedb760ca6e?width=447"
                  alt="Step 4 illustration"
                />
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-[#70B8FF] font-montserrat mb-2">
                    Step 4 — Use your Breath in Life
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#88AACC] font-montserrat">
                    Before a meeting, in a dream, or when you feel tense, a few deep cycles will help you quickly regain calm.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-[rgba(10,15,31,0.5)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2">
                <img 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-contain"
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3c59d7f1a5a7ccf168ab9278098042b64c9e1932?width=417"
                  alt="Step 5 illustration"
                />
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-[#70B8FF] font-montserrat mb-2">
                    Step 5 — Improve your mood and sleep
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#88AACC] font-montserrat">
                    Regular breathing practices reduce stress, improve concentration, and help normalize sleep patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-4 bg-[rgba(10,15,31,0.9)] mt-auto">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/70adf0aa2be2ed78dbc91b7d2350387bee86b5a2?width=2880" 
            alt="Footer"
            className="w-full h-16 object-cover"
          />
        </footer>
      </div>
    </div>
  );
}