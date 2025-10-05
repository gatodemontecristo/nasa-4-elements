import React from 'react';

interface HeaderLabelProps {
  text: string;
  className?: string;
}
export const HeaderLabel = ({ text, className }: HeaderLabelProps) => {
  return (
    <span className={`font-jetbrains text-sm tracking-widest text-white ${className}`}>{text}</span>
  );
};
