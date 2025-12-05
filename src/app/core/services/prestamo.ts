import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/prestamos';

  // --- SOLICITAR PRÉSTAMO ---
  solicitar(libroId: number): Observable<any> {
    // No enviamos body -> el backend saca el usuario del token
    return this.http.post(
      `${this.apiUrl}/solicitar/${libroId}`,
      {},
      { responseType: 'text' }
    );
  }

  // --- LISTAR TODOS (ADMIN) ---
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todos`);
  }

  // --- MIS PRÉSTAMOS (USER) ---
  getMisPrestamos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mios`);
  }
}
