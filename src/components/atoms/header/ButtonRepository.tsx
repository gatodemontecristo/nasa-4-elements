'use client';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface ButtonRepositoryProps {
  url: string;
}
export const ButtonRepository = ({ url }: ButtonRepositoryProps) => {
  return (
    <button
      onClick={() => window.open(url, '_blank')}
      className="bg-nasa-orange flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm transition-all duration-200 ease-in-out hover:bg-yellow-500"
    >
      <span className="text-2xl font-bold text-white">
        <FaGithub />
      </span>
    </button>
  );
};
