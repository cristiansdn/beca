import { supabase } from '@/lib/supabase'
import { Empleado, Area, EmpleadoForm } from './crud-types'

// Obtener todas las áreas
export const getAreas = async (): Promise<Area[]> => {
  const { data, error } = await supabase
    .from('area')
    .select('*')
    .order('nombreArea')
  
  if (error) throw error
  return data || []
}

// Obtener todos los empleados (sin join por ahora)
export const getEmpleados = async (): Promise<Empleado[]> => {
  console.log('Ejecutando getEmpleados...')
  
  const { data, error } = await supabase
    .from('empleados')
    .select('*')
    .order('nombre')
  
  console.log('Resultado de Supabase:', { data, error })
  
  if (error) {
    console.error('Error en getEmpleados:', error)
    throw error
  }
  
  return data || []
}

// Crear empleado
export const createEmpleado = async (empleado: EmpleadoForm): Promise<Empleado> => {
  const { data, error } = await supabase
    .from('empleados')
    .insert(empleado)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar empleado
export const updateEmpleado = async (id: number, empleado: EmpleadoForm): Promise<Empleado> => {
  const { data, error } = await supabase
    .from('empleados')
    .update(empleado)
    .eq('id_empleado', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar empleado
export const deleteEmpleado = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('empleados')
    .delete()
    .eq('id_empleado', id)
  
  if (error) throw error
}
