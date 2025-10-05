'use client';

import React from 'react';
import { IoWaterSharp } from 'react-icons/io5';

export default function NasaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-nasa-black min-h-screen">
      {children}
      <div className="flex h-screen flex-row items-center justify-center p-4">
        <IoWaterSharp
          className="h-screen w-screen"
          style={{
            fill: 'url(#water-pattern)',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
          }}
        />
        <svg width="0" height="0">
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
        </svg>
      </div>
    </div>
  );
}
