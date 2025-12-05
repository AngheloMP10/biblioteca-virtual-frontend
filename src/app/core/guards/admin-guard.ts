import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Rol directamente del localStorage
  const role = localStorage.getItem('role');

  if (role === 'ROLE_ADMIN') {
    // Es Admin: Pasa adelante
    return true;
  } else {
    // No es Admin: Al catálogo
    router.navigate(['/catalogo']);
    return false;
  }
};