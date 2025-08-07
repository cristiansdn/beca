'use client'
import { useState, useEffect } from 'react'
import { getAreas, createEmpleado, updateEmpleado } from './crud-services'
import { Empleado, Area, EmpleadoForm } from './crud-types'

interface Props {
  empleado: Empleado | null
  onClose: () => void
}

export default function CrudForm({ empleado, onClose }: Props) {
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
      const data = await getAreas()
      setAreas(data)
    } catch (error) {
      console.error('Error loading areas:', error)
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
              <option value="">Seleccionar área</option>
              {areas.map(area => (
                <option key={area.id_area} value={area.id_area}>
                  {area.nombre}
                </option>
              ))}
            </select>
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
