import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function MapLayout({ children }: Props) {
  return <>{children}</>;
}
