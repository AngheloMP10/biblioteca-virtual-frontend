import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';

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

  // Libros (Protegidas con authGuard) ---
  { path: 'libros', component: LibroListComponent, canActivate: [authGuard] },
  {
    path: 'libros/nuevo',
    component: LibroFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'libros/editar/:id',
    component: LibroFormComponent,
    canActivate: [authGuard],
  },

  // Autores (Protegidas)
  { path: 'autores', component: AutorListComponent, canActivate: [authGuard] },
  {
    path: 'autores/nuevo',
    component: AutorFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'autores/editar/:id',
    component: AutorFormComponent,
    canActivate: [authGuard],
  },

  // Géneros (Protegidas)
  { path: 'generos', component: GeneroListComponent, canActivate: [authGuard] },
  {
    path: 'generos/nuevo',
    component: GeneroFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'generos/editar/:id',
    component: GeneroFormComponent,
    canActivate: [authGuard],
  },

  // ERROR 404
  // Cualquier ruta desconocida redirige al login
  { path: '**', redirectTo: 'auth/login' },
];
