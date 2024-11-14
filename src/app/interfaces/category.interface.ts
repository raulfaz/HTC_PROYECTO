 export interface Category {
    id: number;
    nombre: string;    // Mantenemos el nombre como en la BD
    descripcion?: string; // Opcional ya que no lo mostraremos
  }