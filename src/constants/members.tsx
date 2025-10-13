import { FaGithub, FaLinkedin } from 'react-icons/fa6';

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
    social_networks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/erick-dejo-vicente-b819601b6/',
        icon: <FaLinkedin className="size-5" />,
      },
    ],
  },
  {
    name: 'Christian Huicho',
    role: 'Data Scientist',
    social_networks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/erick-dejo-vicente-b819601b6/',
        icon: <FaLinkedin className="size-5" />,
      },
    ],
  },
  {
    name: 'Zulema de la Cruz',
    role: 'Urban Planning Specialist',
    social_networks: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/erick-dejo-vicente-b819601b6/',
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
    ],
  },
];
