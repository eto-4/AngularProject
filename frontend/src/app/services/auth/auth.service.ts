import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from '../../store/auth.actions';
import { selectIsLoggedIn, selectUsername } from '../../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    // Usuaris disponibles hardcodejats.
    private readonly VALID_USERS = [
        { username: 'admin', password: '1234' },
    ];

    constructor(private store: Store) {}

    // login - Retorna true  si les credencials só correctes
    login(username: string, password: string): boolean {
        // Cerquem si existeix un usuari amb aquest username i password
        const found = this.VALID_USERS.find(
            u => u.username === username && u.password === password
        );

        if (found) {
            // Guardem l'action login al Store
            this.store.dispatch(login({ username: found.username }));
            return true;
        }
        return false;
    }

    // logout - Dispatxa l'action logout al Store
    logout(): void {
        this.store.dispatch(logout());
    }

    // isLoggedIn - Retorna un observable amb l'estat isLoggedIn del Store
    isLoggedIn(): Observable<boolean> {
        return this.store.select(selectIsLoggedIn);
    }

    // getCurrentUser - Retorna un Observable amb el username del Store
    getCurrentUser(): Observable<string | null> {
        return this.store.select(selectUsername);
    }
}
