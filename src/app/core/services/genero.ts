import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../models/genero';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/generos`;

  // OBTENER TODOS
  getAll(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.apiUrl);
  }

  // OBTENER POR ID (Para Editar)
  getById(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this.apiUrl}/${id}`);
  }

  // CREAR
  create(genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(this.apiUrl, genero);
  }

  // ACTUALIZAR
  update(id: number, genero: Genero): Observable<Genero> {
    return this.http.put<Genero>(`${this.apiUrl}/${id}`, genero);
  }

  // ELIMINAR
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
