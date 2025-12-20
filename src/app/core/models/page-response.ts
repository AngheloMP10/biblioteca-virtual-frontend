export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Número de página actual (empieza en 0)
  first: boolean;
  last: boolean;
  empty: boolean;
}
