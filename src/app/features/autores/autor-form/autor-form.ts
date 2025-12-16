import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AutorService } from '../../../core/services/autor';
import { AlertService } from '../../../core/services/alert';
import { Autor } from '../../../core/models/autor';

@Component({
  selector: 'app-autor-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './autor-form.html',
  styleUrls: ['./autor-form.css'],
})
export class AutorFormComponent implements OnInit {
  // Inyección de dependencias
  private autorService = inject(AutorService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Objeto Autor inicializado
  autor: Autor = {
    id: 0,
    nombre: '',
    urlFoto: '',
  };

  isEditing: boolean = false;

  ngOnInit(): void {
    // Verifica si la URL tiene un ID
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Edita
      this.isEditing = true;
      this.cargarAutor(Number(id));
    } else {
      // Crea
      this.isEditing = false;
    }
  }

  cargarAutor(id: number): void {
    this.autorService.getById(id).subscribe({
      next: (data) => {
        this.autor = data;
        if (!this.autor.urlFoto) this.autor.urlFoto = '';
      },
      error: (err) => {
        console.error('Error al cargar autor', err);
        this.alertService.error(
          'Error',
          'No se pudo cargar la información del autor'
        );
      },
    });
  }

  onSubmit(): void {
    // Validación
    if (!this.autor.nombre.trim()) {
      this.alertService.error(
        'Formulario inválido',
        'El nombre del autor es obligatorio'
      );
      return;
    }

    if (this.isEditing) {
      // Edita
      this.autorService.update(this.autor.id, this.autor).subscribe({
        next: () => {
          this.alertService.success(
            'Actualizado',
            'Autor actualizado correctamente'
          );
          this.router.navigate(['/autores']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          this.alertService.error('Error', 'Error al actualizar el autor.');
        },
      });
    } else {
      // Crea
      const autorParaGuardar = {
        nombre: this.autor.nombre,
        urlFoto: this.autor.urlFoto,
      };

      this.autorService.create(autorParaGuardar as any).subscribe({
        next: () => {
          this.alertService.success('Creado', 'Autor creado correctamente');
          this.router.navigate(['/autores']);
        },
        error: (err) => {
          console.error('Error al crear:', err);
          this.alertService.error(
            'Error',
            'Error al crear el autor. Revisa la consola.'
          );
        },
      });
    }
  }
}
