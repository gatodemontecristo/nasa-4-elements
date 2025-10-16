'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaCircleInfo } from 'react-icons/fa6';

export interface InformativeMsgProps {
  message: string;
  top: number;
  left: number;
}

export const InformativeMsg = ({ message, top, left }: InformativeMsgProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const messageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMessage = () => {
    if (!isVisible && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + top,
        left: rect.left + left,
      });
    }
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          onClick={toggleMessage}
          className="text-rimac-grey cursor-pointer focus:outline-none"
        >
          <FaCircleInfo size={16} />
        </button>
      </div>
      {isVisible &&
        createPortal(
          <div
            ref={messageRef}
            className="font-jetbrains fixed z-[9999] w-64 rounded-lg border border-gray-700 bg-black p-4 text-xs text-white shadow-lg"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
            }}
          >
            <p className="text-xs">{message}</p>
          </div>,
          document.body
        )}
    </>
  );
};
