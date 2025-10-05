import { GLOBAL_ELEMENTS } from '@/constants';

export interface elementsIconsDetailProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
  subtitle?: string;
}
export interface elementsIconsProps {
  element: GLOBAL_ELEMENTS;
  types: {
    [key: string]: elementsIconsDetailProps;
  };
}

export interface elementsBannerProps {
  className?: string;
  element: GLOBAL_ELEMENTS;
  subtitle: string;
}

export interface elementsSectionProps {
  element: GLOBAL_ELEMENTS;
  className?: string;
  summary: string;
  problem: string;
  goal: string;
  solution: string;
  video: string;
}
