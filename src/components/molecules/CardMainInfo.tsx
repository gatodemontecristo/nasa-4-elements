import React from 'react';
import { TagStatus } from '../atoms';
import { CardOtherInfoProps } from '../../types';

interface CardMainInfoProps {
  children?: React.ReactNode;
  riskLevelColor: string;
}
const CardMainInfoRoot = ({ children, riskLevelColor }: CardMainInfoProps) => {
  return (
    <div className="space-y-4">
      <div className={`rounded-lg border-l-4 bg-black/40 p-3 ${riskLevelColor}`}>{children}</div>
    </div>
  );
};

const CardMainTitle = ({
  title,
  color,
  level,
}: {
  title: string;
  color: string;
  level: string;
}) => {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h4 className="font-nasalization text-xs tracking-wide text-white uppercase">{title}</h4>
      <TagStatus color={color} level={level} />
    </div>
  );
};

const CardOtherInfo = ({ children, title }: CardOtherInfoProps) => {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-gray-400">{title}</span>
      <span className="flex flex-row items-center gap-1 font-mono text-xs text-white">
        {children}
      </span>
    </div>
  );
};

const CardOtherInfoFull = ({
  items,
  footer,
  className,
}: {
  items: CardOtherInfoProps[];
  footer: string;
  className?: string;
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {items.map((item, index) => (
        <CardOtherInfo key={index} title={item.title}>
          {item.children}
        </CardOtherInfo>
      ))}
      <p className="mt-2 text-xs text-gray-300">{footer}</p>
    </div>
  );
};

export const CardMainInfo = Object.assign(CardMainInfoRoot, {
  Title: CardMainTitle,
  Info: CardOtherInfoFull,
});
