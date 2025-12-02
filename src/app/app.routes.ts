import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

//Login
import { LoginComponent } from './auth/login/login';

// Componentes
import { LibroListComponent } from './features/libros/libro-list/libro-list';
import { LibroFormComponent } from './features/libros/libro-form/libro-form';
import { AutorListComponent } from './features/autores/autor-list/autor-list';
import { AutorFormComponent } from './features/autores/autor-form/autor-form';
import { GeneroListComponent } from './features/generos/genero-list/genero-list';
import { GeneroFormComponent } from './features/generos/genero-form/genero-form';

export const routes: Routes = [
  // --- RUTA INICIAL ---
  // Si entran a la raíz, los mandamos al login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // --- LOGIN (Pública) ---
  { path: 'auth/login', component: LoginComponent },

  // --- LIBROS (Protegidas con authGuard) ---
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

  // --- AUTORES (Protegidas) ---
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

  // --- GÉNEROS (Protegidas) ---
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

  // --- ERROR 404 ---
  // Cualquier ruta desconocida redirige al login
  { path: '**', redirectTo: 'auth/login' },
];
