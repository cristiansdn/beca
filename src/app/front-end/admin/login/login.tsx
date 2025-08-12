'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      } else if (error.message.includes('Email not confirmed')) {
        setError('Por favor confirma tu email antes de iniciar sesión.')
      } else {
        setError(error.message)
      }
    } else {

      const { data: { user: currentUser } } = await supabase.auth.getUser()

      const { data: profile, error: profileError } = await supabase
        .rpc('get_user_role')




      console.log('Profile data:', profile) // Para debug
      console.log('Profile error:', profileError) // Para debug


      if (profile === 'admin') {
        router.push('/front-end/admin/bandeja')
      } else {
        setError('No tienes permisos de administrador')
        await supabase.auth.signOut()
      }

    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="max-w-md w-full space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && (
          <div className="text-danger text-sm text-center">{error}</div>

        )}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 cursor-pointer"

        >
          {loading ? 'Iniciando sesión....' : 'Iniciar Sesión'}

        </button>
      </form>
    </div>
  )
}
