'use client'
import { useAuth } from '@/context/AuthContext'

export const useRole = () => {
  const { userRole, loading } = useAuth()
  
  return {
    isAdmin: userRole === 'admin',
    isUser: userRole === 'user',
    role: userRole,
    loading
  }
}
