import { GenericLink } from '../components';
import { LinkSection } from '../types';

export const FRONTEND_RESOURCES: GenericLink[] = [
  {
    href: 'https://es.react.dev/',
    label: 'React',
  },
  {
    href: 'https://nextjs.org/',
    label: 'Next.js',
  },
  {
    href: 'https://tailwindcss.com/',
    label: 'Tailwind CSS',
  },
  {
    href: 'https://tanstack.com/',
    label: 'TanStack',
  },
];

export const FRONTEND_RESOURCES_SECTION: LinkSection = {
  title: 'Frontend Resources',
  links: FRONTEND_RESOURCES,
};

export const BACKEND_RESOURCES: GenericLink[] = [
  {
    href: 'https://github.com/h0w4r/sedapal',
    label: 'Sedapal API',
  },
  {
    href: 'https://github.com/nakiviar/predictic-aahh-api',
    label: 'Air Quality API',
  },
];

export const BACKEND_RESOURCES_SECTION: LinkSection = {
  title: 'Backend Resources',
  links: BACKEND_RESOURCES,
};

export const ANOTHER_RESOURCES: GenericLink[] = [
  {
    href: 'https://developer.themoviedb.org/docs/getting-started',
    label: 'The Movie Database',
  },
  {
    href: 'https://react-icons.github.io/react-icons/',
    label: 'React Icons',
  },
  {
    href: 'https://ar.pinterest.com/pin/43417583905116286/',
    label: 'Pinterest',
  },
];

export const ANOTHER_RESOURCES_SECTION: LinkSection = {
  title: 'Another Resources',
  links: ANOTHER_RESOURCES,
};

export const COMPLETE_RESOURCES_SECTION: LinkSection[] = [
  FRONTEND_RESOURCES_SECTION,
  BACKEND_RESOURCES_SECTION,
  ANOTHER_RESOURCES_SECTION,
];
