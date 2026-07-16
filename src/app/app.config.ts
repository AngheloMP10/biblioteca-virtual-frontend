import {
  ApplicationConfig,
  APP_INITIALIZER,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  inject,
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
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { WebSocketService } from './core/services/websocket.service';

const initializeWebSocket = () => {
  const wsService = inject(WebSocketService);
  wsService.connect();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Registrar HttpClient + Interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor]),
    ),

    // ng2-charts
    provideCharts(withDefaultRegisterables()),

    // WebSocket initialization
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeWebSocket,
      multi: true,
    },
  ],
};
