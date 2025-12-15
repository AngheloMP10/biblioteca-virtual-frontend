import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prestamo } from '../models/prestamo';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  // Inyecta HttpClient
  private http = inject(HttpClient);

  // URL base de la API
  private apiUrl = `${environment.apiUrl}/prestamos`;

  // Solicita un préstamo de un libro específico
  // responseType 'text' para manejar respuesta vacía o texto plano
  solicitar(libroId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/solicitar/${libroId}`,
      {},
      { responseType: 'text' }
    );
  }

  // Obtiene todos los préstamos (solo para admin)
  getAll(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/todos`);
  }

  // Obtiene los préstamos del usuario actual
  getMisPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/mios`);
  }

  // Aprueba un préstamo por ID
  aprobar(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/aprobar/${id}`,
      {},
      { responseType: 'text' }
    );
  }

  // Rechaza un préstamo por ID
  rechazar(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/rechazar/${id}`,
      {},
      { responseType: 'text' }
    );
  }
}
