import ParticleNetworkComponent from '@/components/atoms/ParticleNetworkComponent';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'NASA Urban Observatory',
  description: 'Advanced Urban Planning & Space Technology Integration Platform',
};

export default function MainPage() {
  return (
    <div className="relative h-screen w-full overflow-scroll bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Particle Network Background */}
      <div className="absolute inset-0">
        <ParticleNetworkComponent
          particleColor="#3b82f6"
          background="transparent"
          interactive={true}
          speed="slow"
          density="medium"
          className="h-full w-full"
        />
      </div>

      {/* Grid Overlay for Architectural Feel */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-40 flex items-center justify-between p-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-500">
            <span className="font-space-grotesk text-lg font-bold text-white">N</span>
          </div>
          <span className="font-jetbrains text-sm tracking-widest text-white">
            NASA.URBAN.OBSERVATORY
          </span>
        </div>
        <div className="font-inter hidden space-x-8 text-sm md:flex">
          <span className="cursor-pointer text-gray-400 transition-colors hover:text-white">
            PROJECTS
          </span>
          <span className="cursor-pointer text-gray-400 transition-colors hover:text-white">
            DATA
          </span>
          <span className="cursor-pointer text-gray-400 transition-colors hover:text-white">
            RESEARCH
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-30 mt-20 flex h-full items-center justify-center px-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <div className="mb-6">
              <span className="font-jetbrains text-xs tracking-[0.3em] text-blue-400 uppercase">
                Urban Planning × Space Technology
              </span>
            </div>

            <h1 className="font-playfair mb-6 text-6xl leading-tight font-light text-white lg:text-8xl">
              NASA
              <br />
              <span className="font-space-grotesk font-black tracking-tight">4 ELEMENTS</span>
            </h1>

            <div className="mx-auto mb-12 max-w-3xl">
              <p className="font-inter mb-6 text-xl leading-relaxed text-gray-300">
                Advanced geospatial intelligence platform integrating Earth observation data with
                urban planning methodologies for sustainable city development.
              </p>
              <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-blue-400">EARTH</div>
                  <div className="font-inter text-xs tracking-wide text-gray-500 uppercase">
                    Ground Analysis
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-green-400">WATER</div>
                  <div className="font-inter text-xs tracking-wide text-gray-500 uppercase">
                    Hydrological Systems
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-orange-400">FIRE</div>
                  <div className="font-inter text-xs tracking-wide text-gray-500 uppercase">
                    Risk Assessment
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-cyan-400">WIND</div>
                  <div className="font-inter text-xs tracking-wide text-gray-500 uppercase">
                    Atmospheric Data
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/nasa/map"
              className="group font-space-grotesk inline-flex items-center justify-center border-2 border-blue-500 bg-transparent px-12 py-4 font-semibold tracking-wide text-blue-400 transition-all duration-300 hover:bg-blue-500 hover:text-white"
            >
              <span className="mr-3">ACCESS PLATFORM</span>
              <div className="flex h-6 w-6 items-center justify-center border border-current group-hover:border-white">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Technical Information Cards */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Methodology Card */}
            <div className="rounded-none border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
              <div className="mb-6 flex items-start justify-between">
                <h3 className="font-space-grotesk text-lg font-semibold text-white">METHODOLOGY</h3>
                <div className="flex h-8 w-8 items-center justify-center rounded-none border border-blue-400">
                  <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                </div>
              </div>
              <p className="font-inter mb-4 text-sm leading-relaxed text-gray-400">
                Satellite imagery analysis combined with machine learning algorithms to identify
                urban development patterns and environmental impacts.
              </p>
              <div className="font-jetbrains text-xs tracking-wide text-blue-400">
                ML.GEOSPATIAL.ANALYSIS
              </div>
            </div>

            {/* Technology Card */}
            <div className="rounded-none border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
              <div className="mb-6 flex items-start justify-between">
                <h3 className="font-space-grotesk text-lg font-semibold text-white">TECHNOLOGY</h3>
                <div className="flex h-8 w-8 items-center justify-center rounded-none border border-green-400">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
              </div>
              <p className="font-inter mb-4 text-sm leading-relaxed text-gray-400">
                Real-time data processing from multiple NASA Earth observation satellites integrated
                with urban planning frameworks.
              </p>
              <div className="font-jetbrains text-xs tracking-wide text-green-400">
                SATELLITE.DATA.INTEGRATION
              </div>
            </div>

            {/* Impact Card */}
            <div className="rounded-none border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
              <div className="mb-6 flex items-start justify-between">
                <h3 className="font-space-grotesk text-lg font-semibold text-white">IMPACT</h3>
                <div className="flex h-8 w-8 items-center justify-center rounded-none border border-orange-400">
                  <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                </div>
              </div>
              <p className="font-inter mb-4 text-sm leading-relaxed text-gray-400">
                Sustainable urban development strategies based on evidence-driven environmental
                analysis and predictive modeling systems.
              </p>
              <div className="font-jetbrains text-xs tracking-wide text-orange-400">
                SUSTAINABLE.URBAN.DEVELOPMENT
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="font-jetbrains mt-6 flex items-center justify-center space-x-8 text-xs text-gray-600">
              <span>LAT: -12.0201464</span>
              <span>•</span>
              <span>LNG: -76.8175454</span>
              <span>•</span>
              <span>ALT: 2240M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute right-8 bottom-8 left-8 z-30">
        <div className="font-jetbrains flex items-end justify-between text-xs text-gray-600">
          <div>
            <div>© 2025 NASA URBAN OBSERVATORY</div>
            <div className="text-gray-700">HUAYCÁN DEVELOPMENT PROJECT</div>
          </div>
          <div className="text-right">
            <div>REAL-TIME DATA PROCESSING</div>
            <div className="text-gray-700">LAST UPDATE: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
