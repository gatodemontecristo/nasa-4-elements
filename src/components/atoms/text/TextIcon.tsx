import React from 'react';
interface TextIconProps {
  icon: React.ReactNode;
  text: string;
}
export const TextIcon = ({ icon, text }: TextIconProps) => {
  return (
    <span className="flex items-center gap-1">
      {icon} <p>{text}</p>
    </span>
  );
};
