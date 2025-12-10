import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../../core/services/prestamo';
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
    });
  }

  aprobar(id: number): void {
    if (
      confirm('¿Aprobar este préstamo? El libro dejará de estar disponible.')
    ) {
      this.prestamoService.aprobar(id).subscribe(() => {
        alert('Préstamo Aprobado');
        this.cargarPrestamos();
      });
    }
  }

  rechazar(id: number): void {
    if (confirm('¿Rechazar solicitud?')) {
      this.prestamoService.rechazar(id).subscribe(() => {
        alert('Solicitud Rechazada');
        this.cargarPrestamos();
      });
    }
  }
}
