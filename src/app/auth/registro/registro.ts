import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AlertService } from '../../core/services/alert';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.alertService.error(
        'Formulario inválido',
        'Por favor completa el formulario correctamente.'
      );
      return;
    }

    const { username, password } = this.registroForm.value;
    const registroData = { username, password };

    this.authService.register(registroData).subscribe({
      next: () => {
        this.alertService.success(
          '¡Bienvenido!',
          'Usuario creado con éxito. Ahora inicia sesión.'
        );

        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Error registro:', err);

        this.alertService.error(
          'Error',
          'No se pudo registrar. Es posible que el usuario ya exista.'
        );
      },
    });
  }
}
