import { elementsIconsDetailProps, elementsIconsProps } from "@/types";
import { SiNasa } from "react-icons/si";
import { GiWindsock, GiWindTurbine, GiPineTree } from "react-icons/gi";
import { RiBuilding2Fill } from "react-icons/ri";

export type GLOBAL_ELEMENTS = "wind" | "water" | "fire" | "earth";
export const DEFAULT_ICON: elementsIconsDetailProps = {
  icon: <SiNasa className="text-blue-700 size-8" />,
  title: "NASA",
  subtitle: "National Aeronautics and Space Administration",
};

export const elementsIcons: elementsIconsProps[] = [
  {
    element: "wind",
    types: {
      TYPE01: {
        icon: <GiWindsock className="text-yellow-300 size-8" />,
        title: "Wind Sock",
        subtitle: "Measures wind direction",
      },
      TYPE02: {
        icon: <GiWindTurbine className="text-yellow-300 size-8" />,
        title: "Wind Turbine",
        subtitle: "Generates wind energy",
      },
    },
  },
  {
    element: "earth",
    types: {
      TYPE01: {
        icon: <GiPineTree className="text-yellow-300 size-8" />,
        title: "Pine Tree",
        subtitle: "A tall coniferous tree",
      },
      TYPE02: {
        icon: <RiBuilding2Fill className="text-yellow-300 size-8" />,
        title: "Building",
        subtitle: "A man-made structure",
      },
    },
  },
];
