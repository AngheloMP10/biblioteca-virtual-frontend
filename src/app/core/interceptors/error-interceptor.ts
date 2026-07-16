import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert';
import { TokenStorageService } from '../services/token-storage.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  const router = inject(Router);
  const tokenStorage = inject(TokenStorageService);

  // --- BYPASS PARA AUTENTICACIÓN ---
  // Ignoramos los errores globales para el login, registro y 2FA
  if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/verify-2fa') ||
    req.url.includes('/confirm-2fa')
  ) {
    return next(req);
  }
  // ----------------------------------------

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Intentar extraer el mensaje de error específico que manda tu backend Spring Boot
      let errorMessage = 'Ocurrió un error inesperado';
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }

      // Evaluar el código de estado HTTP
      switch (error.status) {
        case 0:
          // El servidor está apagado o hay un problema grave de CORS
          alertService.error(
            'Error de Conexión',
            'No se pudo contactar con el servidor. Verifica tu conexión.',
          );
          break;

        case 400:
          // Bad Request (Validaciones de formulario, datos incorrectos)
          alertService.warningToast(
            errorMessage !== 'Ocurrió un error inesperado'
              ? errorMessage
              : 'Solicitud incorrecta. Verifica los datos enviados.',
          );
          break;

        case 401:
          // Unauthorized (Token expirado o no autenticado)
          alertService.errorToast(
            'Tu sesión ha expirado o no estás autorizado.',
          );
          tokenStorage.signOut(); // Limpiamos el token local
          localStorage.clear(); // Limpiamos los roles
          router.navigate(['/auth/login']);
          break;

        case 403:
          // Forbidden (No tiene el rol adecuado, ej. un USER intentando borrar un libro)
          alertService.warningToast(
            'No tienes permisos suficientes para realizar esta acción.',
          );
          break;

        case 404:
          // Not Found (El recurso no existe)
          alertService.infoToast('El recurso solicitado no fue encontrado.');
          break;

        case 500:
          // Internal Server Error (Excepciones no controladas en Java)
          alertService.error(
            'Error del Servidor',
            'Ha ocurrido un problema interno en el sistema. Intenta nuevamente más tarde.',
          );
          break;

        default:
          alertService.errorToast(errorMessage);
          break;
      }

      // Volvemos a lanzar el error para que el componente sepa que falló
      // (así el componente puede apagar el spinner de carga, por ejemplo)
      return throwError(() => error);
    }),
  );
};
