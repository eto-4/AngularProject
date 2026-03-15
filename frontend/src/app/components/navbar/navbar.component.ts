import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
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
    // Observables del Store
    isLoggedIn$!: Observable<boolean>;
    currentUser$!: Observable<string | null>;

    constructor(
        private authService: AuthService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // Subscrivim els observables dels Store
        this.isLoggedIn$ = this.authService.isLoggedIn$();
        this.currentUser$ = this.authService.getCurrentUser$();
    }

    // Tanca la sessió i redirigeix a /about
    logout(): void {
        this.authService.logout();
        this.cdr.detectChanges();
        this.router.navigate(['/about']);
    }
}