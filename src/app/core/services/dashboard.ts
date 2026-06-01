import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { DashboardResponse } from '../models/dashboard-response';

import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.apiUrl}/dashboard`);
  }

  getDashboardPorFecha(
    fechaInicio: string,
    fechaFin: string,
  ): Observable<DashboardResponse> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    return this.http.get<DashboardResponse>(
      `${this.apiUrl}/dashboard/filtrar`,
      { params },
    );
  }

  exportarExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/dashboard/exportar`, {
      responseType: 'blob',
    });
  }
}
