import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../../core/services/libro';
import { AlertService } from '../../../core/services/alert';
import { PageResponse } from '../../../core/models/page-response';
import { Libro } from '../../../core/models/libro';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './libro-list.html',
  styleUrls: ['./libro-list.css'],
})
export class LibroListComponent implements OnInit {
  private libroService = inject(LibroService);
  private alertService = inject(AlertService);

  libros: Libro[] = [];

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getAll(0, 100).subscribe({
      next: (response: PageResponse<Libro>) => {
        this.libros = response.content;
        console.log('Libros cargados:', response.content);
      },
      error: (err) => {
        console.error('Error al cargar libros:', err);
        this.alertService.error('Error', 'No se pudieron cargar los libros');
      },
    });
  }

  async eliminarLibro(id: number) {
    const confirmado = await this.alertService.confirmRequest(
      '¿Estás seguro?',
      'Esta acción eliminará el libro permanentemente.'
    );

    if (!confirmado) {
      return;
    }

    this.libroService.delete(id).subscribe({
      next: () => {
        this.alertService.success(
          'Eliminado',
          'El libro ha sido eliminado correctamente.'
        );
        this.cargarLibros();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.alertService.error(
          'Error',
          'No se pudo eliminar el libro (quizás tiene autores asociados).'
        );
      },
    });
  }
}
