import { GLOBAL_ELEMENTS } from '@/constants';
import { TypeMark } from '@/data';

export interface MenuItem {
  id: GLOBAL_ELEMENTS;
  icon: React.ReactNode;
  label: string;
  color: string;
  bg: string;
  border: string;
  collection?: TypeMark[];
}
