'use client';
import { useEffect, useState } from 'react';
import { IoDesktopSharp } from 'react-icons/io5';
import { MdSmartphone } from 'react-icons/md';

export const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'tablet', 'phone'];
      const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const isMobileScreen = window.innerWidth < 768;

      setIsMobile(isMobileUserAgent || isMobileScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
      <div className="mx-4 max-w-md rounded-lg border border-red-500/30 bg-gray-900/95 p-8 text-center backdrop-blur-sm">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <MdSmartphone className="h-16 w-16 text-red-400" />
            <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
              <span className="text-xl font-bold text-white">✕</span>
            </div>
          </div>
        </div>

        <h1 className="font-nasalization mb-4 text-2xl font-bold tracking-wider text-white uppercase">
          Desktop Only
        </h1>

        <p className="font-inter mb-6 leading-relaxed text-gray-300">
          This NASA Urban Planning application is optimized for desktop use only. Please access it
          from a desktop computer or laptop for the best experience.
        </p>

        <div className="mb-6 flex justify-center">
          <IoDesktopSharp className="h-12 w-12 text-blue-400" />
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
          <p className="font-jetbrains text-sm text-blue-200">
            Minimum screen resolution: 1024x768
          </p>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>© 2025 NASA Urban Observatory</p>
          <p>Four Elements Project</p>
        </div>
      </div>
    </div>
  );
};
