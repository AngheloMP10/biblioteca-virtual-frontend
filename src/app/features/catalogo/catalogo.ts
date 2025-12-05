import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../core/services/libro';
import { PrestamoService } from '../../core/services/prestamo';
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
  private prestamoService = inject(PrestamoService);

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

  solicitarPrestamo(libro: Libro): void {
    if (
      !confirm(`¿Deseas solicitar el préstamo del libro "${libro.titulo}"?`)
    ) {
      return;
    }

    this.prestamoService.solicitar(libro.id).subscribe({
      next: () => {
        alert(
          '✅ Solicitud enviada con éxito. El administrador evaluará tu petición.'
        );
      },
      error: (err) => {
        console.error(err);
        alert(err?.error || '❌ Error al solicitar el préstamo');
      },
    });
  }
}
