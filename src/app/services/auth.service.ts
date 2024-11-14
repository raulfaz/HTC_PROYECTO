import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Método para guardar el token
  saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Guarda en localStorage
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Obtiene el token desde localStorage
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken'); // Elimina el token al cerrar sesión
  }

  updateProfile(currentPassword: string, newPassword?: string, newUsername?: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(
      `${this.apiUrl}/update-credentials`,
      { currentPassword, newPassword, newUsername },
      { headers }
    );
  }
}