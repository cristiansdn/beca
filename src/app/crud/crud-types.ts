export interface Area {
  id_area: number
  nombreArea: string
}

export interface Empleado {
  id_empleado: number
  nombre: string
  apellido: string | null
  correo: string | null
  telefono: string | null
  id_area: number | null
  area?: Area
}

export interface EmpleadoForm {
  nombre: string
  apellido: string
  correo: string
  telefono: string
  id_area: number | null
}
