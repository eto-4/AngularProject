import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

// Component del menú de navegació superior
// Mostra opcions diferents segons si l'usuari està autenticat o no
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,      // Necessari per fer servir *ngIf als templates
    RouterLink,        // Necessari per fer servir [routerLink] als templates
    RouterLinkActive   // Necessari per marcar l'enllaç actiu
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Comprova si hi ha sessió activa (Es fa servir al template amb *ngIf)
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Retorna el nom de l'usuari autenticat (Es fa servir al template)
  get currentUser(): string | null {
    return this.authService.getCurrentUser();
  }

  // Tanca la sessió i redirigeix a /about
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/about']);
  }
}