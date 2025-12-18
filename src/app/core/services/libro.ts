import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private http = inject(HttpClient);

  // Base API
  private apiUrl = environment.apiUrl;

  // Libros

  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/libros`);
  }

  getById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/libros/${id}`);
  }

  create(libro: any): Observable<Libro> {
    return this.http.post<Libro>(`${this.apiUrl}/libros`, libro);
  }

  update(id: number, libro: any): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/libros/${id}`, libro);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/libros/${id}`, {
      responseType: 'text',
    });
  }

  // Media

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ url: string }>(
      `${this.apiUrl}/media/upload`,
      formData
    );
  }
}