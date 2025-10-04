import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { FormLine } from '../atoms';

interface UnderlinedTitleProps {
  icon?: React.ReactNode;
  title?: string;
  textColor: string;
  iconColor: string;
  isFantasy?: boolean;
}
export const UnderlinedTitle = ({
  icon,
  title = '',
  iconColor,
  textColor,
  isFantasy = false,
}: UnderlinedTitleProps) => {
  return (
    <div className="mb-6">
      <h3 className={`mb-2 flex items-center text-lg font-bold ${textColor}`}>
        <span className={`mr-3 ${iconColor}`}>{icon ? icon : <FaLocationArrow />}</span>
        {title}
      </h3>
      <FormLine isFantasy={isFantasy} />
    </div>
  );
};
