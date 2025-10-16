import { nanoid } from 'nanoid';
import React from 'react';
import { GenericLink, LinkTab } from '../atoms';
interface LinkCollectionProps {
  collection: GenericLink[];
  title: string;
  className?: string;
}
export const LinkCollection = ({ collection, title, className }: LinkCollectionProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="text-nasa-white font-orbitron font-mont mb-3 text-lg font-semibold">{title}</p>
      {collection.map(link => (
        <LinkTab key={nanoid()} {...link} />
      ))}
    </div>
  );
};
