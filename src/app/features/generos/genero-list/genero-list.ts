import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GeneroService } from '../../../core/services/genero';
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
      },
    });
  }

  eliminarGenero(id: number): void {
    if (confirm('¿Estás seguro de eliminar este género?')) {
      this.generoService.delete(id).subscribe({
        next: () => {
          // Si todo sale bien, recargamos la lista
          this.cargarGeneros();
          alert('Género eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          // Igual que con autores, mostramos advertencia si tiene libros vinculados
          alert(
            'No se pudo eliminar el género. Es probable que existan libros asociados a él.'
          );
        },
      });
    }
  }
}
