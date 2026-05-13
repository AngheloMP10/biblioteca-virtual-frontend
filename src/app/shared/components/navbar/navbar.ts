import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {
  private tokenStorage = inject(TokenStorageService);
  public router = inject(Router);

  // Login
  get isLoggedIn(): boolean {
    const hayToken = !!this.tokenStorage.getToken();
    const esPaginaLogin = this.router.url.includes('/auth/login');
    const esPaginaRegistro = this.router.url.includes('/auth/registro');
    return hayToken && !esPaginaLogin && !esPaginaRegistro;
  }

  // Usuario
  get usuarioNombre(): string {
    if (!this.isLoggedIn) return '';
    return localStorage.getItem('username') || 'Usuario';
  }

  // Rol
  get rol(): string {
    if (!this.isLoggedIn) return '';
    return localStorage.getItem('role') || '';
  }

  // Roles
  get isAdmin(): boolean {
    return this.rol === 'ROLE_ADMIN';
  }

  get isBibliotecario(): boolean {
    return this.rol === 'ROLE_BIBLIOTECARIO';
  }

  get isUser(): boolean {
    return this.rol === 'ROLE_USER';
  }

  // Helper (Admin O Bibliotecario)
  get isStaff(): boolean {
    return this.isAdmin || this.isBibliotecario;
  }

  // Rol Formateado
  get rolFormateado(): string {
    switch (this.rol) {
      case 'ROLE_ADMIN':
        return 'Administrador';

      case 'ROLE_BIBLIOTECARIO':
        return 'Bibliotecario';

      case 'ROLE_USER':
        return 'Usuario';

      default:
        return 'Desconocido';
    }
  }

  ngOnInit(): void {}

  logout(): void {
    this.tokenStorage.signOut();
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
