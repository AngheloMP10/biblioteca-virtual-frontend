import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

// Servicios
import { LibroService } from '../../../core/services/libro';
import { AutorService } from '../../../core/services/autor';
import { GeneroService } from '../../../core/services/genero';
import { AlertService } from '../../../core/services/alert';

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
  private alertService = inject(AlertService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Listas para los desplegables
  listaAutores: Autor[] = [];
  listaGeneros: Genero[] = [];

  // Variables temporales para capturar la selección del formulario
  selectedGeneroId: number | null = null;
  selectedAutoresIds: number[] = []; // Array porque un libro puede tener varios autores

  // Imagen seleccionada
  selectedFile: File | null = null;
  imagenPrevisualizacion: string | ArrayBuffer | null = null;

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
      error: (err) => {
        console.error('Error cargando géneros', err);
        this.alertService.error('Error', 'No se pudieron cargar los géneros');
      },
    });

    // Cargar Autores
    this.autorService.getAll().subscribe({
      next: (data) => (this.listaAutores = data),
      error: (err) => {
        console.error('Error cargando autores', err);
        this.alertService.error('Error', 'No se pudieron cargar los autores');
      },
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
      error: (err) => {
        console.error('Error al cargar libro', err);
        this.alertService.error('Error', 'No se pudo cargar el libro');
      },
    });
  }

  guardarLibro(): void {
    const libroParaEnviar = {
      ...this.libro,
      genero: { id: this.selectedGeneroId },
      autores: this.selectedAutoresIds.map((id) => ({ id: Number(id) })),
    };

    if (!this.isEditing) {
      delete (libroParaEnviar as any).id;
    }

    if (this.isEditing) {
      this.libroService.update(this.libro.id, libroParaEnviar).subscribe({
        next: () => {
          this.alertService.success(
            'Actualizado',
            'Libro actualizado correctamente'
          );
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('Error', 'Error al actualizar');
        },
      });
    } else {
      this.libroService.create(libroParaEnviar).subscribe({
        next: () => {
          this.alertService.success('Creado', 'Libro creado correctamente');
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('Error', 'Error al crear');
        },
      });
    }
  }

  onSubmit(): void {
    // Validaciones
    if (!this.libro.titulo.trim()) {
      this.alertService.error(
        'Formulario inválido',
        'El título es obligatorio'
      );
      return;
    }
    if (!this.selectedGeneroId) {
      this.alertService.error(
        'Formulario inválido',
        'Debes seleccionar un género'
      );
      return;
    }
    if (this.selectedAutoresIds.length === 0) {
      this.alertService.error(
        'Formulario inválido',
        'Debes seleccionar al menos un autor'
      );
      return;
    }

    // Hay imagen nueva a subir
    if (this.selectedFile) {
      this.libroService.uploadImage(this.selectedFile).subscribe({
        next: (resp) => {
          // Backend devuelve { url: 'https://cloudinary...' }
          this.libro.portada = resp.url;

          this.guardarLibro();
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('Error', 'Falló la subida de la imagen');
        },
      });
    } else {
      // No hay imagen nueva
      this.guardarLibro();
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Previsualización local
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPrevisualizacion = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
