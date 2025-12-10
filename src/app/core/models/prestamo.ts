import { Libro } from './libro';

export interface Prestamo {
  id: number;
  fechaSolicitud: string;
  fechaDevolucion?: string;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  libro: Libro;
  usuario: any; // Usuario completo desde Spring Boot
}
