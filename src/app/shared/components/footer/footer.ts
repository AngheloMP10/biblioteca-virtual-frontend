import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {
  private tokenStorage = inject(TokenStorageService);

  get isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }
}
