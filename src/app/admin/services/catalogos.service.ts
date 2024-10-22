import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Catalog, ApiResponse } from '../../interfaces/catalog.interface';

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

  // Método privado para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error && typeof error.error === 'object') {
      errorMessage = `Error: ${error.error.message || errorMessage}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Obtener todos los catálogos
  getCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Obtener un catálogo por ID
  getCatalog(id: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Crear un nuevo catálogo
  createCatalog(formData: FormData): Observable<Catalog> {
    return this.http.post<Catalog>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un catálogo existente
  updateCatalog(id: number, formData: FormData): Observable<Catalog> {
    return this.http.put<Catalog>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un catálogo
  deleteCatalog(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener URL completa de un archivo
  getFileUrl(path: string | null | undefined): string {
    if (!path) return '';
    
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Usar la base URL del environment
    return `${environment.apiUrl}/${path.replace(/^\/+/, '')}`;
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
  createFormData(name: string, image?: File, pdf?: File): FormData {
    const formData = new FormData();
    formData.append('name', name);

    if (image) {
      if (!this.validateFileType(image, ['image/jpeg', 'image/png', 'image/gif'])) {
        throw new Error('Tipo de imagen no válido. Use JPG, PNG o GIF.');
      }
      if (!this.validateFileSize(image, 5)) { // 5MB máximo
        throw new Error('La imagen excede el tamaño máximo de 5MB.');
      }
      formData.append('image', image);
    }

    if (pdf) {
      if (!this.validateFileType(pdf, ['application/pdf'])) {
        throw new Error('El archivo debe ser un PDF.');
      }
      if (!this.validateFileSize(pdf, 10)) { // 10MB máximo
        throw new Error('El PDF excede el tamaño máximo de 10MB.');
      }
      formData.append('pdf', pdf);
    }

    return formData;
  }

  
}
// En el frontend, añade logs para debug
// fetch(`${environment.apiUrl}/catalogos`)
//   .then(response => {
//     console.log('Respuesta recibida:', response);
//     return response.json();
//   })
//   .then(data => {
//     console.log('Datos:', data);
//   })
//   .catch(error => {
//     console.error('Error detallado:', error);
//   });