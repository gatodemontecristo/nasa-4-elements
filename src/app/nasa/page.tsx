import ParticleNetworkComponent from '@/components/atoms/ParticleNetworkComponent';
import Link from 'next/link';
import React from 'react';
import { HeaderSection, MainBanner, VideoIcon } from '../../components';
import { MdReportProblem } from 'react-icons/md';
import { RiBuilding2Fill } from 'react-icons/ri';
import { FaShuttleSpace } from 'react-icons/fa6';

export const metadata = {
  title: 'NASA Urban Observatory',
  description: 'Advanced Urban Planning & Space Technology Integration Platform',
};

export default function MainPage() {
  return (
    <div className="relative h-screen w-full overflow-scroll bg-black">
      {/* Particle Network Background */}
      <div className="absolute inset-0">
        <ParticleNetworkComponent
          particleColor="#3b82f6"
          background="#000000"
          interactive={true}
          speed="slow"
          density="medium"
          className="h-full w-full"
        />
      </div>

      {/* Grid Overlay for Architectural Feel */}
      {/* <div className="absolute inset-0 opacity-5">
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
      </div> */}

      <HeaderSection />

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

            <h1 className="font-nasalization mb-6 text-6xl font-light text-white lg:text-8xl">
              NASA
              <br />
              <span className="font-orbitron font-extralight tracking-tight">4 ELEMENTS</span>
            </h1>

            <MainBanner></MainBanner>
            <Link
              href="/nasa/map"
              className="group font-space-grotesk inline-flex items-center justify-center border-2 border-blue-500 bg-transparent px-12 py-4 font-semibold tracking-wide text-blue-400 transition-all duration-300 hover:bg-blue-500 hover:text-white"
            >
              <span className="font-orbitron mr-3">ACCESS THE DEMO</span>
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

      <div className="text-nasa-white font-jetbrains flex h-screen flex-row items-center justify-center bg-black p-4">
        <div className="flex w-1/5 flex-col gap-4">
          <p>Lore</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa omnis soluta, aliquid
            voluptatem eaque id amet assumenda officiis minima ipsum! Id fuga quibusdam temporibus
            quis tempora, adipisci fugiat eligendi culpa.
          </p>
        </div>
        <div className="flex w-1/5 flex-col gap-4">
          <p>Lore</p>
          <MdReportProblem />
          <p>Problema</p>
          <RiBuilding2Fill />
          <p>Problema</p>
          <FaShuttleSpace />
          <p>Problema</p>
        </div>

        <VideoIcon srcVideo="/video.mp4" element="water" className="w-2/5"></VideoIcon>

        {/* <svg width="0" height="0">
          <defs>
            <pattern id="water-pattern" patternUnits="userSpaceOnUse" width="100%" height="100%">
              <image
                href="/water.jpg"
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
        </svg> */}
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
