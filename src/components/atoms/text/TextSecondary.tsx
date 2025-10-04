import React from 'react';

interface TextSecondaryProps {
  label: string;
}
export const TextSecondary = ({ label }: TextSecondaryProps) => {
  return <div className="mb-1 text-sm font-medium">{label}</div>;
};
