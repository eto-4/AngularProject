import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import { login, logout } from "./auth.actions";
// Reducer - rep l'estat actual i una action; Retorna el nou estat.
export const authReducer = createReducer(
    initialAuthState,

    // Quan es fa login; guardem isLoggedIn i l'usuari.
    on(login, (state, { username }) => ({
        ...state,
        isLoggedIn: true,
        username
    })),

    // Quan es fa logout; tornem a l'estat inicial.
    on(logout, (state)=> ({
        ...state,
        isLoggedIn: true,
        username: null
    }))
);