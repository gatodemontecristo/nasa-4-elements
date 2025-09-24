import { GLOBAL_ELEMENTS } from "@/constants";

export interface elementsIconsDetailProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}
export interface elementsIconsProps {
  element: GLOBAL_ELEMENTS;
  types: {
    [key: string]: elementsIconsDetailProps;
  };
}
