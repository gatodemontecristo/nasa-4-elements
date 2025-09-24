import React, { useEffect, useState } from "react";
import { FaHome, FaChartLine, FaDownload, FaEye } from "react-icons/fa";
import { FaFireAlt, FaWind } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { TbPlant } from "react-icons/tb";
import { SidebarButton, Tooltip } from "../atoms";
import { Accordion } from "../molecules/Accordion";
import { TypeMark, winds, formattedMark } from "@/data";
import { Accordion2 } from "../molecules/Accordion2";
import { GiWindsock } from "react-icons/gi";

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  collection?: TypeMark[];
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  description?: string;
  content?: {
    title: string;
    description: string;
    features?: string[];
    stats?: { label: string; value: string }[];
  };
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    icon: <FaHome />,
    label: "Home",
    subItems: [
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Vista general",
        content: {
          title: "Panel de Control",
          description:
            "Monitorea todos los elementos en tiempo real con métricas avanzadas y visualizaciones interactivas.",
          features: [
            "Métricas en tiempo real",
            "Alertas automáticas",
            "Análisis predictivo",
            "Exportar reportes",
          ],
          stats: [
            { label: "Elementos monitoreados", value: "4" },
            { label: "Alertas activas", value: "12" },
            { label: "Última actualización", value: "2 min" },
          ],
        },
      },
      {
        id: "overview",
        label: "Resumen",
        description: "Estadísticas generales",
        content: {
          title: "Resumen General",
          description:
            "Vista consolidada de todos los indicadores clave de rendimiento y estado de los elementos naturales.",
          features: [
            "KPIs consolidados",
            "Tendencias semanales",
            "Comparativas mensuales",
            "Alertas críticas",
          ],
          stats: [
            { label: "Eficiencia global", value: "87%" },
            { label: "Eventos detectados", value: "156" },
            { label: "Precisión", value: "94%" },
          ],
        },
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
        content: {
          title: "Monitoreo Satelital de Incendios",
          description:
            "Detección temprana de focos de calor y seguimiento de incendios forestales usando imágenes satelitales de alta resolución.",
          features: [
            "Detección de focos",
            "Análisis multispectral",
            "Alertas tempranas",
            "Mapas de riesgo",
          ],
          stats: [
            { label: "Focos detectados", value: "23" },
            { label: "Área monitoreada", value: "2,450 km²" },
            { label: "Resolución", value: "10m" },
          ],
        },
      },
      {
        id: "terrain",
        label: "Terreno",
        description: "Vista topográfica",
        content: {
          title: "Análisis Topográfico",
          description:
            "Evaluación del terreno para predecir la propagación de incendios basada en elevación, pendiente y vegetación.",
          features: [
            "Modelo de elevación",
            "Análisis de pendientes",
            "Tipos de vegetación",
            "Rutas de evacuación",
          ],
          stats: [
            { label: "Elevación máx", value: "3,200m" },
            { label: "Pendiente prom", value: "15°" },
            { label: "Cobertura vegetal", value: "68%" },
          ],
        },
      },
      {
        id: "street",
        label: "Calles",
        description: "Vista de calles",
        content: {
          title: "Red Vial y Accesos",
          description:
            "Mapeo de calles y caminos para planificar rutas de emergencia y acceso de bomberos.",
          features: [
            "Rutas de emergencia",
            "Accesos vehiculares",
            "Puntos de agua",
            "Estaciones de bomberos",
          ],
          stats: [
            { label: "Rutas mapeadas", value: "847" },
            { label: "Accesos críticos", value: "34" },
            { label: "Tiempo respuesta", value: "12 min" },
          ],
        },
      },
    ],
  },
  {
    id: "water",
    icon: <IoIosWater />,
    label: "Water",
    subItems: [
      {
        id: "weather",
        label: "Clima",
        description: "Datos meteorológicos",
        content: {
          title: "Monitoreo Meteorológico",
          description:
            "Seguimiento de condiciones climáticas que afectan la disponibilidad y calidad del agua.",
          features: [
            "Precipitaciones",
            "Humedad relativa",
            "Temperatura",
            "Vientos",
          ],
          stats: [
            { label: "Precipitación anual", value: "856mm" },
            { label: "Humedad promedio", value: "72%" },
            { label: "Temperatura", value: "18°C" },
          ],
        },
      },
      {
        id: "population",
        label: "Población",
        description: "Densidad poblacional",
        content: {
          title: "Impacto Poblacional del Agua",
          description:
            "Análisis de cómo la disponibilidad de agua afecta a las comunidades y su distribución.",
          features: [
            "Densidad poblacional",
            "Consumo per cápita",
            "Acceso al agua",
            "Calidad del agua",
          ],
          stats: [
            { label: "Población servida", value: "84,520" },
            { label: "Consumo diario", value: "180 L/hab" },
            { label: "Cobertura", value: "94%" },
          ],
        },
      },
      {
        id: "environment",
        label: "Ambiente",
        description: "Datos ambientales",
        content: {
          title: "Impacto Ambiental del Agua",
          description:
            "Evaluación del estado de cuerpos de agua y su impacto en el ecosistema local.",
          features: [
            "Calidad del agua",
            "Biodiversidad",
            "Contaminantes",
            "Ecosistemas acuáticos",
          ],
          stats: [
            { label: "Índice de calidad", value: "8.2/10" },
            { label: "Especies monitoreadas", value: "67" },
            { label: "pH promedio", value: "7.1" },
          ],
        },
      },
    ],
  },
  {
    id: "wind",
    icon: <FaWind />,
    label: "Wind",
    collection: winds,
    subItems: [
      {
        id: "reports",
        label: "Reportes",
        description: "Informes detallados",
        content: {
          title: "Informes de Viento",
          description:
            "Reportes detallados sobre patrones de viento y su impacto en la generación de energía renovable.",
          features: [
            "Velocidad del viento",
            "Dirección predominante",
            "Ráfagas máximas",
            "Potencial energético",
          ],
          stats: [
            { label: "Velocidad promedio", value: "12 km/h" },
            { label: "Energía generada", value: "2.4 MWh" },
            { label: "Eficiencia", value: "76%" },
          ],
        },
      },
      {
        id: "charts",
        label: "Gráficos",
        description: "Visualizaciones",
        content: {
          title: "Visualización de Datos de Viento",
          description:
            "Gráficos interactivos y visualizaciones avanzadas de patrones de viento y generación energética.",
          features: [
            "Gráficos temporales",
            "Mapas de viento",
            "Rosa de vientos",
            "Predicciones",
          ],
          stats: [
            { label: "Datos procesados", value: "1.2M" },
            { label: "Precisión pronóstico", value: "91%" },
            { label: "Actualizaciones", value: "10 min" },
          ],
        },
      },
      {
        id: "trends",
        label: "Tendencias",
        description: "Análisis temporal",
        content: {
          title: "Tendencias del Viento",
          description:
            "Análisis de patrones históricos y tendencias futuras para optimizar la generación de energía eólica.",
          features: [
            "Análisis histórico",
            "Tendencias estacionales",
            "Predicciones ML",
            "Optimización",
          ],
          stats: [
            { label: "Años de datos", value: "15" },
            { label: "Incremento anual", value: "+3.2%" },
            { label: "Variabilidad", value: "±8%" },
          ],
        },
      },
    ],
  },
  {
    id: "earth",
    icon: <TbPlant />,
    label: "Earth",
    subItems: [
      {
        id: "date",
        label: "Fecha",
        description: "Filtrar por fecha",
        content: {
          title: "Análisis Temporal de la Tierra",
          description:
            "Seguimiento de cambios en la cobertura vegetal y uso del suelo a través del tiempo.",
          features: [
            "Series temporales",
            "Cambios estacionales",
            "Evolución del suelo",
            "Índices de vegetación",
          ],
          stats: [
            { label: "Periodo analizado", value: "2018-2024" },
            { label: "Imágenes procesadas", value: "3,247" },
            { label: "Cobertura vegetal", value: "68.4%" },
          ],
        },
      },
      {
        id: "category",
        label: "Categoría",
        description: "Filtrar por tipo",
        content: {
          title: "Categorización del Terreno",
          description:
            "Clasificación de diferentes tipos de terreno y cobertura para análisis especializado.",
          features: [
            "Clasificación automática",
            "Tipos de suelo",
            "Cobertura vegetal",
            "Uso urbano",
          ],
          stats: [
            { label: "Categorías", value: "12" },
            { label: "Precisión", value: "94.2%" },
            { label: "Área clasificada", value: "5,680 km²" },
          ],
        },
      },
    ],
  },
];

export const DashboardSidebar: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);

  const handleItemClick = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
    setActiveSubItem(null);
    setShowInfoPanel(false);
  };

  const handleSubItemClick = (subItemId: string) => {
    setActiveSubItem(subItemId);
    setShowInfoPanel(true);
  };

  const getActiveSubItemContent = () => {
    if (!activeItem || !activeSubItem) return null;

    const activeMenuItem = menuItems.find((item) => item.id === activeItem);
    if (!activeMenuItem?.subItems) return null;

    const activeSubMenuItem = activeMenuItem.subItems.find(
      (subItem) => subItem.id === activeSubItem
    );
    return activeSubMenuItem?.content || null;
  };

  useEffect(() => {
    console.log("FORMATTED", formattedMark(winds));
  }, []);

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
                      transform hover:scale-[1.02] hover:shadow-md relative
                      ${
                        activeSubItem === subItem.id
                          ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-opacity-50"
                          : "bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm mb-1">
                          {subItem.label}
                        </div>
                        {subItem.description && (
                          <div className="text-xs opacity-75">
                            {subItem.description}
                          </div>
                        )}
                      </div>
                      {subItem.content && (
                        <div className="flex items-center">
                          <span className="text-xs opacity-60 mr-1">Info</span>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activeSubItem === subItem.id
                                ? "bg-white animate-pulse"
                                : "bg-blue-400"
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
            </div>

            <Accordion2
              element="wind"
              marks={formattedMark(winds)}
              allowMultiple={true}
              defaultOpen={["filters"]}
            />

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

      {/* Information Panel */}
      {showInfoPanel && activeSubItem && (
        <div
          className="bg-nasa-secondary w-80 h-full rounded-md shadow-2xl ml-2 transform transition-all duration-500 ease-in-out
                     animate-in slide-in-from-right-5 fade-in-0 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          }}
        >
          <div className="relative p-6 h-full overflow-y-auto">
            {(() => {
              const content = getActiveSubItemContent();
              if (!content) return null;

              return (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-white text-xl font-bold mb-2 flex items-center">
                      <span className="mr-3 text-blue-400">
                        {menuItems.find((item) => item.id === activeItem)?.icon}
                      </span>
                      {content.title}
                    </h3>
                    <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {content.description}
                    </p>
                  </div>

                  {/* Features */}
                  {content.features && (
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                        Características
                      </h4>
                      <div className="space-y-2">
                        {content.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center text-gray-300 text-sm"
                          >
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  {content.stats && (
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                        Estadísticas
                      </h4>
                      <div className="space-y-3">
                        {content.stats.map((stat, index) => (
                          <div
                            key={index}
                            className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50"
                          >
                            <div className="text-blue-400 font-bold text-lg">
                              {stat.value}
                            </div>
                            <div className="text-gray-400 text-xs uppercase tracking-wide">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accordion Section */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                      Configuraciones Avanzadas
                    </h4>
                    <Accordion
                      items={[
                        {
                          id: "filters",
                          title: "Filtros de Datos",
                          icon: <FaEye />,
                          content: (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span>Filtro temporal</span>
                                <select className="bg-gray-700 text-white text-xs rounded px-2 py-1">
                                  <option>Último mes</option>
                                  <option>Últimos 3 meses</option>
                                  <option>Último año</option>
                                </select>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Mostrar solo activos</span>
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  defaultChecked
                                />
                              </div>
                            </div>
                          ),
                        },
                        {
                          id: "export",
                          title: "Opciones de Exportación",
                          icon: <FaDownload />,
                          content: (
                            <div className="space-y-2">
                              <button className="w-full text-left p-2 bg-gray-700/50 rounded text-xs hover:bg-gray-600/50 transition-colors">
                                Exportar como CSV
                              </button>
                              <button className="w-full text-left p-2 bg-gray-700/50 rounded text-xs hover:bg-gray-600/50 transition-colors">
                                Exportar como JSON
                              </button>
                              <button className="w-full text-left p-2 bg-gray-700/50 rounded text-xs hover:bg-gray-600/50 transition-colors">
                                Generar reporte PDF
                              </button>
                            </div>
                          ),
                        },
                        {
                          id: "analytics",
                          title: "Análisis Avanzado",
                          icon: <FaChartLine />,
                          content: (
                            <div className="space-y-2">
                              <div className="text-xs">
                                <p className="mb-2">
                                  Análisis predictivo disponible:
                                </p>
                                <ul className="space-y-1 text-gray-400">
                                  <li>• Tendencias futuras</li>
                                  <li>• Anomalías detectadas</li>
                                  <li>• Correlaciones</li>
                                </ul>
                              </div>
                            </div>
                          ),
                        },
                      ]}
                      allowMultiple={true}
                      defaultOpen={["filters"]}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                      <FaEye className="text-sm" />
                      Ver Detalles
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                      <FaDownload className="text-sm" />
                      Exportar Datos
                    </button>
                    <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                      <FaChartLine className="text-sm" />
                      Analizar
                    </button>
                  </div>
                </>
              );
            })()}

            {/* Close button */}
            <button
              onClick={() => {
                setShowInfoPanel(false);
                setActiveSubItem(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                         bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white
                         rounded-full transition-all duration-200 hover:scale-110 z-10"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
