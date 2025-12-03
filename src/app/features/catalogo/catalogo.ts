import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../core/services/libro';
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
      },
    });
  }
}
