'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { Menu, User } from 'lucide-react'

interface AdminHeaderProps {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}

export default function AdminHeader({ onToggleSidebar, sidebarOpen = true }: AdminHeaderProps) {
  const { user } = useAuth()
  const [showTooltip, setShowTooltip] = useState(false)

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:opacity-80 transition-opacity"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              Beca 18 - Programa de Beca
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:block bg-white/20 hover:bg-white/30 px-3 lg:px-4 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base">
              Ver como usuario
            </button>

            <div className="relative">
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
              </button>

              {showTooltip && (
                <div className="absolute top-full right-0 mt-2 bg-white text-foreground rounded-lg shadow-lg border border-secondary p-4 min-w-[200px] z-50">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rol:</p>
                      <p className="font-semibold">Administrador</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Usuario:</p>
                      <p className="font-semibold">{user?.email}</p>
                    </div>
                    <div className="border-t border-secondary pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-danger/10 hover:text-danger rounded transition-colors"
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