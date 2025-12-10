import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prestamo } from '../models/prestamo';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/prestamos`;

  // SOLICITAR PRÉSTAMO
  solicitar(libroId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/solicitar/${libroId}`,
      {},
      { responseType: 'text' }
    );
  }

  // LISTAR TODOS (ADMIN)
  getAll(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/todos`);
  }

  // MIS PRÉSTAMOS (USER)
  getMisPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/mios`);
  }

  // APROBAR
  aprobar(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/aprobar/${id}`,
      {},
      { responseType: 'text' }
    );
  }

  // RECHAZAR
  rechazar(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/rechazar/${id}`,
      {},
      { responseType: 'text' }
    );
  }
}
