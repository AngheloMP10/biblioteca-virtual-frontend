import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AutorService } from '../../../core/services/autor'; // Verifica la ruta
import { Autor } from '../../../core/models/autor';

@Component({
  selector: 'app-autor-form',
  imports: [CommonModule, FormsModule, RouterLink], // Importamos RouterLink para el botón cancelar
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

  // Bandera para saber si estamos editando o creando
  isEditing: boolean = false;

  ngOnInit(): void {
    // Verificamos si la URL tiene un ID (ej. /autores/editar/5)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // MODO EDICIÓN
      this.isEditing = true;
      this.cargarAutor(Number(id));
    } else {
      // MODO CREACIÓN
      this.isEditing = false;
    }
  }

  cargarAutor(id: number): void {
    this.autorService.getById(id).subscribe({
      next: (data) => {
        this.autor = data;
        // Aseguramos que urlFoto no sea null para evitar errores en el input
        if (!this.autor.urlFoto) this.autor.urlFoto = '';
      },
      error: (err) => console.error('Error al cargar autor', err),
    });
  }

  onSubmit(): void {
    // Validación básica
    if (!this.autor.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    if (this.isEditing) {
      // --- MODO EDICIÓN (PUT) ---
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
      // --- MODO CREACIÓN (POST) ---
      const autorParaGuardar = {
        nombre: this.autor.nombre,
        urlFoto: this.autor.urlFoto,
      };

      // Usamos 'as Autor' o 'any' para que TypeScript no se queje de que falta el ID
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
