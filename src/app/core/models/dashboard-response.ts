import { DashboardMetricas } from './dashboard-metricas';
import { DashboardLibro } from './dashboard-libro';
import { DashboardGenero } from './dashboard-genero';

export interface DashboardResponse {
  metricas: DashboardMetricas;
  librosMasPrestados: DashboardLibro[];
  generosMasPopulares: DashboardGenero[];
}
