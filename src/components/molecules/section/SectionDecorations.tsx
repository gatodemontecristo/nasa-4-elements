import React from 'react';

export const SectionDecorations = () => {
  return (
    <>
      <div className="absolute top-15 right-0 left-0 text-center">
        <div className="font-jetbrains mt-6 flex items-center justify-center space-x-8 text-xs text-gray-600">
          <span>LAT: -12.0201464</span>
          <span>•</span>
          <span>LNG: -76.8175454</span>
          <span>•</span>
          <span>ALT: 2240M</span>
        </div>
      </div>

      <div className="font-jetbrains absolute right-0 bottom-20 left-0 flex flex-row justify-around text-center text-xs text-gray-600">
        <span>{`40' - 9' X 4' - 6'`}</span>
        <span>{`1729 • 2300 • 21312`}</span>
        <span>{`7' - 8' X 18' - 10'`}</span>
      </div>
    </>
  );
};
