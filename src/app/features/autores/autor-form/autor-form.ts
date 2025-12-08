import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AutorService } from '../../../core/services/autor';
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
      error: (err) => console.error('Error al cargar autor', err),
    });
  }

  onSubmit(): void {
    // Validación
    if (!this.autor.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    if (this.isEditing) {
      // Edita
      this.autorService.update(this.autor.id, this.autor).subscribe({
        next: () => {
          alert('Autor actualizado correctamente');
          this.router.navigate(['/autores']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el autor.');
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
          alert('Autor creado correctamente');
          this.router.navigate(['/autores']);
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al crear el autor. Revisa la consola.');
        },
      });
    }
  }
}
