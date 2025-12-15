import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../models/genero';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  // Inyecta HttpClient
  private http = inject(HttpClient);

  // URL base de la API
  private apiUrl = `${environment.apiUrl}/generos`;

  // Obtiene todos los géneros
  getAll(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.apiUrl);
  }

  // Obtiene un género por su ID
  getById(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuevo género
  create(genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(this.apiUrl, genero);
  }

  // Actualiza un género existente
  update(id: number, genero: Genero): Observable<Genero> {
    return this.http.put<Genero>(`${this.apiUrl}/${id}`, genero);
  }

  // Elimina un género por su ID
  // responseType 'text' para aceptar respuesta string del backend
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
