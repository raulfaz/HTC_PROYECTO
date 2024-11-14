export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Catalogo {
  id?: number;
  name: string;
  categoria_id: number;
  image_path?: string;
  pdf_path?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}