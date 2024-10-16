import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://tu-backend-url.com/api/products'; // Ajusta esta URL a la de tu backend

  constructor(private http: HttpClient) { }

  // Headers para incluir el token de autenticación
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  // Obtener un producto por ID
  getProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>(`getProduct id=${id}`))
      );
  }

  // Crear un nuevo producto
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('addProduct'))
      );
  }

  // Actualizar un producto existente
  updateProduct(product: any): Observable<any> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put(url, product, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('updateProduct'))
      );
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<any>('deleteProduct'))
      );
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Puedes agregar aquí lógica adicional para manejar errores, como mostrar notificaciones
      return new Observable<T>();
    };
  }
}