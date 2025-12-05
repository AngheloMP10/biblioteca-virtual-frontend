import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';
import { adminGuard } from './core/guards/admin-guard';

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

export const routes: Routes = [
  // Redirección inicial al login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Login (Pública)
  { path: 'auth/login', component: LoginComponent, canActivate: [publicGuard] },

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
  // Libros
  {
    path: 'libros',
    component: LibroListComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'libros/nuevo',
    component: LibroFormComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'libros/editar/:id',
    component: LibroFormComponent,
    canActivate: [authGuard, adminGuard],
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

  // ERROR 404
  // Cualquier ruta desconocida redirige al login
  { path: '**', redirectTo: 'auth/login' },
];
