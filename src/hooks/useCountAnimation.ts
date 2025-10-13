'use client';

import { useEffect, useState } from 'react';

export const useCountAnimation = (targetValue: string, duration: number = 2000) => {
  const [currentValue, setCurrentValue] = useState(0);
  const numericTarget = parseInt(targetValue.replace(/,/g, ''), 10) || 0;

  useEffect(() => {
    if (numericTarget === 0) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentNum = Math.floor(startValue + (numericTarget - startValue) * easeOutQuart);

      setCurrentValue(currentNum);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [numericTarget, duration]);

  return currentValue.toLocaleString();
};
