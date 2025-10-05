import Link from 'next/link';
import React from 'react';

interface MainLinkProps {
  href: string;
  text: string;
}
export const MainLink = ({ href, text }: MainLinkProps) => {
  return (
    <Link
      href={href}
      className="group font-space-grotesk inline-flex items-center justify-center border-2 border-blue-500 bg-transparent px-12 py-4 font-semibold tracking-wide text-blue-400 transition-all duration-300 hover:bg-blue-500 hover:text-white"
    >
      <span className="font-orbitron mr-3">{text}</span>
      <div className="flex h-6 w-6 items-center justify-center border border-current group-hover:border-white">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};
