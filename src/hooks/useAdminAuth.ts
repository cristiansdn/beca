'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAdminAuth = () => {
  const { user, userRole, loading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || userRole !== 'admin')) {
      router.push('/front-end/admin/login')
    }

  }, [user, userRole, loading, router])

  return { user, loading }
}
