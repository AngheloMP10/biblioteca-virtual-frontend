import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  // Alerta de Éxito (Verde)
  success(title: string, message: string): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd',
    });
  }

  // Alerta de Error (Rojo)
  error(title: string, message: string): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#dc3545',
    });
  }

  // Confirmación (Interrogación)
  // Promesa booleana: true si aceptó, false si canceló
  async confirmRequest(
    title: string,
    message: string,
    confirmText: string = 'Sí, confirmar'
  ): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
  }
}
