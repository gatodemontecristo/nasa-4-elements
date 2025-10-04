import { elementsIconsDetailProps, elementsIconsProps } from '@/types';
import { SiNasa } from 'react-icons/si';
import { GiWindsock, GiWindTurbine, GiPineTree } from 'react-icons/gi';
import { RiBuilding2Fill } from 'react-icons/ri';
import { FaBottleWater, FaCloudShowersWater } from 'react-icons/fa6';
import { MdFireHydrantAlt } from 'react-icons/md';
import { MenuItem } from '@/types/generalType';
import { FaHome } from 'react-icons/fa';
import { FaFireAlt, FaWind, FaDumpsterFire } from 'react-icons/fa';
import { IoIosWater } from 'react-icons/io';
import { TbPlant } from 'react-icons/tb';
import { winds, earths, waters, fires } from '@/data';

export type GLOBAL_ELEMENTS = 'wind' | 'water' | 'fire' | 'earth' | 'home';
export const DEFAULT_ICON: elementsIconsDetailProps = {
  icon: <SiNasa className="text-nasa-white size-8" />,
  title: 'NASA',
  subtitle: 'National Aeronautics and Space Administration',
};

export const elementsIcons = (className?: string): elementsIconsProps[] => [
  {
    element: 'wind',
    types: {
      TYPE01: {
        icon: <GiWindsock className={`size-8 ${className || 'text-yellow-500'}`} />,
        title: 'Wind Sock',
        subtitle: 'Measures wind direction',
      },
      TYPE02: {
        icon: <GiWindTurbine className={`size-8 ${className || 'text-yellow-500'}`} />,
        title: 'Wind Turbine',
        subtitle: 'Generates wind energy',
      },
    },
  },
  {
    element: 'water',
    types: {
      TYPE01: {
        icon: <FaBottleWater className={`size-8 ${className || 'text-blue-500'}`} />,
        title: 'Water Bottle',
        subtitle: 'Stores drinking water',
      },
      TYPE02: {
        icon: <FaCloudShowersWater className={`size-8 ${className || 'text-blue-500'}`} />,
        title: 'Cloud Showers',
        subtitle: 'Indicates rain',
      },
    },
  },
  {
    element: 'earth',
    types: {
      TYPE01: {
        icon: <GiPineTree className={`size-8 ${className || 'text-green-500'}`} />,
        title: 'Pine Tree',
        subtitle: 'A tall coniferous tree',
      },
      TYPE02: {
        icon: <RiBuilding2Fill className={`size-8 ${className || 'text-green-500'}`} />,
        title: 'Building',
        subtitle: 'A man-made structure',
      },
    },
  },
  {
    element: 'fire',
    types: {
      TYPE01: {
        icon: <FaDumpsterFire className={`size-8 ${className || 'text-red-500'}`} />,
        title: 'Dumpster Fire',
        subtitle: 'A fire in a dumpster',
      },
      TYPE02: {
        icon: <MdFireHydrantAlt className={`size-8 ${className || 'text-red-500'}`} />,
        title: 'Fire Hydrant',
        subtitle: 'A hydrant for fire emergencies',
      },
    },
  },
];

export const MENU_ELEMENTS: MenuItem[] = [
  {
    id: 'home',
    icon: <FaHome />,
    color: 'text-orange-500',
    bg: 'bg-orange-500',
    border: 'border-orange-500',
    label: 'Home',
  },
  {
    id: 'fire',
    icon: <FaFireAlt />,
    color: 'text-red-500',
    bg: 'bg-red-500',
    border: 'border-red-500',
    label: 'Fire',
    collection: fires,
  },
  {
    id: 'water',
    icon: <IoIosWater />,
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    label: 'Water',
    collection: waters,
  },
  {
    id: 'wind',
    icon: <FaWind />,
    label: 'Wind',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500',
    border: 'border-yellow-500',
    collection: winds,
  },
  {
    id: 'earth',
    icon: <TbPlant />,
    label: 'Earth',
    color: 'text-green-500',
    bg: 'bg-green-500',
    border: 'border-green-500',
    collection: earths,
  },
];
