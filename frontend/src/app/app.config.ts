import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Configuració principal de l'aplicació Angular (standalone)
// Aquí registrem els providers globals: router i httpClient
export const appConfig: ApplicationConfig = {
  providers: [
    // Captura d'errors globals del navegador (nou a partir de angular +19)
    provideBrowserGlobalErrorListeners(),
    
    // Registrem les rutes de l'aplicació
    provideRouter(routes),
    
    // Registrem HttpClient per poder fer peticions HTTP als serveis
    provideHttpClient(),

    // Registrem el Store amb el reducer d'autenticació
    provideStore({ auth: authReducer }),

    provideStoreDevtools({
        maxAge: 25,
        logOnly: false
    })
  ]
};
