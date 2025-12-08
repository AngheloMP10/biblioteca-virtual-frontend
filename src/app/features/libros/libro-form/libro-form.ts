import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

// Servicios
import { LibroService } from '../../../core/services/libro';
import { AutorService } from '../../../core/services/autor';
import { GeneroService } from '../../../core/services/genero';

// Modelos
import { Libro } from '../../../core/models/libro';
import { Autor } from '../../../core/models/autor';
import { Genero } from '../../../core/models/genero';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './libro-form.html',
  styleUrls: ['./libro-form.css'],
})
export class LibroFormComponent implements OnInit {
  // Inyecciones
  private libroService = inject(LibroService);
  private autorService = inject(AutorService);
  private generoService = inject(GeneroService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Listas para los desplegables
  listaAutores: Autor[] = [];
  listaGeneros: Genero[] = [];

  // Variables temporales para capturar la selección del formulario
  selectedGeneroId: number | null = null;
  selectedAutoresIds: number[] = []; // Array porque un libro puede tener varios autores

  // Objeto Libro base
  libro: Libro = {
    id: 0,
    titulo: '',
    portada: '',
    anioPublicacion: new Date().getFullYear(),
    disponible: true,
    genero: { id: 0, nombre: '' },
    autores: [],
  };

  isEditing: boolean = false;

  ngOnInit(): void {
    // Cargar las listas necesarias (Autores y Géneros)
    this.cargarListas();

    // Verificar si es edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cargarLibro(Number(id));
    }
  }

  cargarListas(): void {
    // Cargar Generos
    this.generoService.getAll().subscribe({
      next: (data) => (this.listaGeneros = data),
      error: (err) => console.error('Error cargando géneros', err),
    });

    // Cargar Autores
    this.autorService.getAll().subscribe({
      next: (data) => (this.listaAutores = data),
      error: (err) => console.error('Error cargando autores', err),
    });
  }

  cargarLibro(id: number): void {
    this.libroService.getById(id).subscribe({
      next: (data) => {
        this.libro = data;

        // Mapeo
        if (this.libro.genero) {
          this.selectedGeneroId = this.libro.genero.id;
        }

        if (this.libro.autores) {
          // Extraemos IDs de los autores del libro
          this.selectedAutoresIds = this.libro.autores.map((a) => a.id);
        }
      },
      error: (err) => console.error('Error al cargar libro', err),
    });
  }

  onSubmit(): void {
    // Validaciones
    if (!this.libro.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }
    if (!this.selectedGeneroId) {
      alert('Debes seleccionar un género');
      return;
    }
    if (this.selectedAutoresIds.length === 0) {
      alert('Debes seleccionar al menos un autor');
      return;
    }

    // Para el Backend
    // IDs para Spring Boot
    const libroParaEnviar = {
      ...this.libro,
      genero: { id: this.selectedGeneroId },
      autores: this.selectedAutoresIds.map((id) => ({ id: Number(id) })),
    };

    // Si es crear, eliminamos el ID para evitar errores de Hibernate
    if (!this.isEditing) {
      delete (libroParaEnviar as any).id;
    }

    // Enviar
    if (this.isEditing) {
      this.libroService.update(this.libro.id, libroParaEnviar).subscribe({
        next: () => {
          alert('Libro actualizado correctamente');
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar');
        },
      });
    } else {
      this.libroService.create(libroParaEnviar).subscribe({
        next: () => {
          alert('Libro creado correctamente');
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear');
        },
      });
    }
  }
}
