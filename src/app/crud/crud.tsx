'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Empleado, Area, EmpleadoForm } from './crud-types'
import { getEmpleados, deleteEmpleado, getAreas, createEmpleado, updateEmpleado } from './crud-services'

// Componente de tabla de empleados
function CrudEmpleados({ onEdit, refreshTrigger, onRefresh }: {
  onEdit: (empleado: Empleado) => void
  refreshTrigger: number
  onRefresh: () => void
}) {
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [loading, setLoading] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [empleadoToDelete, setEmpleadoToDelete] = useState<Empleado | null>(null)

  useEffect(() => {
    loadEmpleados()
  }, [refreshTrigger])

  const loadEmpleados = async () => {
    try {
      setLoading(true)
      console.log('Cargando empleados...')
      const data = await getEmpleados()
      console.log('Empleados cargados:', data)
      setEmpleados(data)
    } catch (error) {
      console.error('Error loading empleados:', error)
      alert('Error al cargar empleados: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (empleado: Empleado) => {
    setEmpleadoToDelete(empleado)
    setShowConfirmModal(true)
  }

  const handleConfirmDelete = async () => {
    if (empleadoToDelete) {
      try {
        await deleteEmpleado(empleadoToDelete.id_empleado)
        setShowConfirmModal(false)
        setEmpleadoToDelete(null)
        onRefresh()
      } catch (error) {
        console.error('Error deleting empleado:', error)
      }
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmModal(false)
    setEmpleadoToDelete(null)
  }

  if (loading) {
    return <div className="text-center py-8">Cargando empleados...</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-secondary">
            <th className="text-left py-3 px-4 font-semibold">Nombre</th>
            <th className="text-left py-3 px-4 font-semibold">Apellido</th>
            <th className="text-left py-3 px-4 font-semibold">Correo</th>
            <th className="text-left py-3 px-4 font-semibold">Teléfono</th>
            <th className="text-left py-3 px-4 font-semibold">Área</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id_empleado} className="border-b border-secondary/50 hover:bg-secondary/20">
              <td className="py-3 px-4">{empleado.nombre}</td>
              <td className="py-3 px-4">{empleado.apellido || '-'}</td>
              <td className="py-3 px-4">{empleado.correo || '-'}</td>
              <td className="py-3 px-4">{empleado.telefono || '-'}</td>
              <td className="py-3 px-4">{empleado.area?.nombreArea || '-'}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(empleado)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(empleado)}
                    className="bg-danger text-white px-3 py-1 rounded hover:bg-danger text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {empleados.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No hay empleados registrados
        </div>
      )}
      
      <ConfirmModal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        empleado={empleadoToDelete}
      />
    </div>
  )
}

// Componente modal de confirmación
function ConfirmModal({ isOpen, onConfirm, onCancel, empleado }: {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  empleado: Empleado | null
}) {
  if (!isOpen || !empleado) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-danger">⚠️</span>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Confirmar Eliminación
          </h2>
          
          <p className="text-muted-foreground mb-6">
            ¿Estás seguro de que deseas eliminar al empleado <br/>
            <strong className="text-foreground">{empleado.nombre} {empleado.apellido}</strong>?
            <br/><br/>
            Esta acción no se puede deshacer.
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 bg-secondary text-foreground py-3 rounded-lg hover:bg-secondary-hover font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-danger text-white py-3 rounded-lg hover:bg-danger font-semibold"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de formulario
function CrudForm({ empleado, onClose }: {
  empleado: Empleado | null
  onClose: () => void
}) {
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<EmpleadoForm>({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    id_area: null
  })

  useEffect(() => {
    loadAreas()
    if (empleado) {
      setFormData({
        nombre: empleado.nombre,
        apellido: empleado.apellido || '',
        correo: empleado.correo || '',
        telefono: empleado.telefono || '',
        id_area: empleado.id_area
      })
    }
  }, [empleado])

  const loadAreas = async () => {
    try {
      console.log('Cargando áreas...')
      const data = await getAreas()
      console.log('Áreas cargadas:', data)
      setAreas(data)
    } catch (error) {
      console.error('Error loading areas:', error)
      alert('Error al cargar áreas: ' + error.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (empleado) {
        await updateEmpleado(empleado.id_empleado, formData)
      } else {
        await createEmpleado(formData)
      }
      onClose()
    } catch (error) {
      console.error('Error saving empleado:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id_area' ? (value ? parseInt(value) : null) : value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {empleado ? 'Editar Empleado' : 'Nuevo Empleado'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Área</label>
            <select
              name="id_area"
              value={formData.id_area || ''}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Seleccionar área ({areas.length} disponibles)</option>
              {areas.map(area => (
                <option key={area.id_area} value={area.id_area}>
                  {area.nombreArea}
                </option>
              ))}
            </select>
            {areas.length === 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                No se encontraron áreas. Verifica la consola para más detalles.
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-hover disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-secondary text-foreground py-3 rounded-lg hover:bg-secondary-hover"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CrudPage() {
  const { user, loading } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingEmpleado, setEditingEmpleado] = useState<Empleado | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p>Debes iniciar sesión para acceder al CRUD</p>
        </div>
      </div>
    )
  }

  const handleCreate = () => {
    setEditingEmpleado(null)
    setShowForm(true)
  }

  const handleEdit = (empleado: Empleado) => {
    setEditingEmpleado(empleado)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingEmpleado(null)
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Gestión de Empleados
            </h1>
            <p className="text-muted-foreground">
              Administra la información de empleados y sus áreas
            </p>
          </div>
          <button
            onClick={async () => {
              const { supabase } = await import('@/lib/supabase')
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
            className="bg-danger text-white px-4 py-2 rounded-lg hover:bg-danger font-medium"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-primary/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Lista de Empleados
            </h2>
            <button
              onClick={handleCreate}
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-hover font-semibold transform hover:scale-105 transition-all duration-300"
            >
              + Nuevo Empleado
            </button>
          </div>

          <CrudEmpleados 
            onEdit={handleEdit}
            refreshTrigger={refreshTrigger}
            onRefresh={() => setRefreshTrigger(prev => prev + 1)}
          />
        </div>

        {showForm && (
          <CrudForm
            empleado={editingEmpleado}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  )
}
