"use client";

import React from "react";

export default function NasaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-nasa-black">{children}</div>;
}
