'use client'
import { useRouter } from 'next/navigation'

export default function GestionSecciones() {
  const router = useRouter()

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-primary/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">Gestión de Secciones</h2>
        <button
          onClick={() => router.back()}
          className="bg-secondary text-foreground px-4 py-2 rounded-lg hover:bg-secondary-hover transition-colors cursor-pointer"
        >
          ← Atrás
        </button>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={() => router.push('/front-end/admin/gestion/contenido')}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium cursor-pointer"
        >
          Ir a Gestión de Contenido
        </button>
      </div>
    </div>
  )
}