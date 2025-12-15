import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  // Inyecta HttpClient
  private http = inject(HttpClient);

  // URL base de la API
  private apiUrl = `${environment.apiUrl}/autores`;

  // Obtiene todos los autores
  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  // Elimina un autor por ID
  // responseType 'text' para aceptar respuesta string del backend
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // Obtiene un autor específico por ID
  getById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuevo autor
  create(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  // Actualiza un autor existente
  update(id: number, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${id}`, autor);
  }
}
