import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../core/services/libro';
import { PrestamoService } from '../../core/services/prestamo';
import { AlertService } from '../../core/services/alert';
import { PageResponse } from '../../core/models/page-response';
import { Libro } from '../../core/models/libro';
import { TokenStorageService } from '../../core/services/token-storage.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent implements OnInit {
  private libroService = inject(LibroService);
  private prestamoService = inject(PrestamoService);
  private alertService = inject(AlertService);
  private tokenStorage = inject(TokenStorageService);

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

  activeLoansCount: number = 0;
  maxLoans: number = 3;

  loadingPrestamoId: number | null = null;

  ngOnInit(): void {
    this.cargarLibros();
    this.calcularCupoDisponible();
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

  // Cálculo de cupo
  calcularCupoDisponible(): void {
    this.prestamoService.getMisPrestamos().subscribe({
      next: (prestamos) => {
        const activos = prestamos.filter(
          (p) => p.estado !== 'FINALIZADO' && p.estado !== 'RECHAZADO',
        );
        this.activeLoansCount = activos.length;
      },
      error: () => {
        this.activeLoansCount = 0;
      },
    });
  }

  get cuposDisponibles(): number {
    return this.maxLoans - this.activeLoansCount;
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
    if (this.cuposDisponibles <= 0) {
      this.alertService.error(
        'Límite alcanzado',
        'Ya tienes 3 libros en proceso. Devuelve uno para solicitar otro.',
      );
      return;
    }

    const confirmado = await this.alertService.confirmRequest(
      'Confirmar préstamo',
      `¿Deseas solicitar el préstamo del libro "${libro.titulo}"?`,
    );

    if (!confirmado) return;

    this.loadingPrestamoId = libro.id;

    this.prestamoService.solicitar(libro.id).subscribe({
      next: () => {
        this.alertService.success(
          'Solicitud enviada',
          'La solicitud fue enviada con éxito.',
        );

        this.activeLoansCount++;
        this.cargarLibros();
      },

      error: (err) => {
        this.alertService.error(
          'Error',
          err?.error || 'Error al solicitar el préstamo',
        );
      },

      complete: () => {
        this.loadingPrestamoId = null;
      },
    });
  }

  get isUser(): boolean {
    return localStorage.getItem('role') === 'ROLE_USER';
  }

  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_ADMIN';
  }

  get usuarioNombre(): string {
    return localStorage.getItem('username') || 'Usuario';
  }
}
