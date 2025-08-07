'use client'
import { useState, useEffect } from 'react'
import { getEmpleados, deleteEmpleado } from './crud-services'
import { Empleado } from './crud-types'

interface Props {
  onEdit: (empleado: Empleado) => void
  refreshTrigger: number
  onRefresh: () => void
}

export default function CrudEmpleados({ onEdit, refreshTrigger, onRefresh }: Props) {
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEmpleados()
  }, [refreshTrigger])

  const loadEmpleados = async () => {
    try {
      setLoading(true)
      const data = await getEmpleados()
      setEmpleados(data)
    } catch (error) {
      console.error('Error loading empleados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      try {
        await deleteEmpleado(id)
        onRefresh()
      } catch (error) {
        console.error('Error deleting empleado:', error)
      }
    }
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
              <td className="py-3 px-4">{empleado.area?.nombre || '-'}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(empleado)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(empleado.id_empleado)}
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
    </div>
  )
}
