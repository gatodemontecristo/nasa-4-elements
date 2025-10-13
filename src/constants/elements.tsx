import {
  elementsBannerProps,
  elementsIconsDetailProps,
  elementsIconsProps,
  elementsSectionProps,
} from '@/types';
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
import { SVG_EARTH, SVG_FIRE, SVG_WATER, SVG_WIND } from './svg';

export type GLOBAL_ELEMENTS = 'wind' | 'water' | 'fire' | 'earth';
export type CARD_COLOURS = 'green' | 'yellow' | 'blue';
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

export const MAIN_EXTRA: string = 'Urban Planning × Space Technology';
export const MAIN_TITLE: string = 'NASA';
export const MAIN_SUBTITLE: string = '4 ELEMENTORS';
export const NASA_LOGO_LABEL: string = 'NASA.URBAN.OBSERVATORY';
export const GITHUB_LOGO_LABEL: string = 'GITHUB.REPOSITORY';

export const ELEMENTS_MAIN_MSG: string =
  'Advanced geospatial intelligence platform integrating Earth observation data with urban planning methodologies for sustainable city development.';
export const ELEMENTS_BANNER: elementsBannerProps[] = [
  {
    element: 'wind',
    subtitle: 'Ground Analysis',
    className: 'text-blue-400',
  },
  {
    element: 'water',
    subtitle: 'Hydrological Systems',
    className: 'text-green-400',
  },
  {
    element: 'fire',
    subtitle: 'Risk Assessment',
    className: 'text-orange-400',
  },
  {
    element: 'earth',
    subtitle: 'Risk Assessment',
    className: 'text-cyan-400',
  },
];

export const ELEMENTS_SECTIONS: elementsSectionProps[] = [
  {
    element: 'wind',
    summary:
      'NASA wind and air-quality data reveal pollution and airflow patterns, enabling cleaner cities through renewable energy and ventilation-aware design.',
    problem: 'Air pollution',
    goal: 'Cleaner environment',
    solution: 'Renewable energy',
    video: '/videos/wind.mp4',
  },
  {
    element: 'water',
    summary:
      'Using NASA water data, we target scarce sources and seasonal risks, creating smart systems for safe and resilient supply in vulnerable settlements.',
    problem: 'Scarce clean sources',
    goal: 'Ensure safe supply',
    solution: 'Smart water systems',
    video: '/videos/water.mp4',
  },
  {
    element: 'fire',
    summary:
      'By applying NASA fire and drought monitoring, we enable early detection and community-focused strategies to reduce wildfire risks near settlements.',
    problem: 'Wildfire risks',
    goal: 'Risk reduction',
    solution: 'Early detection',
    video: '/videos/fire.mp4',
  },
  {
    element: 'earth',
    summary:
      'With NASA land and soil insights, we guide sustainable zoning and growth, preventing overuse and supporting resilient urban planning.',
    problem: 'Land overuse',
    goal: 'Sustainable growth',
    solution: 'Geo-data planning',
    video: '/videos/earth.mp4',
  },
];

export const elementsSvg: Record<GLOBAL_ELEMENTS, string> = {
  wind: SVG_WIND,
  water: SVG_WATER,
  fire: SVG_FIRE,
  earth: SVG_EARTH,
};

export const GASEOUS_POLLUTANTS_COLORS = [
  '#FF6384', // PM10 - Rojo
  '#36A2EB', // PM2.5 - Azul
  '#FFCE56', // CO₂ - Amarillo
  '#4BC0C0', // NO₂ - Verde azulado
  '#9966FF', // CH₄ - Púrpura
];

export const GASEOUS_POLLUTANTS_LABELS = ['PM10', 'PM2.5', 'CO₂', 'NO₂', 'CH₄'];

interface CardColoursProps {
  formatShadow: string;
  bg: string;

  title: string;
  subtitle: string;
}

export const cardColoursStyles: Record<CARD_COLOURS, CardColoursProps> = {
  green: {
    formatShadow: 'border-green-500/30 bg-green-900/20',
    bg: 'bg-green-400',
    title: 'text-green-400',
    subtitle: 'text-green-200',
  },
  blue: {
    formatShadow: 'border-blue-500/30 bg-blue-900/20 ',
    bg: 'bg-blue-400',
    title: 'text-blue-400',
    subtitle: 'text-blue-200',
  },
  yellow: {
    formatShadow: 'border-yellow-500/30 bg-yellow-900/20',
    bg: 'bg-yellow-400',
    title: 'text-yellow-400',
    subtitle: 'text-yellow-200',
  },
};

export interface ElementsGoalsProps {
  tile: string;
  description: string;
  label: string;
  styles: {
    border: string;
    bgDot: string;
    text: string;
  };
}
export const ELEMENTS_GOALS: ElementsGoalsProps[] = [
  {
    tile: 'METHODOLOGY',
    description:
      'Satellite imagery analysis combined with machine learning algorithms to identify urban development patterns and environmental impacts.',
    label: 'ML.GEOSPATIAL.ANALYSIS',
    styles: {
      border: 'border-blue-400',
      bgDot: 'bg-blue-400',
      text: 'text-blue-400',
    },
  },
  {
    tile: 'TECHNOLOGY',
    description:
      'Real-time data processing from multiple NASA Earth observation satellites integrated with urban planning frameworks.',
    label: 'SATELLITE.DATA.INTEGRATION',
    styles: {
      border: 'border-green-400',
      bgDot: 'bg-green-400',
      text: 'text-green-400',
    },
  },
  {
    tile: 'IMPACT',
    description:
      'Sustainable urban development strategies based on evidence-driven environmental analysis and predictive modeling systems.',
    label: 'SUSTAINABLE.URBAN.DEVELOPMENT',
    styles: {
      border: 'border-orange-400',
      bgDot: 'bg-orange-400',
      text: 'text-orange-400',
    },
  },
];
