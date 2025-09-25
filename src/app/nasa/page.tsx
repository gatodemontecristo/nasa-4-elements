import ParticleNetworkComponent from "@/components/atoms/ParticleNetworkComponent";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "NASA Urban Observatory",
  description:
    "Advanced Urban Planning & Space Technology Integration Platform",
};

export default function MainPage() {
  return (
    <div className="relative w-full h-screen overflow-scroll bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Particle Network Background */}
      <div className="absolute inset-0">
        <ParticleNetworkComponent
          particleColor="#3b82f6"
          background="transparent"
          interactive={true}
          speed="slow"
          density="medium"
          className="w-full h-full"
        />
      </div>

      {/* Grid Overlay for Architectural Feel */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-40 flex justify-between items-center p-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-sm flex items-center justify-center">
            <span className="font-space-grotesk font-bold text-white text-lg">
              N
            </span>
          </div>
          <span className="font-jetbrains text-white text-sm tracking-widest">
            NASA.URBAN.OBSERVATORY
          </span>
        </div>
        <div className="hidden md:flex space-x-8 font-inter text-sm">
          <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
            PROJECTS
          </span>
          <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
            DATA
          </span>
          <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
            RESEARCH
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-30 flex items-center justify-center h-full px-8 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="font-jetbrains text-blue-400 text-xs tracking-[0.3em] uppercase">
                Urban Planning × Space Technology
              </span>
            </div>

            <h1 className="font-playfair text-6xl lg:text-8xl font-light text-white leading-tight mb-6">
              NASA
              <br />
              <span className="font-space-grotesk font-black tracking-tight">
                4 ELEMENTS
              </span>
            </h1>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="font-inter text-xl text-gray-300 leading-relaxed mb-6">
                Advanced geospatial intelligence platform integrating Earth
                observation data with urban planning methodologies for
                sustainable city development.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-blue-400">
                    EARTH
                  </div>
                  <div className="font-inter text-xs text-gray-500 uppercase tracking-wide">
                    Ground Analysis
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-green-400">
                    WATER
                  </div>
                  <div className="font-inter text-xs text-gray-500 uppercase tracking-wide">
                    Hydrological Systems
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-orange-400">
                    FIRE
                  </div>
                  <div className="font-inter text-xs text-gray-500 uppercase tracking-wide">
                    Risk Assessment
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-jetbrains text-2xl font-bold text-cyan-400">
                    WIND
                  </div>
                  <div className="font-inter text-xs text-gray-500 uppercase tracking-wide">
                    Atmospheric Data
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/nasa/map"
              className="group inline-flex items-center justify-center px-12 py-4 bg-transparent border-2 border-blue-500 text-blue-400 font-space-grotesk font-semibold tracking-wide hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <span className="mr-3">ACCESS PLATFORM</span>
              <div className="w-6 h-6 border border-current flex items-center justify-center group-hover:border-white">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Methodology Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-none p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-space-grotesk font-semibold text-white text-lg">
                  METHODOLOGY
                </h3>
                <div className="w-8 h-8 border border-blue-400 rounded-none flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </div>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-4">
                Satellite imagery analysis combined with machine learning
                algorithms to identify urban development patterns and
                environmental impacts.
              </p>
              <div className="font-jetbrains text-xs text-blue-400 tracking-wide">
                ML.GEOSPATIAL.ANALYSIS
              </div>
            </div>

            {/* Technology Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-none p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-space-grotesk font-semibold text-white text-lg">
                  TECHNOLOGY
                </h3>
                <div className="w-8 h-8 border border-green-400 rounded-none flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-4">
                Real-time data processing from multiple NASA Earth observation
                satellites integrated with urban planning frameworks.
              </p>
              <div className="font-jetbrains text-xs text-green-400 tracking-wide">
                SATELLITE.DATA.INTEGRATION
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-none p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-space-grotesk font-semibold text-white text-lg">
                  IMPACT
                </h3>
                <div className="w-8 h-8 border border-orange-400 rounded-none flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
              </div>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-4">
                Sustainable urban development strategies based on
                evidence-driven environmental analysis and predictive modeling
                systems.
              </p>
              <div className="font-jetbrains text-xs text-orange-400 tracking-wide">
                SUSTAINABLE.URBAN.DEVELOPMENT
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="mt-6 flex justify-center items-center space-x-8 text-xs font-jetbrains text-gray-600">
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
      <div className="absolute bottom-8 left-8 right-8 z-30">
        <div className="flex justify-between items-end text-xs font-jetbrains text-gray-600">
          <div>
            <div>© 2025 NASA URBAN OBSERVATORY</div>
            <div className="text-gray-700">HUAYCÁN DEVELOPMENT PROJECT</div>
          </div>
          <div className="text-right">
            <div>REAL-TIME DATA PROCESSING</div>
            <div className="text-gray-700">
              LAST UPDATE: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
