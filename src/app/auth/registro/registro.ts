import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  mensajeError: string = '';
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.mensajeError = 'Por favor completa el formulario correctamente.';
      return;
    }

    const { username, password } = this.registroForm.value;

    const registroData = { username, password };

    this.authService.register(registroData).subscribe({
      next: (resp) => {
        this.isSuccess = true;
        this.mensajeError = '';

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (err) => {
        console.error('Error registro:', err);
        this.mensajeError =
          'Error al registrar. Es posible que el usuario ya exista.';
        this.isSuccess = false;
      },
    });
  }
}
