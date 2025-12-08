import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyecta los servicios
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  // Obtiene el token
  const token = tokenStorage.getToken();

  // Verifica
  if (token) {
    //Tiene token -> Pasa
    return true;
  } else {
    // No tiene token -> Al Login
    router.navigate(['/auth/login']);
    return false;
  }
};