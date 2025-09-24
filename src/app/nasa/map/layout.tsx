import React from "react";

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export default function IntroLayout({ children }: Props) {
  return <>{children}</>;
}
