import { provideLottieOptions } from 'ngx-lottie';

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthRepositoryInject } from './domain/respository/repository';
import { InfraAuthService } from './infrastructure/services/services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([HttpClientModule, BrowserAnimationsModule]),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    { provide: AuthRepositoryInject, useClass: InfraAuthService },
  ],
};
