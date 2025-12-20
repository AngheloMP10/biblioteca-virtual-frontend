import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../core/services/libro';
import { PrestamoService } from '../../core/services/prestamo';
import { AlertService } from '../../core/services/alert';
import { PageResponse } from '../../core/models/page-response';
import { Libro } from '../../core/models/libro';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent implements OnInit {
  private libroService = inject(LibroService);
  private prestamoService = inject(PrestamoService);
  private alertService = inject(AlertService);

  libros: Libro[] = []; // Lista que se muestra

  // Paginación
  page: number = 0;
  size: number = 6;
  totalElements: number = 0;
  totalPages: number = 0;
  isFirst: boolean = false;
  isLast: boolean = false;

  loading: boolean = true;
  terminoBusqueda: string = ''; // Texto del buscador

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.loading = true;

    this.libroService
      .getAll(this.page, this.size, this.terminoBusqueda)
      .subscribe({
        next: (response: PageResponse<Libro>) => {
          this.libros = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.isFirst = response.first;
          this.isLast = response.last;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.alertService.error('Error', 'No se pudieron cargar los libros');
        },
      });
  }

  // Navegación
  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.cargarLibros();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.cargarLibros();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.cargarLibros();
  }

  // Buscador
  filtrarLibros(): void {
    this.page = 0;
    this.cargarLibros();
  }

  // Convertimos el método a ASYNC para usar await
  async solicitarPrestamo(libro: Libro) {
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
