import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';


// Configuració principal de l'aplicació Angular (standalone)
// Aquí registrem els providers globals: router i httpClient
export const appConfig: ApplicationConfig = {
  providers: [
    // Captura d'errors globals del navegador (nou a partir de angular +19)
    provideBrowserGlobalErrorListeners(),
    
    // Registrem les rutes de l'aplicació
    provideRouter(routes),
    
    // Registrem HttpClient per poder fer peticions HTTP als serveis
    provideHttpClient()
  ]
};
