import React from 'react';
import { LoaderDot } from './ornament';

export const LoadSpinner = () => {
  return (
    <div className="flex h-24 items-center justify-center pb-12">
      <LoaderDot></LoaderDot>
    </div>
  );
};
