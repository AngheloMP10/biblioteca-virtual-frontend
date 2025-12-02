import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/libros';

  // --- OBTENER TODOS ---
  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  // --- OBTENER POR ID (Para Editar) ---
  getById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  // --- CREAR ---
  // El objeto 'libro' debe incluir { genero: {...}, autores: [...] }
  create(libro: any): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // --- ACTUALIZAR ---
  update(id: number, libro: any): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  // --- ELIMINAR ---
  delete(id: number): Observable<any> {
    // Usamos 'text' para que Angular no falle si la respuesta viene vacía o es texto plano
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
