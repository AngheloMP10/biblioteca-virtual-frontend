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
  // CORRECCIÓN 2: Nombres estándar de Angular (asegúrate que tus archivos se llamen así)
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

  onSubmit() {
    if (this.loginForm.invalid) {
      this.mensajeError = 'Debe completar todos los campos';
      return;
    }

    const { username, password } = this.loginForm.value;

    // CORRECCIÓN 3: Pasar un objeto, no variables sueltas
    const loginData = {
      username: username!,
      password: password!,
    };

    this.authService.login(loginData).subscribe({
      next: (resp) => {
        this.authService.saveSession(resp);
        // Redirigimos a la lista de libros
        this.router.navigate(['/libros']);
      },
      error: (err) => {
        console.error('Error login:', err);
        this.mensajeError = 'Usuario o contraseña incorrectos';
      },
    });
  }

  ngOnInit(): void {
    // Si entro al login, me aseguro de que no haya sesiones viejas activas
    if (this.tokenStorage.getToken()) {
      this.tokenStorage.signOut();
    }
  }
}
