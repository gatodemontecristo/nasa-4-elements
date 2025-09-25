import React from "react";

interface InfoSkeletonProps {
  className?: string;
}
export const InfoSkeleton = ({ className }: InfoSkeletonProps) => {
  return (
    <div className={`flex flex-col w-full gap-4 ${className}`}>
      <div className="bg-gray-800 h-[220px] rounded-lg animate-pulse"></div>
      <div className="bg-gray-800 h-[30px]  rounded-lg animate-pulse"></div>
      <div className="bg-gray-800 h-[30px] w-2/3 rounded-lg animate-pulse"></div>
    </div>
  );
};
