import ParticleNetworkComponent from '@/components/atoms/ParticleNetworkComponent';
import React from 'react';
import { HeaderSection, LineSeparator, MainBanner, MainLink, VideoIcon } from '../../components';
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

      <HeaderSection />

      {/* Main Content */}
      <div className="relative z-30 mt-20 mb-10 flex h-full items-center justify-center px-8">
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
            <MainLink href="/nasa/map" text="ACCESS THE DEMO" />
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
        </div>
      </div>

      <div className="text-nasa-white font-jetbrains relative flex h-screen flex-row items-center justify-center bg-black px-5">
        {/* Línea horizontal */}
        <div className="absolute top-15 right-0 left-0 text-center">
          <div className="font-jetbrains mt-6 flex items-center justify-center space-x-8 text-xs text-gray-600">
            <span>LAT: -12.0201464</span>
            <span>•</span>
            <span>LNG: -76.8175454</span>
            <span>•</span>
            <span>ALT: 2240M</span>
          </div>
        </div>

        <div className="font-jetbrains absolute right-0 bottom-20 left-0 flex flex-row justify-around text-center text-xs text-gray-600">
          <span>{`40' - 9' X 4' - 6'`}</span>
          <span>{`1729 • 2300 • 21312`}</span>
          <span>{`7' - 8' X 18' - 10'`}</span>
        </div>

        <div className="font-nasalization absolute top-15 right-0 left-0 text-[200px] text-gray-100 opacity-20">
          <p>WATER</p>
        </div>
        <div className="absolute top-1/6 right-0 left-0 h-px bg-gray-800"></div>
        <div className="absolute right-0 bottom-1/6 left-0 h-px bg-gray-800"></div>

        <LineSeparator direction={'vertical'}></LineSeparator>
        <div className="flex w-1/5 flex-col gap-4">
          <p className="font-orbitron text-2xl">Summary</p>
          <p>
            Using NASA water data, we target scarce sources and seasonal risks, creating smart
            systems for safe and resilient supply in vulnerable settlements.
          </p>
        </div>
        <LineSeparator direction={'vertical'}></LineSeparator>

        <div className="flex w-1/5 flex-col items-center justify-center gap-4">
          <p className="font-orbitron text-2xl">Element features</p>
          <MdReportProblem className="h-8 w-8 text-orange-400" />
          <p>Scarce clean sources</p>
          <RiBuilding2Fill className="h-8 w-8 text-green-500" />
          <p>Ensure safe supply</p>
          <FaShuttleSpace className="h-8 w-8 text-blue-500" />
          <p>Smart water systems</p>
        </div>
        <LineSeparator direction={'vertical'}></LineSeparator>

        <VideoIcon srcVideo="/videos/water.mp4" element="water" className="w-2/5"></VideoIcon>
        <div className="mx-4 h-full w-px bg-gray-800"></div>
      </div>
      <div className="text-nasa-white font-jetbrains relative flex h-screen flex-row items-center justify-center bg-black p-0">
        {/* Línea horizontal */}

        <div className="font-nasalization absolute top-15 right-0 left-0 text-[200px] text-gray-100 opacity-30">
          <p>WIND</p>
        </div>
        <div className="absolute top-1/6 right-0 left-0 h-px bg-gray-800"></div>
        <div className="absolute right-0 bottom-1/6 left-0 h-px bg-gray-800"></div>

        <div className="mx-4 h-full w-px bg-gray-800"></div>
        <div className="flex w-1/5 flex-col gap-4">
          <p>Lore</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa omnis soluta, aliquid
            voluptatem eaque id amet assumenda officiis minima ipsum! Id fuga quibusdam temporibus
            quis tempora, adipisci fugiat eligendi culpa.
          </p>
        </div>
        <div className="mx-4 h-full w-px bg-gray-800"></div>
        <div className="flex w-1/5 flex-col items-center justify-center gap-4">
          <p>Lore</p>
          <MdReportProblem />
          <p>Problema</p>
          <RiBuilding2Fill />
          <p>Problema</p>
          <FaShuttleSpace />
          <p>Problema</p>
        </div>

        {/* Línea vertical */}
        <div className="mx-4 h-full w-px bg-gray-800"></div>

        <VideoIcon srcVideo="/videos/wind.mp4" element="wind" className="w-2/5"></VideoIcon>
        <div className="mx-4 h-full w-px bg-gray-800"></div>
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
