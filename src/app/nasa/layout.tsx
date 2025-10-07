'use client';

import React from 'react';

export default function NasaLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-nasa-black min-h-screen">{children}</div>;
}
