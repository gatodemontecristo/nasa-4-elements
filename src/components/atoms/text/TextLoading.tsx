import React from 'react';

interface TextLoadingProps {
  isShow: boolean;
  label: string;
}
export const TextLoading = ({ isShow, label }: TextLoadingProps) => {
  return (
    <>
      {isShow && (
        <div className="border-nasa-grey/20 mt-1 border-t pt-1">
          <p className="text-nasa-grey text-xs">{label}</p>
        </div>
      )}
    </>
  );
};
