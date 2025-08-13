'use client'
import { useState, useEffect, useRef } from 'react'
import { useRole } from '@/hooks/useRole'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { Menu, User } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface AdminHeaderProps {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}

export default function AdminHeader({ onToggleSidebar, sidebarOpen = true }: AdminHeaderProps) {
  const { user, userProfile } = useAuth()
  const { role, loading: roleLoading } = useRole()
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { signOut } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false)
      }
    }

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTooltip])

  const handleLogout = async () => {
    try {
      await signOut()
      
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }


  return (
    <header className="bg-primary text-white shadow-lg z-50 w-full">

      <div className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 h-[73px] lg:h-[81px] flex items-center">

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold hidden sm:block">
              Beca 18 - Programa de Beca
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:block bg-white/20 hover:bg-white/30 px-3 lg:px-4 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base">
              Ver como usuario
            </button>

            <div className="relative" ref={tooltipRef}>
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 cursor-pointer transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
              </button>

              {showTooltip && (
                <div className="absolute top-full right-0 mt-2 bg-white text-foreground rounded-lg shadow-lg border border-secondary min-w-[200px] p-4 z-50">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nombre:</p>
                      <p className="font-semibold">{userProfile?.nombres + ' ' + userProfile?.apellido_paterno + ' ' + userProfile?.apellido_materno}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rol:</p>
                      <p className="font-semibold">
                        {roleLoading ? 'Cargando...' : role || 'Usuario'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Usuario:</p>
                      <p className="font-semibold">{user?.email}</p>
                    </div>
                    <div className="border-t border-secondary pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-danger/10 hover:text-danger rounded transition-colors cursor-pointer"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}