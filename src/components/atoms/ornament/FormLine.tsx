import React from 'react';

interface FormLineProps {
  isFantasy?: boolean;
}
export const FormLine = ({ isFantasy = false }: FormLineProps) => {
  return (
    <>
      {isFantasy ? (
        <div className="mb-4 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
      ) : (
        <div className="bg-nasa-greysoft mt-2 h-0.5 rounded-full"></div>
      )}
    </>
  );
};
