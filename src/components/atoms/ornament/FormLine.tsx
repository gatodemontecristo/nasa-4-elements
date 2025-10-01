import React from "react";

interface FormLineProps {
  isFantasy?: boolean;
}
export const FormLine = ({ isFantasy = false }: FormLineProps) => {
  return (
    <>
      {isFantasy ? (
        <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
      ) : (
        <div className="h-0.5 bg-nasa-greysoft mt-2 rounded-full"></div>
      )}
    </>
  );
};
