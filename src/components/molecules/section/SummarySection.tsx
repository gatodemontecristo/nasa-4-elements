import React from 'react';

interface summarySectionProps {
  summary: string;
}
export const SummarySection = ({ summary }: summarySectionProps) => {
  return (
    <div className="flex w-1/5 flex-col gap-4">
      <p className="font-orbitron text-2xl">Summary</p>
      <p>{summary}</p>
    </div>
  );
};
