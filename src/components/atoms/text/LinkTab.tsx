import React from 'react';
export interface GenericLink {
  href: string;
  label: string;
}
interface LinkTabProps extends GenericLink {
  className?: string;
}
export const LinkTab = ({ href, label, className }: LinkTabProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-nasa-white font-jetbrains font-mont hover: transition-all duration-200 hover:font-semibold hover:underline ${className}`}
    >
      {label}
    </a>
  );
};
