'use client'

export default function Toolbar() {
  return (
    <div className="h-full flex flex-col">
      {/* Header del Sidenav */}
      <div className="px-4 py-3 lg:py-4 border-b border-primary/10 h-[73px] lg:h-[81px] flex items-center">

        <div className="flex items-center gap-3 w-full">
          <span className="text-2xl">🎓</span>
          <h1 className="text-lg font-bold text-primary">BecaYACHAY</h1>
        </div>
      </div>

      {/* Menú */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-secondary/30 rounded-lg transition-colors">
            <span className="text-xl">🏠</span>
            <span className="font-medium">Inicio</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-secondary/30 rounded-lg transition-colors">
            <span className="text-xl">⚙️</span>
            <span className="font-medium">Gestionar convocatoria</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
