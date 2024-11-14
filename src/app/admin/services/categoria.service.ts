import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Categoria } from '../../interfaces/catalog.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Obtener el token de almacenamiento local con verificación de plataforma
  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Obtener las cabeceras con el token de autorización
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  // Obtener todas las categorías
  getCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Obtener una categoría por ID
  getCategory(id: number): Observable<Categoria> {
    const headers = this.getAuthHeaders();
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Crear nueva categoría
  createCategory(categoria: { nombre: string; descripcion?: string }): Observable<Categoria> {
    const headers = this.getAuthHeaders();
    return this.http.post<Categoria>(this.apiUrl, categoria, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una categoría
  updateCategory(id: number, categoria: { nombre: string; descripcion?: string }): Observable<Categoria> {
    const headers = this.getAuthHeaders();
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una categoría
  deleteCategory(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método mejorado para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor inicie sesión nuevamente';
          // Opcionalmente, aquí podrías disparar una acción para cerrar sesión
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('authToken');
          }
          break;
        case 403:
          errorMessage = 'Acceso denegado';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 422:
          errorMessage = 'Error de validación';
          if (error.error?.errors) {
            errorMessage += ': ' + Object.values(error.error.errors).join(', ');
          }
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.error?.message || 'Error desconocido'}`;
      }
    }

    console.error('Error en CategoriaService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}