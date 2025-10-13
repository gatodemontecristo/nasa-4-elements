'use client';

import React from 'react';

export default function NasaLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-black/40">{children}</div>;
}
