'use client';
import React from 'react';
import { SidebarFullButton } from '../molecules';
import { MenuItem } from '@/types/generalType';
import { useSidebarStore } from '@/store';
import { FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
interface MainSidebarProps {
  className?: string;
  menuItems: MenuItem[];
}
export const MainSidebar = ({ className, menuItems }: MainSidebarProps) => {
  const { activeItem, hoveredItem, handleItemClick } = useSidebarStore();
  const home: MenuItem = {
    id: 'home',
    icon: <FaHome />,
    color: 'text-orange-500',
    bg: 'bg-orange-500',
    border: 'border-orange-500',
    label: 'Home',
  };
  const router = useRouter();
  const goToHome = () => {
    router.push('/');
  };
  return (
    <div
      className={`bg-nasa-black mr-2 flex h-full w-16 flex-col items-center rounded-md py-4 shadow-2xl ${className}`}
    >
      <div className="flex w-full flex-col space-y-3">
        {menuItems.map(item => (
          <SidebarFullButton
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item.id)}
            btnActive={activeItem?.id === item.id}
            tipActive={hoveredItem === item.id && !activeItem}
          ></SidebarFullButton>
        ))}
        <hr className="mx-2 border-t border-white"></hr>
        <SidebarFullButton
          key={home.id}
          item={home}
          onClick={() => goToHome()}
          btnActive={activeItem?.id === home.id}
          tipActive={hoveredItem === home.id && !activeItem}
        ></SidebarFullButton>
      </div>
    </div>
  );
};
