'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('User already registered')) {
        setError('Este email ya está registrado. Intenta iniciar sesión.')
      } else if (error.message.includes('Password should be at least')) {
        setError('La contraseña debe tener al menos 6 caracteres.')
      } else {
        setError(error.message)
      }
    } else {
      setMessage('¡Revisa tu email para el enlace de verificación!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignUp} className="max-w-md w-full space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center">Registrarse</h1>
        
        {error && (
          <div className="text-danger text-sm text-center">{error}</div>
        )}
        
        {message && (
          <div className="text-success text-sm text-center">{message}</div>
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
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
          minLength={6}
          required
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50"
        >
          {loading ? 'Registrando ...' : 'Registrarse'}
        </button>
        
        <p className="text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/front-end/login" className="text-primary hover:underline">
            Iniciar sesión aquí
          </Link>
        </p>
      </form>
    </div>
  )
}
