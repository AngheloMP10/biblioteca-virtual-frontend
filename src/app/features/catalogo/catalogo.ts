import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../core/services/libro';
import { PrestamoService } from '../../core/services/prestamo';
import { AlertService } from '../../core/services/alert';
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
  librosOriginales: Libro[] = []; // Copia de seguridad

  loading: boolean = true;
  terminoBusqueda: string = ''; // Texto del buscador

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getAll().subscribe({
      next: (data) => {
        this.librosOriginales = data;
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

  // Buscador
  filtrarLibros(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();

    if (!termino) {
      // Si el input está vacío, se restaura la lista original
      this.libros = [...this.librosOriginales];
      return;
    }

    // Filtrar por Título, Género o Autor
    this.libros = this.librosOriginales.filter((libro) => {
      const titulo = libro.titulo.toLowerCase();
      const genero = libro.genero?.nombre.toLowerCase() || '';

      const autor = libro.autores?.some((a) =>
        a.nombre.toLowerCase().includes(termino)
      );

      return titulo.includes(termino) || genero.includes(termino) || autor;
    });
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
