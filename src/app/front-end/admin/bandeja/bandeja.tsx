'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminHeader from '../header/Header'
import Toolbar from '../toolbar/Toolbar'
import Footer from '../footer/Footer'

export default function Bandeja() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/front-end/admin/login')
    }
  }, [user, loading, router])

useEffect(() => {
  const handleResize = () => {
    setSidebarOpen(window.innerWidth >= 1024)
  }
  
  handleResize()
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      {/* Sidebar - Toolbar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} fixed left-0 top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-xl border-r border-primary/10 shadow-lg overflow-hidden h-screen`}>
        <div className="w-80 h-full">
          <Toolbar />
        </div>
      </aside>


      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Header - Adjusts to sidebar width */}
        <div className={`fixed top-0 right-0 z-30 transition-all duration-300 ${sidebarOpen ? 'left-80' : 'left-0'}`}>
          <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        </div>

        <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-0 overflow-y-auto pt-[73px] lg:pt-[81px]">
          <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-primary/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 lg:mb-6">Panel de Administración</h2>
              <p className="text-muted-foreground mb-6 lg:mb-8 text-sm sm:text-base">
                Bienvenido al sistema de gestión de convocatorias Beca 18.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 lg:p-6 rounded-xl lg:rounded-2xl border border-primary/20">
                  <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">📋</div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2">Convocatorias</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm mb-3 lg:mb-4">Gestionar convocatorias activas</p>
                  <div className="text-xl lg:text-2xl font-bold text-primary">3</div>
                </div>

                <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 p-4 lg:p-6 rounded-xl lg:rounded-2xl border border-secondary">
                  <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">👥</div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2">Postulantes</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm mb-3 lg:mb-4">Total de postulaciones</p>
                  <div className="text-xl lg:text-2xl font-bold text-primary">1,247</div>
                </div>

                <div className="bg-gradient-to-br from-success/10 to-success/5 p-4 lg:p-6 rounded-xl lg:rounded-2xl border border-success/20 sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl lg:text-3xl mb-3 lg:mb-4">🎓</div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2">IES Activas</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm mb-3 lg:mb-4">Instituciones elegibles</p>
                  <div className="text-xl lg:text-2xl font-bold text-primary">89</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-primary/10">
              <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4">Acciones Rápidas</h3>
              <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                <button className="bg-primary text-white p-3 lg:p-4 rounded-lg lg:rounded-xl hover:bg-primary-hover transition-colors text-left">
                  <div className="text-lg lg:text-xl mb-2">➕</div>
                  <div className="font-semibold text-sm lg:text-base">Nueva Convocatoria</div>
                  <div className="text-xs lg:text-sm opacity-90">Crear una nueva convocatoria</div>
                </button>

                <button className="bg-secondary text-foreground p-3 lg:p-4 rounded-lg lg:rounded-xl hover:bg-secondary-hover transition-colors text-left">
                  <div className="text-lg lg:text-xl mb-2">📊</div>
                  <div className="font-semibold text-sm lg:text-base">Ver Reportes</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Generar reportes estadísticos</div>
                </button>
              </div>
            </div>
          </div>
        </main>

        <div className="sticky bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  )
}