import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

// Component de la pàgina principal / presentació del portfolio
@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {
    constructor(private authService: AuthService) {}

    // S'usa al template per mostrar el botó "Nou Projecte" si l'usuari és autenticat
    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
}