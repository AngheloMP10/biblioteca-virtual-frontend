import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { GeneroService } from '../../../core/services/genero';
import { Genero } from '../../../core/models/genero';

@Component({
  selector: 'app-genero-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './genero-form.html',
  styleUrls: ['./genero-form.css'],
})
export class GeneroFormComponent implements OnInit {
  private generoService = inject(GeneroService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Inicializamos objeto vacío
  genero: Genero = {
    id: 0,
    nombre: '',
  };

  isEditing: boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // MODO EDICIÓN
      this.isEditing = true;
      this.cargarGenero(Number(id));
    } else {
      // MODO CREACIÓN
      this.isEditing = false;
    }
  }

  cargarGenero(id: number): void {
    this.generoService.getById(id).subscribe({
      next: (data) => {
        this.genero = data;
      },
      error: (err) => console.error('Error al cargar género', err),
    });
  }

  onSubmit(): void {
    // 1. Validación simple
    if (!this.genero.nombre.trim()) {
      alert('El nombre del género es obligatorio');
      return;
    }

    if (this.isEditing) {
      // --- ACTUALIZAR (PUT) ---
      this.generoService.update(this.genero.id, this.genero).subscribe({
        next: () => {
          alert('Género actualizado correctamente');
          this.router.navigate(['/generos']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el género.');
        },
      });
    } else {
      //Crea
      const generoParaGuardar = {
        nombre: this.genero.nombre,
      };

      this.generoService.create(generoParaGuardar as any).subscribe({
        next: () => {
          alert('Género creado correctamente');
          this.router.navigate(['/generos']);
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al crear el género.');
        },
      });
    }
  }
}
