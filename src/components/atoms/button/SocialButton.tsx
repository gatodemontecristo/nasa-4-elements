'use client';

import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  url: string;
}

export const SocialButton = ({ icon, url }: SocialButtonProps) => {
  return (
    <button
      className="cursor-pointer rounded bg-orange-500 p-2 text-white shadow transition-all duration-300 hover:bg-orange-400"
      onClick={() => window.open(url, '_blank')}
    >
      {icon}
    </button>
  );
};
