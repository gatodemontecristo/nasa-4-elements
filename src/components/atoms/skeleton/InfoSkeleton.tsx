import React from 'react';

interface InfoSkeletonProps {
  className?: string;
}
export const InfoSkeleton = ({ className }: InfoSkeletonProps) => {
  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      <div className="h-[220px] animate-pulse rounded-lg bg-gray-800"></div>
      <div className="h-[30px] animate-pulse rounded-lg bg-gray-800"></div>
      <div className="h-[30px] w-2/3 animate-pulse rounded-lg bg-gray-800"></div>
    </div>
  );
};
