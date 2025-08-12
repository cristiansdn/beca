'use client'
import { useRole } from '@/hooks/useRole'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'user'
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = 'admin' 
}: ProtectedRouteProps) {
  const { role, loading } = useRole()
  const router = useRouter()

  useEffect(() => {
    if (!loading && role !== requiredRole) {
      router.push('/front-end/admin/login')
    }
  }, [role, loading, requiredRole, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Verificando permisos...</div>
      </div>
    )
  }

  if (role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
