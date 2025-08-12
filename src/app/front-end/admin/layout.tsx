'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminHeader from './header/Header'
import Toolbar from './toolbar/Toolbar'
import Footer from './footer/Footer'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
            {children}
          </div>
        </main>

        <div className="sticky bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  )
}
