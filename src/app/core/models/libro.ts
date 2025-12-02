import { Autor } from './autor';
import { Genero } from './genero';

export interface Libro {
  id: number;
  titulo: string;
  portada?: string;
  anioPublicacion?: number; // Spring mapea "anio_publicacion" a "anioPublicacion"
  disponible: boolean; 

  // RELACIONES
  genero: Genero; 
  autores: Autor[]; 
}