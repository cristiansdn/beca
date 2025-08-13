'use client'
import { useRouter } from 'next/navigation'

export default function Convocatorias() {
  const router = useRouter()

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-primary/10">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Gestión de Convocatorias</h2>
      
      <div className="flex justify-center">
        <button
          onClick={() => router.push('/front-end/admin/gestion/etapas')}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium cursor-pointer"
        >
          Ir a Gestión de Etapas
        </button>
      </div>
    </div>
  )
}