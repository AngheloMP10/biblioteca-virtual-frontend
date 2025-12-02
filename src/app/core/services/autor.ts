import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor'; // Asegúrate de que este modelo exista

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/autores';

  // --- OBTENER TODOS ---
  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  // --- ELIMINAR ---
  delete(id: number): Observable<any> {
    // { responseType: 'text' } para que Angular acepte la respuesta string del backend
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // --- OBTENER POR ID (Lo usarás para Editar) ---
  getById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${id}`);
  }

  // --- CREAR (Lo usarás en el Formulario) ---
  create(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  // --- ACTUALIZAR (Lo usarás en el Formulario) ---
  update(id: number, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${id}`, autor);
  }
}
