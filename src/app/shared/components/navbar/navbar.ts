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

  usuarioNombre: string = '';
  rol: string = '';

  get isLoggedIn(): boolean {
    const hayToken = !!this.tokenStorage.getToken();
    const esPaginaLogin = this.router.url.includes('/auth/login');
    const esPaginaRegistro = this.router.url.includes('/auth/registro');
    return hayToken && !esPaginaLogin && !esPaginaRegistro;
  }

  get isAdmin(): boolean {
    return this.rol === 'ROLE_ADMIN';
  }

  get isUser(): boolean {
    return this.rol === 'ROLE_USER';
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      const user = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      this.usuarioNombre = user || 'Usuario';
      this.rol = role || '';
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
