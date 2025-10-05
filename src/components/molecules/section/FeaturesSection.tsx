import React from 'react';
import { FaShuttleSpace } from 'react-icons/fa6';
import { MdReportProblem } from 'react-icons/md';
import { RiBuilding2Fill } from 'react-icons/ri';

interface featuresSectionProps {
  problem: string;
  goal: string;
  solution: string;
}
export const FeaturesSection = ({ problem, goal, solution }: featuresSectionProps) => {
  return (
    <div className="flex w-1/5 flex-col items-center justify-center gap-4">
      <p className="font-orbitron text-2xl">Element features</p>
      <MdReportProblem className="h-8 w-8 text-orange-400" />
      <p>{problem}</p>
      <RiBuilding2Fill className="h-8 w-8 text-green-500" />
      <p>{goal}</p>
      <FaShuttleSpace className="h-8 w-8 text-blue-500" />
      <p>{solution}</p>
    </div>
  );
};
