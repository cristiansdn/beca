'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
type UserRole = 'admin' | 'user' | null

interface UserProfile {
  nombres: string | null
  apellido_paterno: string | null
  apellido_materno: string | null
  email: string
  role: string
}

const AuthContext = createContext<{
  user: User | null
  userRole: UserRole
  userProfile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}>({
  user: null,
  userRole: null,
  userProfile: null,
  loading: true,
  signOut: async () => { },
})


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSessionAndRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)

        if (session?.user) {
const { data: profile, error } = await supabase
  .from('profiles')
  .select('nombres, apellido_paterno, apellido_materno, email')
  .eq('id', session.user.id)
  .single()

console.log('Profile data:', profile)
console.log('Profile error:', error)


          setUserRole('admin')
          setUserProfile({
            nombres: (profile as any)?.nombres,
            apellido_paterno: (profile as any)?.apellido_paterno,
            apellido_materno: (profile as any)?.apellido_materno,
            email: (profile as any)?.email,
            role: (profile as any)?.roles?.name || 'user'
          })


        } else {
          setUserRole(null)
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    getSessionAndRole()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nombres, apellido_paterno, apellido_materno, email, roles!role_id(name)')
            .eq('id', session.user.id)
            .single()

          setUserRole((profile as any)?.roles?.name || 'user')
          setUserProfile({
            nombres: (profile as any)?.nombres,
            apellido_paterno: (profile as any)?.apellido_paterno,
            apellido_materno: (profile as any)?.apellido_materno,
            email: (profile as any)?.email,
            role: (profile as any)?.roles?.name || 'user'
          })


        } else {
          setUserProfile(null)

        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])


  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setUserRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, userRole, userProfile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )

}




export const useAuth = () => useContext(AuthContext)
