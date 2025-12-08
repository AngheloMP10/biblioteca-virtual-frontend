import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  // Obtiene el token
  const token = tokenStorage.getToken();

  // Si el usuario está logueado
  if (token) {
    // Obtiene el rol guardado en localStorage
    const role = localStorage.getItem('role');

    // Redirección
    if (role === 'ROLE_ADMIN') {
      router.navigate(['/libros']);
    } else {
      router.navigate(['/catalogo']);
    }

    return false; // bloquea acceso a /auth/login
  }

  // Permite acceso a login/registro
  return true;
};
