import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = 'http://localhost:3001/api/catalogos'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los catálogos
  getCatalogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un catálogo por ID
  getCatalog(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo catálogo (con imagen y PDF)
  createCatalog(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  // Actualizar un catálogo existente (con imagen y PDF)
  updateCatalog(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  // Eliminar un catálogo
  deleteCatalog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getCatalogos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
