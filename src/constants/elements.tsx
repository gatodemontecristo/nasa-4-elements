import { elementsBannerProps, elementsIconsDetailProps, elementsIconsProps } from '@/types';
import { SiNasa } from 'react-icons/si';
import { GiWindsock, GiWindTurbine, GiPineTree } from 'react-icons/gi';
import { RiBuilding2Fill } from 'react-icons/ri';
import { FaBottleWater, FaCloudShowersWater } from 'react-icons/fa6';
import { MdFireHydrantAlt } from 'react-icons/md';
import { MenuItem } from '@/types/generalType';
import { FaFireAlt, FaWind, FaDumpsterFire } from 'react-icons/fa';
import { IoIosWater } from 'react-icons/io';
import { TbPlant } from 'react-icons/tb';
import { winds, earths, waters, fires } from '@/data';
import { SVG_WATER } from './svg';

export type GLOBAL_ELEMENTS = 'wind' | 'water' | 'fire' | 'earth';
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
  // {
  //   id: 'home',
  //   icon: <FaHome />,
  //   color: 'text-orange-500',
  //   bg: 'bg-orange-500',
  //   border: 'border-orange-500',
  //   label: 'Home',
  // },
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

export const ELEMENTS_MAIN_MSG: string =
  'Advanced geospatial intelligence platform integrating Earth observation data with urban planning methodologies for sustainable city development.';
export const ELEMENTS_BANNER: elementsBannerProps[] = [
  {
    element: 'wind',
    subtitle: 'Ground Analysis',
  },
  {
    element: 'water',
    subtitle: 'Hydrological Systems',
  },
  {
    element: 'fire',
    subtitle: 'Risk Assessment',
  },
  {
    element: 'earth',
    subtitle: 'Risk Assessment',
  },
];

export const elementsSvg: Record<GLOBAL_ELEMENTS, string> = {
  wind: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d='M272 32L368 32C385.7 32 400 46.3 400 64C400 81.7 385.7 96 368 96L272 96C254.3 96 240 81.7 240 64C240 46.3 254.3 32 272 32zM176 208C176 172.7 204.7 144 240 144L400 144C435.3 144 464 172.7 464 208C464 232.1 450.7 253.1 431 264C450.7 274.9 464 295.9 464 320C464 344.1 450.7 365.1 431 376C450.7 386.9 464 407.9 464 432C464 456.1 450.7 477.1 431 488C450.7 498.9 464 519.9 464 544C464 579.3 435.3 608 400 608L240 608C204.7 608 176 579.3 176 544C176 519.9 189.3 498.9 209 488C189.3 477.1 176 456.1 176 432C176 407.9 189.3 386.9 209 376C189.3 365.1 176 344.1 176 320C176 295.9 189.3 274.9 209 264C189.3 253.1 176 232.1 176 208z'/></svg>",
  water: SVG_WATER,
  fire: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d='M272 32L368 32C385.7 32 400 46.3 400 64C400 81.7 385.7 96 368 96L272 96C254.3 96 240 81.7 240 64C240 46.3 254.3 32 272 32zM176 208C176 172.7 204.7 144 240 144L400 144C435.3 144 464 172.7 464 208C464 232.1 450.7 253.1 431 264C450.7 274.9 464 295.9 464 320C464 344.1 450.7 365.1 431 376C450.7 386.9 464 407.9 464 432C464 456.1 450.7 477.1 431 488C450.7 498.9 464 519.9 464 544C464 579.3 435.3 608 400 608L240 608C204.7 608 176 579.3 176 544C176 519.9 189.3 498.9 209 488C189.3 477.1 176 456.1 176 432C176 407.9 189.3 386.9 209 376C189.3 365.1 176 344.1 176 320C176 295.9 189.3 274.9 209 264C189.3 253.1 176 232.1 176 208z'/></svg>",
  earth:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d='M272 32L368 32C385.7 32 400 46.3 400 64C400 81.7 385.7 96 368 96L272 96C254.3 96 240 81.7 240 64C240 46.3 254.3 32 272 32zM176 208C176 172.7 204.7 144 240 144L400 144C435.3 144 464 172.7 464 208C464 232.1 450.7 253.1 431 264C450.7 274.9 464 295.9 464 320C464 344.1 450.7 365.1 431 376C450.7 386.9 464 407.9 464 432C464 456.1 450.7 477.1 431 488C450.7 498.9 464 519.9 464 544C464 579.3 435.3 608 400 608L240 608C204.7 608 176 579.3 176 544C176 519.9 189.3 498.9 209 488C189.3 477.1 176 456.1 176 432C176 407.9 189.3 386.9 209 376C189.3 365.1 176 344.1 176 320C176 295.9 189.3 274.9 209 264C189.3 253.1 176 232.1 176 208z'/></svg>",
};
