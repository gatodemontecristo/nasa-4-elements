import { TypeMark } from '@/data';

export interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  bg: string;
  border: string;
  collection?: TypeMark[];
}

export interface CardOtherInfoProps {
  title: string;
  children: React.ReactNode;
}
