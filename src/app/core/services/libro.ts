import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  // Inyecta HttpClient
  private http = inject(HttpClient);

  // URL base de la API
  private apiUrl = `${environment.apiUrl}/libros`;

  // Obtiene todos los libros
  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  // Obtiene un libro por su ID
  getById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuevo libro
  // El objeto 'libro' debe incluir { genero: {...}, autores: [...] }
  create(libro: any): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // Actualiza un libro existente
  update(id: number, libro: any): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  // Elimina un libro por su ID
  // responseType 'text' para manejar respuestas vacías o texto plano
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
