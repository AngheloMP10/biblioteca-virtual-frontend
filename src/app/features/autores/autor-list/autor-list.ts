import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AutorService } from '../../../core/services/autor';
import { AlertService } from '../../../core/services/alert';
import { Autor } from '../../../core/models/autor';

@Component({
  selector: 'app-autor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './autor-list.html',
  styleUrls: ['./autor-list.css'],
})
export class AutorListComponent implements OnInit {
  private autorService = inject(AutorService);
  private alertService = inject(AlertService);

  autores: Autor[] = [];

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.autorService.getAll().subscribe({
      next: (data) => {
        this.autores = data;
        console.log('Autores cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar autores:', err);
        this.alertService.error('Error', 'No se pudieron cargar los autores');
      },
    });
  }

  // Convertimos el método a ASYNC para usar await cómodamente
  async eliminarAutor(id: number) {
    const confirmado = await this.alertService.confirmRequest(
      '¿Estás seguro?',
      'Esta acción eliminará el autor permanentemente.'
    );

    if (confirmado) {
      this.autorService.delete(id).subscribe({
        next: () => {
          this.cargarAutores();
          this.alertService.success(
            'Eliminado',
            'El autor ha sido eliminado correctamente.'
          );
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.alertService.error(
            'Error',
            'No se pudo eliminar el autor (quizás tiene libros asociados).'
          );
        },
      });
    }
  }
}
