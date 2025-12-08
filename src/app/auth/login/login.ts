import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../core/services/token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  mensajeError: string = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.mensajeError = 'Debe completar todos los campos';
      return;
    }

    const { username, password } = this.loginForm.value;

    const loginData = {
      username: username!,
      password: password!,
    };

    this.authService.login(loginData).subscribe({
      next: (resp) => {
        // Guardar sesíon
        this.authService.saveSession(resp);

        if (resp.role === 'ROLE_ADMIN') {
          // Si es Admin
          this.router.navigate(['/libros']);
        } else {
          // Si es User
          this.router.navigate(['/catalogo']);
        }
      },
      error: (err) => {
        console.error('Error login:', err);
        this.mensajeError = 'Usuario o contraseña incorrectos';
      },
    });
  }
}
