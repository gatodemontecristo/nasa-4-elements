import { elementsIconsDetailProps, elementsIconsProps } from "@/types";
import { SiNasa } from "react-icons/si";
import { GiWindsock, GiWindTurbine, GiPineTree } from "react-icons/gi";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaBottleWater } from "react-icons/fa6";
import { FaCloudShowersWater } from "react-icons/fa6";
import { FaDumpsterFire } from "react-icons/fa";
import { MdFireHydrantAlt } from "react-icons/md";

export type GLOBAL_ELEMENTS = "wind" | "water" | "fire" | "earth" | "home";
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
        icon: <GiWindsock className="text-yellow-500 size-8" />,
        title: "Wind Sock",
        subtitle: "Measures wind direction",
      },
      TYPE02: {
        icon: <GiWindTurbine className="text-yellow-500 size-8" />,
        title: "Wind Turbine",
        subtitle: "Generates wind energy",
      },
    },
  },
  {
    element: "water",
    types: {
      TYPE01: {
        icon: <FaBottleWater className="text-blue-600 size-8" />,
        title: "Water Bottle",
        subtitle: "Stores drinking water",
      },
      TYPE02: {
        icon: <FaCloudShowersWater className="text-blue-600 size-8" />,
        title: "Cloud Showers",
        subtitle: "Indicates rain",
      },
    },
  },
  {
    element: "earth",
    types: {
      TYPE01: {
        icon: <GiPineTree className="text-green-500 size-8" />,
        title: "Pine Tree",
        subtitle: "A tall coniferous tree",
      },
      TYPE02: {
        icon: <RiBuilding2Fill className="text-green-500 size-8" />,
        title: "Building",
        subtitle: "A man-made structure",
      },
    },
  },
  {
    element: "fire",
    types: {
      TYPE01: {
        icon: <FaDumpsterFire className="text-red-500 size-8" />,
        title: "Dumpster Fire",
        subtitle: "A fire in a dumpster",
      },
      TYPE02: {
        icon: <MdFireHydrantAlt className="text-red-500 size-8" />,
        title: "Fire Hydrant",
        subtitle: "A hydrant for fire emergencies",
      },
    },
  },
];
