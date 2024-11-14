import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Usa la URL del environment
    this.apiUrl = `${environment.apiUrl}/formulario`;
  }

  getAllFormularios(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap((data: any) => console.log(data))
    );
  }

  getFormularioById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`); 
  }

  createFormulario(formulario: any): Observable<any> {
    return this.http.post(this.apiUrl, formulario);
  }

  updateFormulario(id: string, formulario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formulario);
  }

  deleteFormulario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

 
}