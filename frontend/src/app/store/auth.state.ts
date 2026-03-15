// Definició de l'estat d'autenticació dal Store
export interface AuthState {
    
    // Indica si hi ha un usuari autenticat 
    isLoggedIn: boolean;

    // Nom de l'usuari autenticat, null si no hi ha sessió
    username: string | null;
}

// Estat inicial: cap usuari autenticat
export const initialAuthState: AuthState = {
    isLoggedIn: false,
    username: null
};