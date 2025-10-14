import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

export interface SocialNetwork {
  name: string;
  url: string;
  icon: React.ReactNode;
}
export interface AvatarMembersProps {
  name: string;
  role: string;
  avatar?: string;
  social_networks: SocialNetwork[];
}

export const AVATAR_MEMBERS: AvatarMembersProps[] = [
  {
    name: 'Naki Dejo',
    role: 'Technical leader & Backend',
    avatar: '/members/naki.jpeg',

    social_networks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/naki-jannet-dejo-vicente/',
        icon: <FaLinkedin className="size-5" />,
      },
      {
        name: 'Github',
        url: 'https://github.com/nakiviar',
        icon: <FaGithub className="size-5" />,
      },
    ],
  },
  {
    name: 'Christian Huicho',
    role: 'Data Scientist',
    avatar: '/members/chris.jpeg',

    social_networks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/cehp94/',
        icon: <FaLinkedin className="size-5" />,
      },
      {
        name: 'Github',
        url: 'https://github.com/h0w4r',
        icon: <FaGithub className="size-5" />,
      },
    ],
  },
  {
    name: 'Zulema de la Cruz',
    role: 'Urban Planning Specialist',
    avatar: '/members/zulema.jpeg',
    social_networks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/zulema-de-la-cruz-vila-31a9ab256/',
        icon: <FaLinkedin className="size-5" />,
      },
    ],
  },
  {
    name: 'Erick Dejo',
    role: 'Frontend & UX/UI',
    avatar: '/members/erick.png',
    social_networks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/erick-dejo-vicente-b819601b6/',
        icon: <FaLinkedin className="size-5" />,
      },
      {
        name: 'Github',
        url: 'https://github.com/gatodemontecristo',
        icon: <FaGithub className="size-5" />,
      },
      {
        name: 'Leetcode',
        url: 'https://leetcode.com/u/gatodemontecristo/',
        icon: <SiLeetcode className="size-5" />,
      },
    ],
  },
];
