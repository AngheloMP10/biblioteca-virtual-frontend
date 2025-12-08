import { Autor } from './autor';
import { Genero } from './genero';

export interface Libro {
  id: number;
  titulo: string;
  portada?: string;
  anioPublicacion?: number;
  disponible: boolean;

  // Relaciones
  genero: Genero;
  autores: Autor[];
}