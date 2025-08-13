'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'

interface ProfileData {
  nombres: string
  apellido_paterno: string
  apellido_materno: string
  dni: string
  numero_celular: string
  email: string
  role: string
}

export default function Perfil() {
  const { user, userProfile } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData>({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    dni: '',
    numero_celular: '',
    email: '',
    role: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user && userProfile) {
      loadProfile()
    }
  }, [user, userProfile])

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('nombres, apellido_paterno, apellido_materno, dni, numero_celular, email')
        .eq('id', user?.id)
        .single()

      if (error) {
        console.error('Error loading profile:', error)
        setMessage('Error al cargar el perfil')
      } else {
        setProfileData({
          nombres: data?.nombres || '',
          apellido_paterno: data?.apellido_paterno || '',
          apellido_materno: data?.apellido_materno || '',
          dni: data?.dni || '',
          numero_celular: data?.numero_celular || '',
          email: data?.email || user?.email || '',
          role: 'admin' // Hardcoded por ahora
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error al cargar el perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    console.log('Intentando actualizar perfil para usuario:', user?.id)
    console.log('Datos a actualizar:', {
      nombres: profileData.nombres,
      apellido_paterno: profileData.apellido_paterno,
      apellido_materno: profileData.apellido_materno,
      dni: profileData.dni,
      numero_celular: profileData.numero_celular
    })

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          nombres: profileData.nombres,
          apellido_paterno: profileData.apellido_paterno,
          apellido_materno: profileData.apellido_materno,
          dni: profileData.dni,
          numero_celular: profileData.numero_celular
        })
        .eq('id', user?.id)
        .select()

      console.log('Respuesta de Supabase:', { data, error })

      if (error) {
        console.error('Error updating profile:', error)
        setMessage(`Error al actualizar el perfil: ${error.message}`)
      } else {
        console.log('Perfil actualizado exitosamente:', data)
        setMessage('Perfil actualizado correctamente')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error al actualizar el perfil')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-primary/10">
        <div className="text-center">Cargando perfil...</div>
      </div>
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-primary/10">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Perfil de Usuario</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombres *
          </label>
          <input
            type="text"
            value={profileData.nombres}
            onChange={(e) => handleInputChange('nombres', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ingrese sus nombres"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido Paterno *
          </label>
          <input
            type="text"
            value={profileData.apellido_paterno}
            onChange={(e) => handleInputChange('apellido_paterno', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ingrese su apellido paterno"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido Materno *
          </label>
          <input
            type="text"
            value={profileData.apellido_materno}
            onChange={(e) => handleInputChange('apellido_materno', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ingrese su apellido materno"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DNI *
          </label>
          <input
            type="text"
            value={profileData.dni}
            onChange={(e) => handleInputChange('dni', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ingrese su DNI"
            maxLength={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Celular *
          </label>
          <input
            type="text"
            value={profileData.numero_celular}
            onChange={(e) => handleInputChange('numero_celular', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ingrese su número de celular"
            maxLength={9}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={profileData.email}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rol
          </label>
          <input
            type="text"
            value={profileData.role}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
            readOnly
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium cursor-pointer disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  )
}