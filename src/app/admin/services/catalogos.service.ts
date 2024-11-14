import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Catalogo, ApiResponse } from '../../interfaces/catalog.interface';
import { Category } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.apiUrl = `${environment.apiUrl}/catalogos`;
  }

  // Método para obtener los headers de autorización
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    
    if (isPlatformBrowser(this.platformId)) {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          return new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
        } else {
          // Si no hay token, agregamos un header por defecto
          return new HttpHeaders({
            'Content-Type': 'application/json'
          });
        }
      } catch (error) {
        console.error('Error accediendo al localStorage:', error);
        return headers;
      }
    }
    
    return headers;
  }
  
  // Método para obtener todos los catálogos
  getCatalogs(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  
  // Método para verificar si el usuario está autenticado
  private isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const token = localStorage.getItem('authToken');
        return !!token;
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        return false;
      }
    }
    return false;
  }
  
  // También deberías aplicar la verificación a los otros métodos
  getCatalog(id: number): Observable<Catalogo> {
    return this.http.get<Catalogo>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  
  createCatalog(formData: FormData): Observable<Catalogo> {
    if (!this.isAuthenticated()) {
      return throwError(() => new Error('No autorizado. Por favor inicie sesión.'));
    }
  
    return this.http.post<Catalogo>(this.apiUrl, formData, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  updateCatalog(id: number, formData: FormData): Observable<Catalogo> {
    if (!this.isAuthenticated()) {
      return throwError(() => new Error('No autorizado. Por favor inicie sesión.'));
    }
  
    return this.http.put<Catalogo>(`${this.apiUrl}/${id}`, formData, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteCatalog(id: number): Observable<ApiResponse> {
    if (!this.isAuthenticated()) {
      return throwError(() => new Error('No autorizado. Por favor inicie sesión.'));
    }
  
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener URL completa de un archivo
  getFileUrl(path: string): string {
    if (!path) return '';
    
    // Limpia la ruta eliminando 'src' y convirtiendo backslashes a forward slashes
    const cleanPath = path
      .replace('src\\', '')
      .replace('src/', '')
      .replace(/\\/g, '/');
    
    // Obtén el token
    const headers = this.getAuthHeaders();
    const token = headers.get('Authorization')?.split(' ')[1] || '';
    
    // Construye la URL completa
    const fileUrl = `${environment.apiUrl}/${cleanPath}?token=${token}`;
    
    console.log('URL generada:', fileUrl); // Para debugging
    return fileUrl;
  }


  // Validar tipo de archivo
  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  // Validar tamaño de archivo (en MB)
  validateFileSize(file: File, maxSizeMB: number): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  }

  // Crear FormData con validaciones
  createFormDataWithValidation(catalog: {
    name: string,
    categoria_id: number,
    image?: File,
    pdf?: File
  }): FormData {
    const formData = new FormData();
    formData.append('name', catalog.name);
    formData.append('categoria_id', catalog.categoria_id.toString());

    if (catalog.image) {
      if (!this.validateFileType(catalog.image, ['image/jpeg', 'image/png', 'image/gif'])) {
        throw new Error('Tipo de imagen no válido. Use JPG, PNG o GIF.');
      }
      if (!this.validateFileSize(catalog.image, 5)) {
        throw new Error('La imagen excede el tamaño máximo de 5MB.');
      }
      formData.append('image', catalog.image);
    }

    if (catalog.pdf) {
      if (!this.validateFileType(catalog.pdf, ['application/pdf'])) {
        throw new Error('El archivo debe ser un PDF.');
      }
      if (!this.validateFileSize(catalog.pdf, 10)) {
        throw new Error('El PDF excede el tamaño máximo de 10MB.');
      }
      formData.append('pdf', catalog.pdf);
    }

    return formData;
  }

  // Manejo de errores HTTP
 // Manejo de errores HTTP
private handleError(error: any) {
  let errorMessage = 'Error desconocido';
  
  if (error instanceof HttpErrorResponse) {
    // Error del lado del servidor
    switch (error.status) {
      case 401:
        errorMessage = 'Sesión expirada o token inválido. Por favor inicie sesión nuevamente.';
        break;
      case 403:
        errorMessage = 'No tiene permisos para realizar esta acción.';
        break;
      case 404:
        errorMessage = 'Recurso no encontrado.';
        break;
      case 500:
        errorMessage = 'Error interno del servidor.';
        break;
      default:
        errorMessage = `Error del servidor: ${error.status}, ${error.message}`;
    }

    // Si hay un mensaje específico del servidor, úsalo
    if (error.error?.message) {
      errorMessage = error.error.message;
    }
  } else {
    // Error del lado del cliente
    errorMessage = error.message || 'Error de red o cliente desconocido';
  }
  
  console.error('Error en CatalogService:', errorMessage);
  return throwError(() => new Error(errorMessage));
}
}