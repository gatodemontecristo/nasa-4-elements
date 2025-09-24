import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaFireAlt, FaWind } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { TbPlant } from "react-icons/tb";
import { SidebarButton, Tooltip } from "../atoms";

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  description?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    icon: <FaHome />,
    label: "Home",
    subItems: [
      { id: "dashboard", label: "Dashboard", description: "Vista general" },
      {
        id: "overview",
        label: "Resumen",
        description: "Estadísticas generales",
      },
    ],
  },
  {
    id: "fire",
    icon: <FaFireAlt />,
    label: "Fire",
    subItems: [
      {
        id: "satellite",
        label: "Vista Satelital",
        description: "Imágenes de satélite",
      },
      { id: "terrain", label: "Terreno", description: "Vista topográfica" },
      { id: "street", label: "Calles", description: "Vista de calles" },
    ],
  },
  {
    id: "water",
    icon: <IoIosWater />,
    label: "Water",
    subItems: [
      { id: "weather", label: "Clima", description: "Datos meteorológicos" },
      {
        id: "population",
        label: "Población",
        description: "Densidad poblacional",
      },
      {
        id: "environment",
        label: "Ambiente",
        description: "Datos ambientales",
      },
    ],
  },
  {
    id: "wind",
    icon: <FaWind />,
    label: "Wind",
    subItems: [
      { id: "reports", label: "Reportes", description: "Informes detallados" },
      { id: "charts", label: "Gráficos", description: "Visualizaciones" },
      { id: "trends", label: "Tendencias", description: "Análisis temporal" },
    ],
  },
  {
    id: "earth",
    icon: <TbPlant />,
    label: "Earth",
    subItems: [
      { id: "date", label: "Fecha", description: "Filtrar por fecha" },
      { id: "category", label: "Categoría", description: "Filtrar por tipo" },
    ],
  },
];

export const DashboardSidebar: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
    setActiveSubItem(null);
  };

  const handleSubItemClick = (subItemId: string) => {
    setActiveSubItem(subItemId);
  };

  return (
    <div className="absolute left-0 top-0 h-screen z-50 flex p-4">
      {/* Main Sidebar */}
      <div className="bg-nasa-black w-16 h-full flex flex-col items-center py-4 shadow-2xl rounded-md mr-2">
        <div className="flex flex-col space-y-3 w-full">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center w-full"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <SidebarButton
                icon={item.icon}
                isActive={activeItem === item.id}
                onClick={() => handleItemClick(item.id)}
              />

              {/* Tooltip on hover */}
              {hoveredItem === item.id && !activeItem && (
                <Tooltip label={item.label} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submenu Sidebar */}
      {activeItem && (
        <div
          className="bg-nasa-grey w-64 h-full rounded-md shadow-2xl transform transition-all duration-300 ease-in-out
                     animate-in slide-in-from-left-5 fade-in-0"
          style={{
            background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
          }}
        >
          <div className="relative p-4">
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold flex items-center">
                <span className="mr-3 text-blue-400">
                  {menuItems.find((item) => item.id === activeItem)?.icon}
                </span>
                {menuItems.find((item) => item.id === activeItem)?.label}
              </h3>
              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 rounded-full"></div>
            </div>

            <div className="space-y-2">
              {menuItems
                .find((item) => item.id === activeItem)
                ?.subItems?.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => handleSubItemClick(subItem.id)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-all duration-200 ease-in-out
                      transform hover:scale-[1.02] hover:shadow-md
                      ${
                        activeSubItem === subItem.id
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <div className="font-medium text-sm mb-1">
                      {subItem.label}
                    </div>
                    {subItem.description && (
                      <div className="text-xs opacity-75">
                        {subItem.description}
                      </div>
                    )}
                  </button>
                ))}
            </div>

            {/* Close button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
                         bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white
                         rounded-full transition-all duration-200 hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
