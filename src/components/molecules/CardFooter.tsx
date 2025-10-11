import React from 'react';

interface CardFooterProps {
  title: string;
  description: string;
  final: string;
}
export const CardFooter = ({ title, description, final }: CardFooterProps) => {
  return (
    <div className="mt-4 border-t border-gray-700 pt-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{title}</span>
        <span className="font-mono text-xs text-gray-300">{description}</span>
      </div>
      <p className="mt-2 text-xs text-gray-500">{final}</p>
    </div>
  );
};
