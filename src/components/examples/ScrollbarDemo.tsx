import React from "react";

export const ScrollbarDemo = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        🎨 Scrollbar Styles Demo - Dark Theme
      </h2>

      {/* Demo 1: Default Custom Scroll */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">Default Custom Scroll</h3>
        <div className="bg-gray-900/50 rounded-md p-4 h-32 overflow-auto">
          <div className="h-64 space-y-2">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="text-gray-300 text-sm p-2 bg-gray-700/30 rounded"
              >
                Elemento {i + 1} - Este contenido hace scroll con el tema dark
                elegante
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo 2: Accordion Scroll */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">
          Accordion Scroll (Blue Theme)
        </h3>
        <div className="bg-gray-900/50 rounded-md p-4 h-32 overflow-auto accordion-scroll">
          <div className="h-64 space-y-2">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className="text-blue-300 text-sm p-2 bg-blue-900/20 rounded border border-blue-700/30"
              >
                📊 Item {i + 1} - Scroll azul para componentes especiales como
                Accordion
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo 3: Ultra Thin Custom Scroll */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">
          Ultra Thin Custom Scroll
        </h3>
        <div className="bg-gray-900/50 rounded-md p-4 h-32 overflow-auto custom-scroll">
          <div className="h-64 space-y-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="text-purple-300 text-sm p-2 bg-purple-900/20 rounded"
              >
                ⚡ Item {i + 1} - Scroll ultra delgado para modales y paneles
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo 4: Horizontal Scroll */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">Horizontal Scroll</h3>
        <div className="bg-gray-900/50 rounded-md p-4 overflow-x-auto custom-scroll">
          <div className="flex space-x-4 w-max">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-700 to-gray-800 text-white text-sm p-4 rounded-lg min-w-[200px] border border-gray-600"
              >
                <h4 className="font-semibold">Card {i + 1}</h4>
                <p className="text-gray-300 text-xs mt-1">
                  Contenido de la tarjeta con scroll horizontal
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h4 className="text-blue-400 font-semibold mb-2">
          📝 Estilos Aplicados:
        </h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>
            •{" "}
            <code className="bg-gray-700 px-2 py-1 rounded text-xs">
              width: 6px
            </code>{" "}
            - Scrollbars delgados por defecto
          </li>
          <li>
            •{" "}
            <code className="bg-gray-700 px-2 py-1 rounded text-xs">
              .custom-scroll
            </code>{" "}
            - Ultra delgado (4px) para componentes
          </li>
          <li>
            •{" "}
            <code className="bg-gray-700 px-2 py-1 rounded text-xs">
              .accordion-scroll
            </code>{" "}
            - Azul (3px) para accordions
          </li>
          <li>
            • <strong>Gradients:</strong> Efectos de profundidad con sombras
          </li>
          <li>
            • <strong>Hover effects:</strong> Cambios de color al pasar el mouse
          </li>
          <li>
            • <strong>Firefox compatible:</strong> Funciona en todos los
            navegadores
          </li>
        </ul>
      </div>
    </div>
  );
};
