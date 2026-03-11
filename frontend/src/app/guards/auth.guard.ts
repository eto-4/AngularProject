import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

// Si l'usuari no està autenticat, el redirigeix al login
export const authGuard: CanActivateFn = (route, state) => {

    // Inject dels serveis necessaris.
    const authService = inject(AuthService);
    const router = inject(Router);

    if ( authService.isLoggedIn()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};
