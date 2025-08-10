'use client'
import { useState } from 'react'

export default function Toolbar() {
  const [isConvocatoriaOpen, setIsConvocatoriaOpen] = useState(false)
  const [isEtapaOpen, setIsEtapaOpen] = useState(false)

  return (
    <div className="h-full p-4 space-y-4">
      {/* Convocatoria Section */}
      <div>
        <h2 className="text-lg font-bold text-primary mb-3">Convocatoria</h2>
        
        <div>
          <button
            onClick={() => setIsConvocatoriaOpen(!isConvocatoriaOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-secondary/30 rounded-lg transition-colors"
          >
            <span>Beca 18 - 2025</span>
            <span className={`transform transition-transform ${isConvocatoriaOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>
          
          {isConvocatoriaOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <button
                onClick={() => setIsEtapaOpen(!isEtapaOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-secondary/30 rounded text-sm"
              >
                <span>Etapa de selección</span>
                <span className={`transform transition-transform ${isEtapaOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {isEtapaOpen && (
                <div className="ml-4 space-y-1">
                  <button className="block w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded">
                    Requisitos de postulación
                  </button>
                  <button className="block w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded">
                    Procedimiento de postulación
                  </button>
                  <button className="block w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded">
                    Cronograma
                  </button>
                  <button className="block w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded">
                    IES Elegibles
                  </button>
                  <button className="block w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded">
                    Criterios de puntaje
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-secondary/50"></div>

      {/* Gestión Admin Section */}
      <div>
        <h2 className="text-lg font-bold text-primary mb-3">Gestión Admin</h2>
        
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-secondary/30 rounded-lg transition-colors">
            <span>⚙️</span>
            <span>Gestionar convocatorias</span>
          </button>
        </div>
      </div>
    </div>
  )
}