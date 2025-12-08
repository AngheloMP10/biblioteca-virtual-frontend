import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AutorService } from '../../../core/services/autor';
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
      },
    });
  }

  eliminarAutor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este autor?')) {
      this.autorService.delete(id).subscribe({
        next: () => {
          this.cargarAutores();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert(
            'No se pudo eliminar el autor (quizás tiene libros asociados).'
          );
        },
      });
    }
  }
}
