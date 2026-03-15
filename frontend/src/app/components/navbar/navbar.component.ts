import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class NavbarComponent implements OnInit {
    isLoggedIn: boolean = false;
    currentUser: string | null = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // Ens subscrivim directament i forcem la detecció de canvis
        this.authService.isLoggedIn$().subscribe(value => {
            this.isLoggedIn = value;
            this.cdr.detectChanges();
        });

        this.authService.getCurrentUser$().subscribe(value => {
            this.currentUser = value;
            this.cdr.detectChanges();
        });
    }

    // Tanca la sessió i redirigeix a /about
    logout(): void {
        this.authService.logout();
        this.isLoggedIn = false;
        this.currentUser = null;
        this.cdr.detectChanges();
        
        // Esperem un tick abans de navegar
        setTimeout(() => {
          this.router.navigate(['/about']);
        }, 50);
    }
}