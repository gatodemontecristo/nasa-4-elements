import { DEFAULT_ICON, elementsIcons, GLOBAL_ELEMENTS } from "@/constants";
import { elementsIconsDetailProps } from "@/types";

// interface proyectElement {
//   types: MarkNasaGroup[];
//   element: GLOBAL_ELEMENTS;
// }

export const getElementIcon = (
  element: GLOBAL_ELEMENTS,
  type: string
): elementsIconsDetailProps => {
  const elementData = elementsIcons.find((el) => el.element === element);
  if (elementData && elementData.types[type]) {
    return elementData.types[type];
  }
  return DEFAULT_ICON;
};
