import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../../core/services/libro';
import { Libro } from '../../../core/models/libro';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  // Mantenemos tu convención de nombres cortos
  templateUrl: './libro-list.html',
  styleUrls: ['./libro-list.css'],
})
export class LibroListComponent implements OnInit {
  private libroService = inject(LibroService);

  libros: Libro[] = [];

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getAll().subscribe({
      next: (data) => {
        this.libros = data;
        console.log('Libros cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar libros:', err);
      },
    });
  }

  eliminarLibro(id: number): void {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.libroService.delete(id).subscribe({
        next: () => {
          // Recargamos la lista
          this.cargarLibros();
          alert('Libro eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar el libro.');
        },
      });
    }
  }
}
