import React from 'react';

interface IconInfoSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const IconInfoSection = ({ icon, title, description, className }: IconInfoSectionProps) => {
  return (
    <div className="flex flex-col">
      {icon}
      <p className="font-jetbrains text-xs">{title}</p>
      <p className={`font-orbitron text-sm font-bold ${className}`}>{description}</p>
    </div>
  );
};
