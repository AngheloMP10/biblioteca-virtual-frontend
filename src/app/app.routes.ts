import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';
import { adminGuard } from './core/guards/admin-guard';
import { staffGuard } from './core/guards/staff-guard';

//Landing
import { LandingComponent } from './features/landing/landing';
//Login
import { LoginComponent } from './auth/login/login';
//Registro
import { RegistroComponent } from './auth/registro/registro';
// Componentes
import { CatalogoComponent } from './features/catalogo/catalogo';
import { LibroListComponent } from './features/libros/libro-list/libro-list';
import { LibroFormComponent } from './features/libros/libro-form/libro-form';
import { AutorListComponent } from './features/autores/autor-list/autor-list';
import { AutorFormComponent } from './features/autores/autor-form/autor-form';
import { GeneroListComponent } from './features/generos/genero-list/genero-list';
import { GeneroFormComponent } from './features/generos/genero-form/genero-form';
import { PrestamoListComponent } from './features/prestamos/prestamo-list/prestamo-list';
import { MisPedidosComponent } from './features/prestamos/mis-pedidos/mis-pedidos';
import { DashboardComponent } from './features/admin/dashboard/dashboard';
// 404
import { NotFoundComponent } from './features/not-found/not-found';

export const routes: Routes = [
  // Landing como raíz
  { path: '', component: LandingComponent },

  // Login (Pública)
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [publicGuard],
  },

  // Registro
  {
    path: 'auth/registro',
    component: RegistroComponent,
    canActivate: [publicGuard],
  },

  // Ruta para usuarios
  {
    path: 'catalogo',
    component: CatalogoComponent,
    canActivate: [authGuard], // Deben estar logueados
  },

  // Ruta para admin (Protegidas con authGuard y adminGuard)

  // Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, adminGuard],
  },

  // Libros
  {
    path: 'libros',
    component: LibroListComponent,
    canActivate: [authGuard, staffGuard],
  },
  {
    path: 'libros/nuevo',
    component: LibroFormComponent,
    canActivate: [authGuard, staffGuard],
  },
  {
    path: 'libros/editar/:id',
    component: LibroFormComponent,
    canActivate: [authGuard, staffGuard],
  },

  // Autores
  {
    path: 'autores',
    component: AutorListComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'autores/nuevo',
    component: AutorFormComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'autores/editar/:id',
    component: AutorFormComponent,
    canActivate: [authGuard, adminGuard],
  },

  // Géneros
  {
    path: 'generos',
    component: GeneroListComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'generos/nuevo',
    component: GeneroFormComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'generos/editar/:id',
    component: GeneroFormComponent,
    canActivate: [authGuard, adminGuard],
  },

  // Prestamos
  {
    path: 'prestamos',
    component: PrestamoListComponent,
    canActivate: [authGuard, staffGuard],
  },

  {
    path: 'mis-pedidos',
    component: MisPedidosComponent,
    canActivate: [authGuard],
  },

  // ERROR 404
  { path: '**', component: NotFoundComponent },
];
