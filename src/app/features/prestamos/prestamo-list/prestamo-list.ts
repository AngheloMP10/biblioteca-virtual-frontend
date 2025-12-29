import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../../core/services/prestamo';
import { AlertService } from '../../../core/services/alert';
import { Prestamo } from '../../../core/models/prestamo';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamo-list.html',
  styleUrls: ['./prestamo-list.css'],
})
export class PrestamoListComponent implements OnInit, AfterViewInit {
  private prestamoService = inject(PrestamoService);
  private alertService = inject(AlertService);

  prestamos: Prestamo[] = [];

  // Input de escaneo (QR / CÓDIGO)
  qrInput: string = '';

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  @ViewChild('qrField') qrField!: ElementRef;

  ngAfterViewInit() {
    this.qrField.nativeElement.focus();
  }

  cargarPrestamos(): void {
    this.prestamoService.getAll().subscribe({
      next: (data) => {
        this.prestamos = data.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('Error al cargar préstamos', err);
        this.alertService.error('Error', 'No se pudieron cargar los préstamos');
      },
    });
  }

  procesarEntrega(): void {
    if (!this.qrInput.trim()) return;

    const idPrestamo = this.qrInput.replace('PRESTAMO-', '');
    const id = Number(idPrestamo);

    if (isNaN(id)) {
      this.alertService.error('Error', 'Código QR inválido');
      this.qrInput = '';
      return;
    }

    const prestamo = this.prestamos.find((p) => p.id === id);

    if (!prestamo) {
      this.alertService.error(
        'No encontrado',
        `No se encuentra el préstamo ID: ${id}`
      );
      this.qrInput = '';
      return;
    }

    if (prestamo.estado !== 'APROBADO') {
      this.alertService.error(
        'Estado incorrecto',
        `Este préstamo está en estado ${prestamo.estado}`
      );
      this.qrInput = '';
      return;
    }

    this.confirmarEntrega(id, prestamo.libro.titulo, prestamo.usuario.username);
  }

  async confirmarEntrega(id: number, libro: string, usuario: string) {
    const confirmado = await this.alertService.confirmRequest(
      'Confirmar Entrega',
      `¿Entregar libro "${libro}" al usuario ${usuario}?`
    );

    if (confirmado) {
      this.prestamoService.entregar(id).subscribe({
        next: () => {
          this.alertService.success(
            'Entregado',
            'El libro está ahora EN PRÉSTAMO'
          );
          this.qrInput = '';
          this.cargarPrestamos();
          setTimeout(() => this.qrField.nativeElement.focus());
        },
        error: () =>
          this.alertService.error('Error', 'No se pudo registrar la entrega'),
      });
    }
  }

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
        error: () =>
          this.alertService.error('Error', 'No se pudo aprobar el préstamo'),
      });
    }
  }

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
        error: () =>
          this.alertService.error('Error', 'No se pudo rechazar la solicitud'),
      });
    }
  }

  async finalizar(id: number) {
    const confirmado = await this.alertService.confirmRequest(
      '¿Finalizar préstamo?',
      'El libro será devuelto y el stock se recuperará.'
    );

    if (confirmado) {
      this.prestamoService.finalizar(id).subscribe({
        next: () => {
          this.alertService.success(
            'Préstamo finalizado',
            'El libro fue devuelto correctamente'
          );
          this.cargarPrestamos();
        },
        error: () =>
          this.alertService.error('Error', 'No se pudo finalizar el préstamo'),
      });
    }
  }
}
