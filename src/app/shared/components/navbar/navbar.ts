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

  // Ya no variables fijas
  // usuarioNombre: string = '';
  // rol: string = '';

  // Getter dinámico para login
  get isLoggedIn(): boolean {
    const hayToken = !!this.tokenStorage.getToken();
    const esPaginaLogin = this.router.url.includes('/auth/login');
    const esPaginaRegistro = this.router.url.includes('/auth/registro');
    return hayToken && !esPaginaLogin && !esPaginaRegistro;
  }

  // Getter dinámico para nombre
  get usuarioNombre(): string {
    if (!this.isLoggedIn) return '';
    return localStorage.getItem('username') || 'Usuario';
  }

  // Getter dinámico para rol
  get rol(): string {
    if (!this.isLoggedIn) return '';
    return localStorage.getItem('role') || '';
  }

  // Verifica el rol
  get isAdmin(): boolean {
    return this.rol === 'ROLE_ADMIN';
  }

  get isUser(): boolean {
    return this.rol === 'ROLE_USER';
  }

  ngOnInit(): void {}

  logout(): void {
    this.tokenStorage.signOut();
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
