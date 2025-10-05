import React from 'react';
import { elementsSvg, GLOBAL_ELEMENTS } from '../../../constants';

interface VideoIconProps {
  className?: string;
  srcVideo: string;
  element: GLOBAL_ELEMENTS;
}
export const VideoIcon = ({ className, srcVideo, element }: VideoIconProps) => {
  return (
    <div className={`h-100 w-100 ${className}`}>
      <video
        src={srcVideo}
        autoPlay
        loop
        muted
        className="h-full w-full object-cover"
        style={{
          WebkitMaskImage: `url("data:image/svg+xml;utf8,${elementsSvg[element]}")`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskImage: `url("data:image/svg+xml;utf8,${elementsSvg[element]}")`,
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          maskSize: 'contain',
        }}
      />
    </div>
  );
};
