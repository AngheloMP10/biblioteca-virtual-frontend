import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../core/services/token-storage.service';
import { AuthResponse, AuthRequest } from '../core/models/auth.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // puerto (8080) URL desde environment
  private API_URL = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  // Login
  login(usuario: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, usuario);
  }

  // Register
  register(usuario: AuthRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, usuario, {
      responseType: 'text',
    });
  }

  // Guarda token y datos de usuario
  saveSession(response: AuthResponse): void {
    this.tokenStorage.saveToken(response.token);

    localStorage.setItem('username', response.username);
    localStorage.setItem('role', response.role);
  }

  // Cerrar sesión
  logout(): void {
    this.tokenStorage.signOut();
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  // Verifica rol
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    return localStorage.getItem('role') === 'ROLE_USER';
  }
}
