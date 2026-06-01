import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// HTTP + Interceptors
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Registrar HttpClient + Interceptor
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),

    // ng2-charts
    provideCharts(withDefaultRegisterables()),
  ],
};
