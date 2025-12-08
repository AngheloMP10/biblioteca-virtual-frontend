import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todos`);
  }

  // MIS PRÉSTAMOS (USER)
  getMisPrestamos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mios`);
  }
}
