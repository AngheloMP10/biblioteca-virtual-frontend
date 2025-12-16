import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../core/services/libro';
import { PrestamoService } from '../../core/services/prestamo';
import { AlertService } from '../../core/services/alert';
import { Libro } from '../../core/models/libro';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent implements OnInit {
  private libroService = inject(LibroService);
  private prestamoService = inject(PrestamoService);
  private alertService = inject(AlertService);

  libros: Libro[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getAll().subscribe({
      next: (data) => {
        this.libros = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.alertService.error('Error', 'No se pudieron cargar los libros');
      },
    });
  }

  // Convertimos el método a ASYNC para usar await cómodamente
  async solicitarPrestamo(libro: Libro) {
    // USAMOS EL SWEET ALERT
    const confirmado = await this.alertService.confirmRequest(
      'Confirmar préstamo',
      `¿Deseas solicitar el préstamo del libro "${libro.titulo}"?`
    );

    if (!confirmado) {
      return;
    }

    this.prestamoService.solicitar(libro.id).subscribe({
      next: () => {
        this.alertService.success(
          'Solicitud enviada',
          'La solicitud fue enviada con éxito. El administrador evaluará tu petición.'
        );
      },
      error: (err) => {
        console.error(err);
        this.alertService.error(
          'Error',
          err?.error || 'Error al solicitar el préstamo'
        );
      },
    });
  }
}
