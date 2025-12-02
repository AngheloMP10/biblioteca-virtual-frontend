import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})

export class NavbarComponent {
  private tokenStorage = inject(TokenStorageService);
  public router = inject(Router); 

  usuarioNombre: string = '';
  rol: string = '';

  // El menú solo se ve si: Hay token Y la ruta NO es login
  get isLoggedIn(): boolean {
    const hayToken = !!this.tokenStorage.getToken();
    const esPaginaLogin = this.router.url.includes('/auth/login');

    return hayToken && !esPaginaLogin;
  }

  ngOnInit(): void {
    // Cargamos los datos solo si el usuario realmente está dentro
    if (this.tokenStorage.getToken()) {
      const user = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      this.usuarioNombre = user || 'Usuario';
      this.rol = role || '';
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
