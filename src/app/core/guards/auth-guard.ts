import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos los servicios
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  // Obtenemos el token
  const token = tokenStorage.getToken();

  // Verificamos
  if (token) {
    //Tiene token -> Pasa
    return true;
  } else {
    // No tiene token -> Al Login
    router.navigate(['/auth/login']);
    return false;
  }
};
