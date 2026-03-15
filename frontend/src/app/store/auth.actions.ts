import { createAction, props } from "@ngrx/store";

// Action que es dispara quan l'usuari fa login correctament
export const login = createAction(
    '[Auth] Login',
    props<{ username: string }>()
);

// Action que es dispara quan l'usuari fa logout
export const logout = createAction(
    '[Auth] Logout'
);