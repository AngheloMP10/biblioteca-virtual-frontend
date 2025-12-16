import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../../core/services/prestamo';
import { AlertService } from '../../../core/services/alert';
import { Prestamo } from '../../../core/models/prestamo';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prestamo-list.html',
  styleUrls: ['./prestamo-list.css'],
})
export class PrestamoListComponent implements OnInit {
  private prestamoService = inject(PrestamoService);
  private alertService = inject(AlertService);

  prestamos: Prestamo[] = [];

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    this.prestamoService.getAll().subscribe({
      next: (data) => {
        // Los PENDIENTES primero
        this.prestamos = data.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('Error al cargar préstamos', err);
        this.alertService.error('Error', 'No se pudieron cargar los préstamos');
      },
    });
  }

  // Convertimos el método a ASYNC para usar await cómodamente
  async aprobar(id: number) {
    const confirmado = await this.alertService.confirmRequest(
      '¿Aprobar préstamo?',
      'El libro dejará de estar disponible.'
    );

    if (confirmado) {
      this.prestamoService.aprobar(id).subscribe({
        next: () => {
          this.alertService.success(
            'Préstamo aprobado',
            'El préstamo fue aprobado correctamente'
          );
          this.cargarPrestamos();
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('Error', 'No se pudo aprobar el préstamo');
        },
      });
    }
  }

  // Convertimos el método a ASYNC para usar await cómodamente
  async rechazar(id: number) {
    const confirmado = await this.alertService.confirmRequest(
      '¿Rechazar solicitud?',
      'Esta acción rechazará la solicitud de préstamo.'
    );

    if (confirmado) {
      this.prestamoService.rechazar(id).subscribe({
        next: () => {
          this.alertService.success(
            'Solicitud rechazada',
            'La solicitud fue rechazada correctamente'
          );
          this.cargarPrestamos();
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('Error', 'No se pudo rechazar la solicitud');
        },
      });
    }
  }
}
