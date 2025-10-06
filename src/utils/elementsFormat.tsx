import { DEFAULT_ICON, elementsIcons } from '@/constants';
import { elementsIconsDetailProps } from '@/types';

export const getElementIcon = (
  element: string,
  type: string,
  className?: string
): elementsIconsDetailProps => {
  const elementData = elementsIcons(className).find(el => el.element === element);
  if (elementData && elementData.types[type]) {
    return elementData.types[type];
  }
  return DEFAULT_ICON;
};
