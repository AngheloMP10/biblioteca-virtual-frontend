import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GeneroService } from '../../../core/services/genero';
import { AlertService } from '../../../core/services/alert';
import { Genero } from '../../../core/models/genero';

@Component({
  selector: 'app-genero-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './genero-list.html',
  styleUrls: ['./genero-list.css'],
})
export class GeneroListComponent implements OnInit {
  // Inyección de dependencias
  private generoService = inject(GeneroService);
  private alertService = inject(AlertService);

  generos: Genero[] = [];

  ngOnInit(): void {
    this.cargarGeneros();
  }

  cargarGeneros(): void {
    this.generoService.getAll().subscribe({
      next: (data) => {
        this.generos = data;
        console.log('Géneros cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar géneros:', err);
        this.alertService.error('Error', 'No se pudieron cargar los géneros');
      },
    });
  }

  // Convertimos el método a ASYNC para usar await cómodamente
  async eliminarGenero(id: number) {
    const confirmado = await this.alertService.confirmRequest(
      '¿Estás seguro?',
      'Esta acción eliminará el género permanentemente.'
    );

    if (confirmado) {
      this.generoService.delete(id).subscribe({
        next: () => {
          // Recarga la lista
          this.cargarGeneros();
          this.alertService.success(
            'Eliminado',
            'Género eliminado correctamente'
          );
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          // Advertencia
          this.alertService.error(
            'Error',
            'No se pudo eliminar el género. Es probable que existan libros asociados a él.'
          );
        },
      });
    }
  }
}
