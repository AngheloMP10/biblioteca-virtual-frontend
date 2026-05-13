import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

import { PrestamoService } from '../../../core/services/prestamo';
import { Prestamo } from '../../../core/models/prestamo';
import { EstadoPrestamo } from '../../../core/models/prestamo';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, QRCodeComponent, RouterModule],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css',
})
export class MisPedidosComponent implements OnInit {
  private prestamoService = inject(PrestamoService);

  prestamos: Prestamo[] = [];

  ngOnInit(): void {
    this.cargarMisPrestamos();
  }

  cargarMisPrestamos(): void {
    this.prestamoService.getMisPrestamos().subscribe({
      next: (data) => (this.prestamos = data),
      error: (err) => console.error(err),
    });
  }

  getClassEstado(estado: EstadoPrestamo): string {
    switch (estado) {
      case 'APROBADO':
        return 'bg-success';
      case 'PENDIENTE':
        return 'bg-warning text-dark';
      case 'EN_PRESTAMO':
        return 'bg-primary';
      case 'RECHAZADO':
        return 'bg-danger';
      case 'FINALIZADO':
        return 'bg-secondary';
    }
  }
}
