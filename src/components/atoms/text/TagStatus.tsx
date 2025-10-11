import React from 'react';

interface TagStatusProps {
  color: string;
  level: string;
}
export const TagStatus = ({ color, level }: TagStatusProps) => {
  return (
    <span className={`font-jetbrains rounded-full px-2 py-1 text-xs text-white ${color}`}>
      {level}
    </span>
  );
};
