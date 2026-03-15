import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

// Selector base; accedeix a la part 'auth' del Store
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector per obtenir isLoggedIn
export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state) => state.isLoggedIn
);

// Selector per obtenir el username
export const selectUsername = createSelector(
    selectAuthState,
    (state) => state.username
);