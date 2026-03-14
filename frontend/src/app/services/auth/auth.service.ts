import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    // Clau referencial que es fa servir per guardar l'usuari a localStorage
    private readonly STORAGE_KEY = 'current_user';

    // Usuaris disponibles hardcodejats.
    private readonly VALID_USERS = [
        { username: 'admin', password: '1234' },
    ];

    constructor() {}

    // login - Retorna true  si les credencials só correctes
    login(username: string, password: string): boolean {
        // Cerquem si existeix un usuari amb aquest username i password
        const found = this.VALID_USERS.find(
            u => u.username === username && u.password === password
        );

        if (found) {
            // Guardem l'usuari al localStorage per mantenir la sessió
            localStorage.setItem(
                this.STORAGE_KEY,
                JSON.stringify(
                    {
                        username: found.username
                    }
                )
            );
            return true;
        }
        return false;
    }

    // logout - Tanca la sessió eliminant l'usuari del localStorage
    logout(): void {
        localStorage.removeItem(
            this.STORAGE_KEY
        );
    }

    // isLoggedIn - Comprova si es un usuari autenticat
    isLoggedIn(): boolean {
        return localStorage.getItem(
            this.STORAGE_KEY
        ) !== null;
    }

    /**
     * getCurrentUser - Retorna el nom de l'usuari autenticat,
     *                  o null si no hi ha sessió.
     * */ 
    getCurrentUser(): string | null {
        const data = localStorage.getItem(
            this.STORAGE_KEY
        );
        if (!data) return null;

        return JSON.parse(data).username;
    }
}
