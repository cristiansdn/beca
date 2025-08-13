'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home , Settings } from 'lucide-react'

export default function Toolbar() {
  const pathname = usePathname()
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
          <Link 
            href="/front-end/admin/dashboard"
            className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
              pathname === '/front-end/admin/dashboard' ? 'bg-primary text-white' : 'hover:bg-secondary/30'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Inicio</span>
          </Link>
          
          <Link 
            href="/front-end/admin/convocatorias"
            className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
              pathname === '/front-end/admin/convocatorias' ? 'bg-primary text-white' : 'hover:bg-secondary/30'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Gestionar Convocatorias</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
